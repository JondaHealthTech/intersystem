#!/bin/sh

usage() {
    echo
    echo "Usage:"
    echo "    source runpython.sh <serverName> --venv"
    echo "Description:"
    echo "    Activate virtual environment."
    echo
    echo "Usage:"
    echo "    source runpython.sh <serverName> [python options and arguments]"
    echo "Description:"
    echo "    Run python in virtual environment."
    echo "Example:"
    echo "    source runpython.sh pserver -V"
    echo
}

# Command "runpython.bat ?" returns usage
if [ "$1" = "?" ]
then
    usage
    exit 0
fi
# first argument: server name
# remaining arguments: python options and arguments
installpythondir="$( cd "$( dirname "$0" )" >/dev/null 2>&1 && pwd )"
installdir=$(echo "$installpythondir" | sed 's|\(.*\)/.*/.*|\1|')
datadir=$(iris qlist | awk -F\^ -v installdir="$installdir" '$2 == installdir || $2 == installdir "/" { print $13 }')
if [ -z "$datadir" ]
then
    echo "Data directory for $installdir was not found."
    exit 1
fi
datapythondir="$datadir/dev/python"
serverName="$1"
crcValue=""

# get crc32 hash value of serverName
for pythonExec in "$datapythondir/virtual/${serverName}_"*/bin/python; do
    [ -e "$pythonExec" ] || continue
    crcValue=$("$pythonExec" -c "import zlib;print(zlib.crc32(b'$serverName')%(1<<32))" 2> /dev/null)
    if [ -n "$crcValue" ]
    then
        serverName="${serverName}_${crcValue}"
        break
    fi
done
if [ -z "$crcValue" ]
then
    echo "Virtual environment for $serverName was not found."
    exit 1
fi

# activate virtual environment
. "$datapythondir/virtual/$serverName/bin/activate"
if [ -z "$VIRTUAL_ENV" ]
then
    echo "Activating virtual environment failed."
else
    if [ "$2" != "--venv" ]
    then
        shift
        python "$@"
    fi
fi
