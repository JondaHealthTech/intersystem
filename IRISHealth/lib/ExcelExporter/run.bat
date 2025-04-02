@ECHO OFF

SETLOCAL ENABLEDELAYEDEXPANSION

rem %~dp0 is the expanded pathname of the current script under NT
set LOCAL_EXCEL_HOME=
if "%OS%"=="Windows_NT" set LOCAL_EXCEL_HOME="%~dp0"

set EXCEL_CMD_LINE_ARGS=%1
if ""%1""=="""" goto doneStart
shift
:setupArgs
if ""%1""=="""" goto doneStart
set EXCEL_CMD_LINE_ARGS=%EXCEL_CMD_LINE_ARGS% %1
shift
goto setupArgs
rem This label provides a place for the argument list loop to break out 
rem and for NT handling to skip to.
:doneStart

set LIBDIR=%LOCAL_EXCEL_HOME%

for %%l in (%LIBDIR%*.jar) do set LOCALCLASSPATH=!LOCALCLASSPATH!;%%l

if "%EXCELMEMSIZE%"=="" set EXCELMEMSIZE=512m
set JAVAOPTS=-Xmx%EXCELMEMSIZE% -Djava.awt.headless=true -Denv.windir=%WINDIR% -Duser.home="%UserProfile%"

if "%JAVA_HOME%" == "" goto noJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto noJavaHome
if "%JAVACMD%" == "" set JAVACMD=%JAVA_HOME%\bin\java
goto runEXCEL

:noJavaHome
if "%JAVACMD%" == "" set JAVACMD=java

:runEXCEL
"%JAVACMD%" %JAVAOPTS% -cp "%LOCALCLASSPATH%" %EXCEL_OPTS% com.intersystems.excel.ExportWithoutServer %EXCEL_CMD_LINE_ARGS%

exit /b %ERRORLEVEL%

ENDLOCAL
