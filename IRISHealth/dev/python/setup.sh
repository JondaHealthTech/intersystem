#!/bin/sh

usage() {
    echo
    echo "Usage:"
    echo "    setup.sh <serverName> <pythonExecutablePath or pythonCommand>"
    echo "Examples:"
    echo "    setup.sh pserver python3"
    echo "    setup.sh pserver /usr/local/bin/python3"
    echo
}

# 1st argument: server name
# 2nd argument: python executable path or python command
# 3rd argument: (optional) setup level
# 4th argument: (optional) IRIS $zversion string
# 5th argument: (optional) irispython wheel version
# Command "setup.bat ?" returns usage
if [ -z "$1" ] || [ -z "$2" ] || [ "$1" = "?" ]
then
    usage
    exit 0
fi
installpythondir="$( cd "$( dirname "$0" )" >/dev/null 2>&1 && pwd )"
installdir=$(echo "$installpythondir" | sed 's|\(.*\)/.*/.*|\1|')
datadir=$(iris qlist | awk -F\^ -v installdir="$installdir" '$2 == installdir { print $13 }')
datapythondir="$datadir/dev/python"
serverName="$1"
pythonExec="$2"
setupLevel="$3"
if [ -z "$4" ]
then
    irisVersion=\"\"
else
    irisVersion="$4"
fi
irispython_version="$5"

# RemoveDirectoryTree is for internal use only
if [ "$setupLevel" = "RemoveDirectoryTree" ]
then
    rm -rf "$datapythondir/virtual/${serverName}_${4}/.pythonpath"
    rm -rf "$datapythondir/virtual/${serverName}_${4}"
    exit 0
fi

# get crc32 hash value of serverName
crcValue=$("$pythonExec" -c "import zlib;print(zlib.crc32(b'$serverName')%(1<<32))")
serverName="${serverName}_${crcValue}"

echo
echo "Setting up virtual environment..."

if [ "$setupLevel" != "1" ]
then
    # create virtual environment
    echo "Creating virtual environment..."
    virtualEnvDir="$datapythondir/virtual/$serverName"
    "$pythonExec" -m venv "$virtualEnvDir" --clear

    # check if virtual environment is created successfully
    if [ $? -ne 0 ]
    then

        # If OS is Ubuntu or Debian, check if python venv package is installed
        if [ -f "/etc/os-release" ]
        then
            osReleaseFile="/etc/os-release"
        else
            osReleaseFile="/etc/*-release"
        fi
        if [ ! -z "$osReleaseFile" ]
        then
            osname=`awk -F '=' 'toupper($1) == "NAME" {print toupper($2)}' $osReleaseFile | head -n 1`
            if [ "$osname" = \"UBUNTU\" ] || [ "$osname" = \"DEBIAN* ]
            then
                pythonName=`echo "$pythonExec" | sed -e 's/\/.*\///g'`
                venvPkgName=$pythonName"-venv"
                installedVenv=`dpkg -l $venvPkgName | awk '$1 == "ii" {print $2}'`
                if ! echo "$installedVenv" | grep -q "$venvPkgName" 2>/dev/null
                then
                    echo On Debian/Ubuntu systems, you need to install the $venvPkgName package using the following command: apt-get install $venvPkgName.
                fi
            fi
        fi

        echo "...creating virtual environment failed"
        echo
        echo "...setting up virtual environment failed"
        exit 1
    else
        if [ -f "$datapythondir/virtual/$serverName/bin/activate" ]
        then
            echo "...creating virtual environment succeeded"
        else
            echo "...creating virtual environment failed"
            echo
            echo "...setting up virtual environment failed"
            exit 1
        fi
    fi
fi

# activate virtual environment
echo
echo "Activating virtual environment..."
checksumFile="$datapythondir/virtual/$serverName/.pythonpath"
. "$datapythondir/virtual/$serverName/bin/activate"
if [ -z "$VIRTUAL_ENV" ]
then
    echo "...activating virtual environment failed"
    echo
    echo "...setting up virtual environment failed"
    exit 1
else
    echo "...activating virtual environment succeeded"
    echo
    echo "Upgrading pip..."
    if [ -f "$installpythondir"/pip-*.whl ]
    then
        python -m pip install --upgrade --no-index --find-links="$installpythondir" pip
    else
        python -m pip install --upgrade pip
    fi
    echo
    echo "Installing intersystems_irispython..."
    if [ -z "$irispython_version" ]
    then
        echo "irispython_version is not set, default to 3.2.0"
        irispython_version=3.2.0
    fi
    if ! python -m pip install --upgrade --force-reinstall --no-index --find-links="$installpythondir" intersystems_irispython=="$irispython_version"
    then
        echo "Failed to install intersystems_irispython==$irispython_version"
        exit 1
    fi
    echo
    chmod a+x "$datapythondir/virtual/$serverName"
    chmod a+x "$datapythondir/virtual/$serverName/bin"
    chmod -R a+x "$datapythondir/virtual/$serverName/lib"
    chmod -R a+x "$datapythondir/virtual/$serverName/include"
    echo "Updating checksum..."
    python -V>"$checksumFile"
    echo "$pythonExec">>"$checksumFile"
    echo $irisVersion>>"$checksumFile"
    echo $irispython_version>>"$checksumFile"
    echo "...updating checksum succeeded"
    echo
    echo "...setting up virtual environment succeeded"
    deactivate
fi
