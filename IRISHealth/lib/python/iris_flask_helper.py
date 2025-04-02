import os
import iris


def create_flask_app(name):

    manager_dir = iris.system.Util.ManagerDirectory()

    # Change the working directory to make sure we're in mgr
    # iris.system.Process.CurrentDirectory(iris.system.Util.ManagerDirectory())

    # Create the full path of the new flask app
    path = os.path.join(manager_dir, 'python')

    full_path = os.path.join(path, name + '.py')

    # Creating the directory relative to the mgr directory if it doesn't exist
    os.makedirs(path, exist_ok=True)

    flask_app = '''from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, from InterSystems IRIS Embedded Python!</p>"
'''

    # Writing the content to the file
    with open(full_path, 'w') as file:
        file.write(flask_app)

    return path
