@ECHO OFF
rem %~dp0 is the expanded pathname of the current script under NT
set CACHEPATH=%~dp0..\..
echo CACHEPATH=%CACHEPATH%
set LOCALCLASSPATH=%JPDFPRINT_HOME%\jPDFPrint.jar
set LOCALCLASSPATH=%LOCALCLASSPATH%;%CACHEPATH%\lib\PrintServer\printserver.jar
echo LOCALCLASSPATH=%LOCALCLASSPATH%

if "%PRINTSERVERMEMSIZE%"=="" set PRINTSERVERMEMSIZE=512m
set JAVAOPTS=-Denv.windir=%WINDIR% -Djava.net.preferIPv4Stack=true -Xmx%PRINTSERVERMEMSIZE%

if "%JAVA_HOME%" == "" goto noJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto noJavaHome
if "%JAVACMD%" == "" set JAVACMD=%JAVA_HOME%\bin\java
goto runWithjPDFPrint

:noJavaHome
if "%JAVACMD%" == "" set JAVACMD=java

:runWithjPDFPrint
rem ECHO "%JAVACMD%"
"%JAVACMD%" -Xrs %JAVAOPTS% %LOGCHOICE% %LOGLEVEL% -cp "%LOCALCLASSPATH%";. com.intersystems.printserver.PrintServer -printengine jPDFPrint %*
