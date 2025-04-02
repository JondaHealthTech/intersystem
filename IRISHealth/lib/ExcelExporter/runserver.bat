@ECHO OFF
setlocal
rem %~dp0 is the expanded pathname of the current script under NT
set CACHEPATH=%~dp0..\..
echo CACHEPATH=%CACHEPATH%
set LOCALCLASSPATH=%LOCALCLASSPATH%;%CACHEPATH%\lib\ExcelExporter\excelexporter.jar
echo LOCALCLASSPATH=%LOCALCLASSPATH%
if "%EXCELSERVERMEMSIZE%"=="" set EXCELSERVERMEMSIZE=512m
set JAVAOPTS=-Denv.windir=%WINDIR% -Djava.net.preferIPv4Stack=true -Xmx%EXCELSERVERMEMSIZE%

if "%JAVA_HOME%" == "" goto noJavaHome
if not exist "%JAVA_HOME%\bin\java.exe" goto noJavaHome
if "%JAVACMD%" == "" set JAVACMD=%JAVA_HOME%\bin\java
goto run

:noJavaHome
if "%JAVACMD%" == "" set JAVACMD=java

:run
rem ECHO "%JAVACMD%"
"%JAVACMD%" -Xrs %JAVAOPTS% %LOGCHOICE% %LOGLEVEL% -cp "%LOCALCLASSPATH%";. com.intersystems.excel.ExcelServer %*
