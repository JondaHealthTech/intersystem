@echo off

goto START

:USAGE
echo.
echo Usage:
echo     setup.bat ^<serverName^> ^<pythonExecutablePath or pythonCommand^>
echo Examples:
echo     setup.bat pserver python
echo     setup.bat pserver C:\Programs\Python37\python.exe
exit /B 0

:START
:: 1st argument: server name
:: 2nd argument: python executable path or python command
:: 3rd argument: (optional) setup level
:: 4th argument: (optional) IRIS $zversion string
:: 5th argument: (optional) irispython wheel version
if "%~1"=="" goto USAGE
if "%~2"=="" goto USAGE
:: Command "setup.bat ?" returns usage
if "%~1"=="?" goto USAGE
set "serverName=%~1"
set "pythonExec=%~2"
set "setupLevel=%~3"
if "%~4"=="" (
  set irisVersion=""
) else (
  set "irisVersion=%~4"
)
set "irispython_version=%~5"

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
  )
)
set "datapythondir=%datadir%\dev\python"

:: RemoveDirectoryTree is for internal use only
if "%setupLevel%"=="RemoveDirectoryTree" (
  del /f /s /q "%datapythondir%\virtual\%serverName%_%~4\.pythonpath"
  rd /s /q "%datapythondir%\virtual\%serverName%_%~4"
  exit /B 0
)

:: get crc32 hash value of serverName
set "crccmd=call "%pythonExec%" -c "import zlib;print(zlib.crc32(b'%serverName%'))""
for /F "tokens=*" %%i in (' %crccmd% ') do set crcValue=%%i
set "serverName=%serverName%_%crcValue%"

echo.
echo Setting up virtual environment...

setlocal EnableDelayedExpansion
set escapedServerName=%serverName%
if "%serverName:~0,1%"=="%%" (
  set escapedServerName=!serverName:%%=%%%%!
)
endlocal & set "escapedServerName=%escapedServerName%"

if "%setupLevel%"=="1" (
  goto INSTALLPKG
)

:: create virtual environment
echo.
echo Creating virtual environment...
set "virtualEnvDir=%datapythondir%\virtual\%escapedServerName%" 
if /I "%COMSPEC%"==%CMDCMDLINE% (
  :: if running from command line, start in background
  call START "" /B /WAIT "%pythonExec%" -m venv "%virtualEnvDir%" --clear
) else (
  :: if calling by IRIS, do not start in background
  call START "" /MIN /WAIT "%pythonExec%" -m venv "%virtualEnvDir%" --clear
)

:: check if virtual environment is created successfully
if %errorlevel% neq 0 (
  echo ...creating virtual environment failed
  echo.
  echo ...setting up virtual environment failed
  exit /B 1
)

set "originActivate=%datapythondir%\virtual\%serverName%\Scripts\activate.bat"
set "tempActivate=%datapythondir%\virtual\%serverName%\Scripts\tmpactivate.bat"
set "findPath=set PATH=%%VIRTUAL_ENV%%\Scripts;%%PATH%%"
set "findPrompt=set PROMPT=(%serverName%) %%PROMPT%%"
if exist "%datapythondir%\virtual\%serverName%\Scripts\activate" (
  :: modify activate.bat to handle "%" in server name
  if "%serverName:~0,1%"=="%%" (
    setlocal EnableDelayedExpansion
    (for /f "usebackq delims=" %%i in ("%originActivate%") do (
      set "line=%%i"
      set "dequoted=!line:"=!"
      if "!dequoted!"=="%findPath%" (
        echo %%i
        echo set PATH=%datapythondir%\virtual\%escapedServerName%\Scripts;%%PATH%%
      ) else if "!dequoted!"=="%findPrompt%" (
        echo set PROMPT=(%escapedServerName%^) %%^PROMPT%%
      ) else (
        echo %%i
      )
    ))>"%tempActivate%"
    endlocal
    move /Y "%tempActivate%" "%originActivate%" >nul
  )
  echo ...creating virtual environment succeeded
) else (
  echo ...creating virtual environment failed
  echo.
  echo ...setting up virtual environment failed
  exit /B 1
)

:INSTALLPKG
:: activate virtual environment
echo.
echo Activating virtual environment...
set checksumFile="%datapythondir%\virtual\%serverName%\.pythonpath"
call "%datapythondir%\virtual\%escapedServerName%\Scripts\activate"
if "%VIRTUAL_ENV%"=="" (
  echo ...activating virtual environment failed
  echo.
  echo ...setting up virtual environment failed
  exit /B 1
)

echo ...activating virtual environment succeeded
echo.
echo Upgrading pip...
if exist "%installpythondir%\pip-*.whl" (
  call python -m pip install --upgrade --no-index --find-links=%installpythondir% pip
) else (
  call python -m pip install --upgrade pip
)
echo.
echo Installing intersystems_irispython...
if "%irispython_version%"=="" (
  echo irispython_version is not set, default to 3.2.0
  set irispython_version=3.2.0
)
echo irispython_version is set to %irispython_version%
call python -m pip install --upgrade --force-reinstall --no-index --find-links=%installpythondir% intersystems_irispython==%irispython_version%
if %errorlevel% neq 0 (
  echo Failed to install intersystems_irispython==%irispython_version%
  exit /B 1
)
echo.
echo Updating checksum...
call python -V>%checksumFile%
echo %pythonExec%>>%checksumFile%
echo %irisVersion%>>%checksumFile%
echo %irispython_version%>>%checksumFile%
echo ...updating checksum succeeded
echo.
echo ...setting up virtual environment succeeded
call deactivate
