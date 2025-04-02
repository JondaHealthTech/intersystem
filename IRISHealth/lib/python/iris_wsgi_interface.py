import iris
import os
import sys
import importlib
import urllib.parse
from io import BytesIO

enc, esc = sys.getfilesystemencoding(), 'surrogateescape'


def get_from_module(module, app_path, callable):
    #check sys.modules for it and get it there first.
    try:
        module_obj = sys.modules[module]
        try:
            return getattr(sys.modules[module], callable)
        except Exception:
            pass
    except Exception:
        pass

    errors = []

    # Add the path to the application
    if (app_path not in sys.path):
        if (not app_path.endswith(os.path.sep)):
            app_path = app_path + os.path.sep
        sys.path.append(app_path)
        # I add this because Django initializes projects with its callable in a nested folder.
        sys.path.append(os.path.abspath(os.path.join(app_path, os.pardir)))

    # We need to import while in the app's directory for __init__.py to work correctly
    try:
        iris.system.Process.CurrentDirectory(app_path)
    except:
        message = "Could not switch to a given WSGI app's directory: " + app_path
        iris.cls("%SYS.System").WriteToConsoleLog(message,0,2)
        return None

    # Import the module from commonly found locations
    try:
        module_obj = importlib.import_module(module)
        return getattr(module_obj, callable)
    except Exception as e:
        errors.append(e)
    try:
        flask_app = importlib.import_module(module)
        return getattr(flask_app, 'app')
    except Exception:
        pass
    try:
        # Django has a settings module containing application location
        settings = module+'.settings'
        settings_module = importlib.import_module(settings)
        location = settings_module.WSGI_APPLICATION
        module_name, attribute_name = location.rsplit('.', 1)
        module_obj = importlib.import_module(module_name)
        app = getattr(module_obj, attribute_name)
        return app
    except Exception:
        pass
    if errors:
        message = "No WSGI app found with the given configuration: \r\n"
        message += "App location: " + app_path + "\r\n"
        message += "File containing callable: " + module + ".py\r\n"
        message += "Callable name: " + callable + "\r\n"
        ex = errors[0]
        template = "An exception of type {0} occurred while importing the WSGI app with this config. Arguments:{1!r} \r\n"
        message += template.format(type(ex).__name__, ex.args)
        iris.cls("%SYS.System").WriteToConsoleLog(message,0,2)
    return None

# Refreshes the desired module
def refresh_module(module_name):
    if module_name in sys.modules:
        try:
            importlib.reload(sys.modules[module_name])
            return True
        except exception as e:
            return False

# Changes the current working directory to the manager directory of the instance.
def goto_manager_dir():
    iris.system.Process.CurrentDirectory(iris.system.Util.ManagerDirectory())


def unicode_to_wsgi(u):
    # Convert an environment variable to a WSGI "bytes-as-unicode" string
    return u.encode(enc, esc).decode('iso-8859-1')


def wsgi_to_bytes(s):
    return s.encode('iso-8859-1')


def write(chunk):
    restService = iris.cls('%REST.Impl')
    restService._WriteResponse(chunk)


def start_response(status, response_headers, exc_info=None):
    '''WSGI start_response callable'''
    if exc_info:
        try:
            raise exc_info[1].with_traceback(exc_info[2])
        finally:
            exc_info = None
    RestService = iris.cls('%REST.Impl')
    RestService._SetStatusCode(status)
    for tuple in response_headers:
        RestService._SetHeader(tuple[0], tuple[1])
    return write


# Make request to application
def make_request(environ, stream, application, path):

    # Change the working directory for logging purposes
    goto_manager_dir()

    error_log_file = open('WSGI.log', 'a+')

    # We want the working directory to be the app's directory
    if (not path.endswith(os.path.sep)):
        path = path + os.path.sep

    iris.system.Process.CurrentDirectory(path)

    # Set up the body of the request
    if stream != '':
        bytestream = stream
    elif (environ['CONTENT_TYPE'] == 'application/x-www-form-urlencoded'):
        bytestream = BytesIO()
        part = urllib.parse.urlencode(environ['formdata']).encode('utf-8')
        environ['CONTENT_LENGTH'] = str(len(part))
        bytestream.write(part)
        bytestream.seek(0)
    else:
        bytestream = BytesIO(b'')

    # for k,v in os.environ.items():
        # environ[k] = unicode_to_wsgi(v)
    environ['wsgi.input'] = bytestream
    environ['wsgi.errors'] = error_log_file
    environ['wsgi.version'] = (1, 0)
    environ['wsgi.multithread'] = False
    environ['wsgi.multiprocess'] = True
    environ['wsgi.run_once'] = True

    if environ.get('HTTPS', 'off') in ('on', '1'):
        environ['wsgi.url_scheme'] = 'https'
    else:
        environ['wsgi.url_scheme'] = 'http'

    # Calling WSGI application
    response = application(environ, start_response)

    error_log_file.close()

    try:
        for data in response:
            if data:
                # (REST.Impl).Write() needs a utf-8 string
                write(data.decode('utf-8'))
            write(b'')
    finally:
        if hasattr(response, 'close'):
            response.close()