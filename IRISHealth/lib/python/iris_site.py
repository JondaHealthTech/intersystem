#
# Copyright (c) 2021 by InterSystems Corporation.
# Cambridge, Massachusetts, U.S.A.  All rights reserved.
# Confidential, unpublished property of InterSystems.
#
import sys
from os import sep as __os_sep
from site import getsitepackages as __sitegetsitepackages

# Python comes in 2 parts: an exe on the server that is configured with a specific 
# set of package locations and a dll/.so that is configured with a cut down
# set of package locations.
# The Embedded Python product is a C level integration of libpython with iris.
# We have made an implementation choice of making the libpython package locations
# coincide with those of python on the server.
#
# The purpose of this file is to allow the user to make sys.path
# correct in Embedded Python (libpython not python.exe)
#
# set_site_path is executed by IRIS when libpython starts up 
# (i.e. the ObjectScript python shell starts)
# or when ObjectSript executes a [Language = Python] class or instance method
# for the first time in a process.

# You can iteratively change this file and compare the sys.path in
# embedded python to the sys.path in the server python.
# You don't need to reboot the instance, just restart your session and
# get into embedded python again

# General idea:
# 1) If you are using what InterSystems considers the OS default python, 
#    you don't need to change Section 1 at all.
#    For clarity, if you want you can just keep the entry in Section 1 that
#    corresponds to your platform and delete the other platforms
#    No need to use platform_name.
# 2) If you are using Flexible Runtime Python, delete everything in section 1
#    and add something in section 2. Be careful, as a non anaconda Flexible Runtime
#    Python will likely require a snippet from section 1. 
# 3) If you want an extra path to appear in sys.path whenever you use a
#    [Language = python] method, fill out section 3.
#
# If numpy.__file__ (or whatever package you care about) says its coming from
# your user home directory, that's probably the wrong place as your home directory
# will not always be visible in libpython. In that case, use:
# sudo python3 -m pip install numpy
# or put it in instancename/mgr/python as described in the IRIS documentation.

def set_site_path(platform_name):
    #
    # Section 1: default os python sys.path fixup for all supported IRIS platforms
    #
    ## ubuntu needs dist-packages for pandas to be able to be imported
    ## ubu 18 doesn't have os.sep in sys.executable
    if "ubuntu" in platform_name:
        if __os_sep in sys.executable:
            __siteprefixes = [__os_sep + sys.executable.split(__os_sep)[1]]
        else:
            __siteprefixes = ['/usr']
        sys.path = sys.path + __sitegetsitepackages(__siteprefixes)
    ## RH8 needs both /usr and /usr/local for site-package dirs
    ## RH9/SUSE needs /usr for site-package dirs
    if "lnxrh" in platform_name:
        sys.path = sys.path + __sitegetsitepackages(['/usr'])
    if "lnxsuse" in platform_name:
        sys.path = sys.path + __sitegetsitepackages(['/usr'])
    ## macs go into brew --prefix (different arm vs x86)
    if "macos" in platform_name:
        sys.path = sys.path + __sitegetsitepackages(['/opt/homebrew'])
    if "macx64" in platform_name:
        sys.path = sys.path + __sitegetsitepackages(['/usr/local'])
    if "aix" in platform_name:
        sys.path = sys.path + __sitegetsitepackages(['/opt/freeware'])
    #
    # Section 2: Flexible Runtime Python sys.path fixup
    #
    ## Anaconda:
    ## sys.path = sys.path + __sitegetsitepackages(['/home/<username>/anaconda3'])
    ## sys.path = sys.path + __sitegetsitepackages(['C:\\ProgramData\\anaconda3'])
    ## Anaconda extra: may be necessary for some cases of anaconda user install
    ##                 watch out for different behavior in:
    ##                 1) conda activate
    ##                 2) conda deactivate
    ##                 3) no conda (CONDA_PREFIX env var not set)
    ##                 4) IRIS CSP environment being different from iris session environment
    ##                    user permission wise
    ##try:
    ##    sys.path.remove("/usr/lib/python3.11/lib-dynload")
    ##    sys.path = sys.path + ["/home/<username>/anaconda3/lib/python3.11/lib-dynload"]
    ##    sys.path.remove("/usr/lib/python3.11")
    ##    sys.path = ["/home/<username>/anaconda3/lib/python3.11"] + sys.path
    ##    sys.path.remove("/usr/lib/python311.zip")
    ##    sys.path = ["/home/<username>/anaconda3/lib/python311.zip"] + sys.path
    ##except ValueError:
    ##    pass
    #
    # Section 3: Extra elements to be added to sys.path
    #
    ## sys.path = sys.path + ["/my_iris_instance_python_applications"]
