@echo off

goto START

:USAGE
echo.
echo Usage:
echo     runpython.bat ^<serverName^> --venv
echo Description:
echo     Activate virtual environment.
echo.
echo Usage:
echo     runpython.bat ^<serverName^> [python options and arguments]
echo Description:
echo     Run python in virtual environment.
echo Example:
echo     runpython.bat pserver -V
exit /B 0

:START
:: Command "runpython.bat ?" returns usage
if "%~1"=="?" goto USAGE
:: first argument: server name
:: remaining arguments: python options and arguments
set "serverName=%~1"
set args=%*
call set pyargs=%%args:*%1=%%

set "installpythondir=%~dp0"
set "installdir=%installpythondir:~0,-12%"
:: initialize datadir as installdir
set "datadir=%installdir%"
set "qlistcmd=call %installdir%\bin\IRIS QLIST"
for /F "tokens=2,13 delims=^" %%i in (' %qlistcmd% ') do (
  if not "%%j"=="" (
    if "%%i"=="%installdir%" (
      set "datadir=%%j"
    )
    if "%%i"=="%installdir%\" (
      set "datadir=%%j"
    ) 
  )
)
set "datapythondir=%datadir%\dev\python"

:: get crc32 hash value of serverName
setlocal EnableDelayedExpansion
:: try to use the python in serverName_*\Scripts
for /d %%a in ("%datapythondir%\virtual\!serverName!_*") do (
  pushd "%%a\Scripts"
  (for /F "tokens=*" %%j in (' call python -c "import zlib;print(zlib.crc32(b'!serverName!'))" ') do set crcValue=%%j) 2> nul
  popd
  if defined crcValue (
    set "serverName=!serverName!_!crcValue!"
    goto EXITLOOP
  )
)
if not defined crcValue (
  echo Virtual environment for %serverName% was not found.
  exit /B 1
)
:EXITLOOP
endlocal & set "serverName=%serverName%"

:: serverName replace % with %%
setlocal EnableDelayedExpansion
set escapedServerName=%serverName%
if "%serverName:~0,1%"=="%%" (
  set escapedServerName=!serverName:%%=%%%%!
)
endlocal & set "escapedServerName=%escapedServerName%"

:: activate virtual environment
call "%datapythondir%\virtual\%escapedServerName%\Scripts\activate"

if "%VIRTUAL_ENV%"=="" (
  echo Activating virtual environment failed.
) else (
  if "%2"=="--venv" (
    echo.
    echo Type "deactivate" to exit virtual environment
  ) else (
    call python %pyargs%
  )
)
