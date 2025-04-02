#
# Copyright (c) 2021 by InterSystems Corporation.
# Cambridge, Massachusetts, U.S.A.  All rights reserved.
# Confidential, unpublished property of InterSystems.
#

from sys import path as __syspath
from os import path as __ospath

installdir = __ospath.abspath(__ospath.dirname(__file__) + '../../..')

__syspath.append(installdir + '/bin')

from pythonint import *
import irisloader
import irisbuiltins

__syspath.remove(installdir + '/bin')

# TODO: Figure out how to hide __syspath and __ospath from anyone that
#       imports iris.  Tried __all__ but that only applies to this:
#           from iris import *

#
# End-of-file
#
