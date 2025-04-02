@ECHO OFF

SETLOCAL ENABLEDELAYEDEXPANSION

rem %~dp0 is the expanded pathname of the current script under NT
set CACHEPATH=%~dp0..\..
echo CACHEPATH=%CACHEPATH%
set LOCAL_FOP_HOME=%CACHEPATH%\fop\

set LIBDIR=%LOCAL_FOP_HOME%lib

set LOCALCLASSPATH=%LOCALCLASSPATH%;%CACHEPATH%\lib\RenderServer\renderserver.jar

set FOP_CMD_LINE_ARGS=%1
if ""%1""=="""" goto doneStart
shift
:setupArgs
if ""%1""=="""" goto doneStart
set FOP_CMD_LINE_ARGS=%FOP_CMD_LINE_ARGS% %1
shift
goto setupArgs
rem This label provides a place for the argument list loop to break out 
rem and for NT handling to skip to.
:doneStart

set LOGCHOICE=
rem The default commons logger for JDK1.4 is JDK1.4Logger.
rem To use a different logger, uncomment the one desired below
rem set LOGCHOICE=-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.NoOpLog
rem set LOGCHOICE=-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.SimpleLog
rem set LOGCHOICE=-Dorg.apache.commons.logging.Log=org.apache.commons.logging.impl.Log4JLogger

set LOGLEVEL=
rem Logging levels
rem Below option is only if you are using SimpleLog instead of the default JDK1.4 Logger.
rem To set logging levels for JDK 1.4 Logger, edit the %JAVA_HOME%\JRE\LIB\logging.properties 
rem file instead.
rem Possible SimpleLog values:  "trace", "debug", "info" (default), "warn", "error", or "fatal".
rem set LOGLEVEL=-Dorg.apache.commons.logging.simplelog.defaultlog=INFO

set LIBDIR=%LOCAL_FOP_HOME%lib

set LOCALCLASSPATH=%LOCALCLASSPATH%;%FOP_HYPHENATION_PATH%
for %%l in (%LOCAL_FOP_HOME%build\*.jar %LIBDIR%\*.jar) do set LOCALCLASSPATH=!LOCALCLASSPATH!;%%l

REM set JAVAOPTS=-Denv.windir=%WINDIR%
if "%RENDERSERVERMEMSIZE%"=="" set RENDERSERVERMEMSIZE=512m
set JAVAOPTS=-Denv.windir=%WINDIR% -Djavax.xml.transform.TransformerFactory=net.sf.saxon.TransformerFactoryImpl -Djava.net.preferIPv4Stack=true -Xmx%RENDERSERVERMEMSIZE%

if "%JAVA_HOME%" == "" goto noJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto noJavaHome
if "%JAVACMD%" == "" set JAVACMD=%JAVA_HOME%\bin\java
goto runWithFop

:noJavaHome
if "%JAVACMD%" == "" set JAVACMD=java

:runWithFop

"%JAVACMD%" -Xrs %JAVAOPTS% %LOGCHOICE% %LOGLEVEL% -cp "%LOCALCLASSPATH%";. com.intersystems.zenreports.RenderServer -render FOP %*

ENDLOCAL
