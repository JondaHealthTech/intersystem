@Echo Off

Rem IRISHung Windows Script Build # 002
Rem Copyright (c) 2018, InterSystems Corporation

Rem On the Operating System Information section:
Rem Replaced SysInternals' PsInfo.exe with Windows' SystemInfo.exe (PsInfo.exe will still run if it exists in the Bin directory)
Rem Disabled MSInfo32.exe, too slow to run and too much useless hardware information (IRQs, INTs, drivers, memory segments, etc.)
Rem Lists total and available disk space on all drives
Rem Removed unnecessary checks for 16-bit Windows OS
Rem Forcefully enabled Cmd.exe Extensions

SetLocal

Rem Test for Cmd.exe shell with Extensions enabled

Verify OTHER 2>Nul
SetLocal ENABLEEXTENSIONS
If Errorlevel 1 (
	Echo.
	Call :CmdOnly
	Echo.
	Echo Unable to enable Extensions
	Goto Abort
)

If "%CMDEXTVERSION%" == "" (
	Set CMDEXTVERSION=0
)
If Not %CMDEXTVERSION% GEQ 1 (
	Call :CmdOnly
	Goto Abort
)

Color 1E

If Not Exist C:\Temp\*.* (
	MkDir C:\Temp > Nul:
)

Rem %ComputerName%	already defined at OS level
Rem %UserDomain%	already defined at OS level
Rem %SystemDrive%	already defined at OS level
Rem %UserName%		already defined at OS level
Rem %OS%			already defined at OS level
Rem %WinDir%		already defined at OS level
Set CurDir=%CD%
Set WinSysDir=%SystemRoot%\System32

Set Null=

Set Find=
If Exist "%WinSysDir%\Find.exe" (
	Set Find=%WinSysDir%\Find.exe
)

Set NetStat=
If Exist "%WinSysDir%\NetStat.exe" (
	Set NetStat=%WinSysDir%\NetStat.exe
)

Set IPConfig=
If Exist "%WinSysDir%\IPConfig.exe" (
	Set IPConfig=%WinSysDir%\IPConfig.exe
)

For %%D in ("%WinSysDir%\Cmd.exe") Do Set WinDrv=%%~dD

:GetIRISDir

If Not "%1" == "" (
	Set IRISInstallDir=%1
) Else (
	Echo.
	Set /p IRISInstallDir=Full name of InterSystems IRIS directory: 
)

If "%IRISInstallDir%" == "" (
	Goto End
)

If Not Exist "%IRISInstallDir%\Bin\IRISDB.exe" (
	Call :NotIRISDir
	Goto GetIRISDir
)
If Not Exist "%IRISInstallDir%\IRIS.cpf" (
	Call :NotIRISDir
	Goto GetIRISDir
)
If Not Exist "%IRISInstallDir%\Mgr\IRIS.dat" (
	Call :NotIRISDir
	Goto GetIRISDir
)

Rem Strip off any trailing backslash
:STRIP
Set lc=%IRISInstallDir:~-1%
if "%lc%"=="\" (
	Set IRISInstallDir=%IRISInstallDir:~0,-1%
	Goto STRIP
)

Set IRISConfigFile="%IRISInstallDir%\IRIS.cpf"

Set IRISMgrDir=%IRISInstallDir%\Mgr
Set IRISBinDir=%IRISInstallDir%\Bin

Set FullMachineName=Unknown
If Not "%Find%" == "" (
	For /f "Tokens=2" %%a in ('Ping -a %ComputerName% ^| %Find% "Pinging"') Do Set FullMachineName=%%a
)

Set IPAddress=Unknown
If Not "%Find%" == "" (
	For /f "Delims=[] Tokens=2" %%a in ('Ping -a %ComputerName% ^| %Find% "Pinging"') Do Set IPAddress=%%a
)

::: Begin set date

for /f "tokens=1-4 delims=/-. " %%i in ('date /t') do (call :set_date %%i %%j %%k %%l)
goto :end_set_date

:set_date
if "%1:~0,1%" gtr "9" shift
for /f "skip=1 tokens=2-4 delims=(-)" %%m in ('echo,^|date') do (set %%m=%1&set %%n=%2&set %%o=%3)
goto :eof

:end_set_date
::: End set date

rem Remove leading space if single digit hour
set hour=%time:~0,2%
if "%hour:~0,1%" == " " set hour=0%hour:~1,1%

Set LogFile="%IRISMgrDir%\IRISHung%yy%%mm%%dd%_%hour%%time:~3,2%.html"

Echo.
Echo Writing information to %LogFile%
Echo.
Echo Please wait...

Rem Generate HTML header

Echo ^<html^> > %LogFile%
Echo ^<head^> >> %LogFile%
Echo ^<title^> >> %LogFile%
Echo InterSystems IRIS Diagnostic Log. Filename: %LogFile%  >> %LogFile%
Echo ^</title^> >> %LogFile%
Echo ^<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"^> >> %LogFile%
Echo ^</head^> >> %LogFile%
Echo ^<body bgcolor="#FFFFFF" text="#000000"^> >> %LogFile%
Echo ^<table align="center" width="98%%" border="1" bordercolor="#999999" bgcolor="#CCCCCC"^> >> %LogFile%
  Echo ^<tr bgcolor="#FFFFFF" bordercolor="#CCCCCC"^> >> %LogFile%
    Echo ^<td colspan="5" height="40" align="center" ^> >> %LogFile%
      Echo ^<font face="Arial, Helvetica, sans-serif" size="5" color="#0000FF"^>^<b^>InterSystems IRIS Diagnostic Log^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
  Echo ^</tr^> >> %LogFile%
  Echo ^<tr bgcolor="#FFFFFF" bordercolor="#CCCCCC"^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#general"^>General^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#keyfile"^>Key File^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#cpf"^>CPF File^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#selfdiag"^>Self-Diagnosis^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#netstat"^>Network Status^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
  Echo ^</tr^> >> %LogFile%
  Echo ^<tr bgcolor="#FFFFFF" bordercolor="#CCCCCC"^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#osproc1"^>OS Processes # 1^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#irisstat1"^>irisstat # 1^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#osproc2"^>OS Processes # 2^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#irisstat2"^>irisstat # 2^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
    Echo ^<td align="center"^> >> %LogFile%
      Echo ^<font size="2" face="Arial, Helvetica, sans-serif" color="#0000FF"^>^<b^>^<a href="#cconsole"^>messages.log^</a^>^</b^>^</font^> >> %LogFile%
    Echo ^</td^> >> %LogFile%
  Echo ^</tr^> >> %LogFile%
Echo ^</table^> >> %LogFile%

Echo ^<p^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>Configuration^</font^>^</b^> >> %LogFile%
Echo ^</p^> >> %LogFile%

Echo ^<pre^> >> %LogFile%
Echo Evidence Information for InterSystems IRIS configuration in directory: %IRISInstallDir% on Machine "%ComputerName%" >> %LogFile%
Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="general"^>^</a^>General^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%

Echo Host Name: %FullMachineName%   Domain Name: %UserDomain%   IP Address: %IPAddress% >> %LogFile%
Echo. >> %LogFile%
Echo Log created by User "%UserName%" on %Date% at %Time% >> %LogFile%
Echo. >> %LogFile%

Echo Operating System Information: >> %LogFile%
Echo. >> %LogFile%
Rem RFA029+
If Exist "%WinSysDir%\SystemInfo.exe" (
	For /f "Tokens=*" %%a in ('"%WinSysDir%\SystemInfo.exe"') Do @Echo %%a >> %LogFile%
) Else If Exist "%IRISBinDir%\PsInfo.exe" (
	For /f "Tokens=*" %%a in ('"%IRISBinDir%\PsInfo.exe" -accepteula -h -s -d') Do @Echo %%a >> %LogFile%
) Else (
	For /f "Tokens=*" %%a in ('Ver') Do @Echo %%a >> %LogFile%
)

Rem Commented out MSInfo32.exe, it takes too long to run and doesn't add a lot of information that support can use.
Rem If Exist "%WinDrv%\Program Files\Common Files\Microsoft Shared\MSInfo\msinfo32.exe" (
Rem 	Echo. >> %LogFile%
Rem 	Pushd C:\Temp
Rem 	"%WinDrv%\Program Files\Common Files\Microsoft Shared\MSInfo\msinfo32.exe" /Report MSInfo.$$$ /Categories +SystemSummary
Rem 	If Exist MSInfo.$$$ (
Rem 		Type MSInfo.$$$ >> %LogFile%
Rem 		Del MSInfo.$$$ > Nul:
Rem 	)
Rem		Popd
Rem )

Echo. >> %LogFile%
Echo Windows Directory: %WinDir%   Windows System Directory: %WinSysDir% >> %LogFile%

Rem Displays space on disk drives

If Exist "%WinSysDir%\FSUtil.exe" (
	Echo. >> %LogFile%
	Echo Free Space on Disk Drives >> %LogFile%
	For %%d in (C: D: E: F: G: H: I: J: K: L: M: N: O: P: Q: R: S: T: U: V: W: X: Y: Z:) Do (
		If Exist %%d\ (
			Echo. >> %LogFile%
			Echo Drive %%d >> %LogFile%
			"%WinSysDir%\FSUtil.exe" Volume DiskFree %%d >> %LogFile%
		)
	)
)
Rem RFA029-

Echo. >> %LogFile%
Echo InterSystems IRIS Version String: >> %LogFile%
If Not "%Find%" == "" (
	For /f "Skip=2 Tokens=*" %%a in ('%Find% "IRIS for Windows" "%IRISBinDir%\IRISDB.exe"') Do Set IRISVerString=%%a
) Else (
    Set IRISVerString=IRIS version string unknown
)
If "%IRISVerString:~0,4%" == "IRIS" goto writeversion
Rem Occasionally we get garbage here which can cause an error with echo, clean it up
set IRISVerString=%IRISVerString:*IRIS for Windows=IRIS for Windows%
:writeversion
Echo %IRISVerString% >> %LogFile%
Echo. >> %LogFile%
Echo Current Drive and Directory: %CurDir% >> %LogFile%

Echo. >> %LogFile%
CHCP >> %LogFile%
Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="keyfile"^>^</a^>Key File^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%
Echo License Key File %IRISMgrDir%\iris.key: >> %LogFile%
Echo. >> %LogFile%
Type "%IRISMgrDir%\iris.key" >> %LogFile%
Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="cpf"^>^</a^>CPF File^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%
Echo InterSystems IRIS Configuration File %IRISConfigFile%: >> %LogFile%
Echo. >> %LogFile%
Type %IRISConfigFile% >> %LogFile%
Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="selfdiag"^>^</a^>irisstat -S Self-Diagnosis^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%
Echo InterSystems IRIS irisstat with -S self-diagnosis switch >> %LogFile%
Echo. >> %LogFile%
Set CstatFile=%IRISMgrDir%\IRISHungIrisstat3.txt
"%IRISBinDir%\irisstat.exe" -a0 -S2 -s"%IRISMgrDir%" >> %CstatFile%
for %%R in (%CstatFile%) do set /a CstatSize=%%~zR
If %CstatSize% GTR 2097152 (
	Echo cstat self-diagnosis output is too big, a copy has been left in %CstatFile% >> %LogFile%
	Echo File %CstatFile% not included in log file due to size. Requires separate transfer.	
) Else (
	Type %CstatFile% >> %LogFile%
	Del %CstatFile% > Nul:
)	
Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="netstat"^>^</a^>Network Status^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%

If Not "%IPConfig%" == "" (
	Echo Output of IPConfig.exe /All >> %LogFile%
	Rem Echo. >> %LogFile%
	Cmd.exe /a /c %IPConfig% /All >> %LogFile%
	Echo. >> %LogFile%
) Else (
	Echo IPConfig information cannot be displayed, program IPConfig.exe was not found in %WinSysDir% >> %LogFile%
)

If Not "%NetStat%" == "" (
	Echo Output of NetStat.exe -ano >> %LogFile%
	Rem Echo. >> %LogFile%
	%NetStat% -ano >> %LogFile%
	Echo. >> %LogFile%
	Echo Output of NetStat.exe -s >> %LogFile%
	Rem Echo. >> %LogFile%
	%NetStat% -s >> %LogFile%
) Else (
	Echo NetStat information cannot be displayed, program NetStat.exe was not found in %WinSysDir% >> %LogFile%
)
Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="osproc1"^>^</a^>OS Process List # 1^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%

If Exist "%WinSysDir%\TaskList.exe" (
	Echo TaskList.exe /V -- Show Processes >> %LogFile%
	"%WinSysDir%\TaskList.exe" /V >> %LogFile%
) Else (
	Echo Process Information cannot be displayed, program TaskList.exe was not found >> %LogFile%
)

Echo ^</pre^> >> %LogFile%

Set cstatswitches=-e2 -f-1 -m-1 -n3 -j-1 -g1 -L1 -u-1 -v1 -p-1 -c-1 -q1 -w2 -E-1 -N65535

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="irisstat1"^>^</a^>irisstat Snapshot # 1^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%
Echo InterSystems IRIS irisstat. Active switches: %cstatswitches% >> %LogFile%
Echo. >> %LogFile%
Set CstatFile=%IRISMgrDir%\IRISHungIrisstat1.txt
"%IRISBinDir%\irisstat.exe" %cstatswitches% -s"%IRISMgrDir%" > %CstatFile%
for %%R in (%CstatFile%) do set /a CstatSize=%%~zR
If %CstatSize% GTR 2097152 (
	Echo cstat output is too big, a copy has been left in %CstatFile% >> %LogFile%
	Echo File %CstatFile% not included in log file due to size. Requires separate transfer.	
) Else (
	Type %CstatFile% >> %LogFile%
	Del %CstatFile% > Nul:
)	
Echo ^</pre^> >> %LogFile%

Rem The For command below should cause almost the same effect as a Sleep 10
For /l %%I in (1,1,100000) Do Echo. > Nul:

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="osproc2"^>^</a^>OS Process List # 2^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%

If Exist "%WinSysDir%\TaskList.exe" (
	Echo TaskList.exe /V -- Show Process >> %LogFile%
	"%WinSysDir%\TaskList.exe" /V >> %LogFile%
) Else (
	Echo Process Information cannot be displayed, program TaskList.exe was not found >> %LogFile%
)

Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="irisstat2"^>^</a^>irisstat Snapshot # 2^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%
Echo InterSystems IRIS irisstat. Active switches: %cstatswitches% >> %LogFile%
Echo. >> %LogFile%
Set CstatFile=%IRISMgrDir%\IRISHungIrisstat2.txt
"%IRISBinDir%\irisstat.exe" %cstatswitches% -s"%IRISMgrDir%" > %CstatFile%
for %%R in (%CstatFile%) do set /a CstatSize=%%~zR
If %CstatSize% GTR 2097152 (
	Echo cstat output is too big, a copy has been left in %CstatFile% >> %LogFile%
	Echo File %CstatFile% not included in log file due to size. Requires separate transfer.	
) Else (
	Type %CstatFile% >> %LogFile%
	Del %CstatFile% > Nul:
)	
Echo ^</pre^> >> %LogFile%

Echo ^<hr noshade size="4"^> >> %LogFile%
Echo ^<br^> >> %LogFile%
Echo ^<b^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<a name="cconsole"^>^</a^>messages.log^</font^>^</b^> >> %LogFile%
Echo ^<pre^> >> %LogFile%
Echo InterSystems IRIS %IRISMgrDir%\messages.log >> %LogFile%

Rem check size of IRIS log file
Set CconsoleSize=""
If Exist %IRISMgrDir%\messages.log (
	for %%R in (%IRISMgrDir%\messages.log) do set /a CconsoleSize=%%~zR
) Else (
	Echo %IRISMgrDir%\messages.log file not found >> %LogFile%
)
If %CconsoleSize% == 0 Echo %IRISMgrDir%\messages.log file is zero bytes >> %LogFile%
If %CconsoleSize% GTR 2097152 (
	Echo %IRISMgrDir%\messages.log file is too big, a copy has been left in %IRISMgrDir%\IRISHungConsole.log >> %LogFile%
	Type "%IRISMgrDir%\messages.log" > %IRISMgrDir%\IRISHungConsole.log
	Echo File %IRISMgrDir%\messages.log not included in log file due to size. Requires separate transfer.	
) Else (
	If Not %CconsoleSize% == "" Type "%IRISMgrDir%\messages.log" >> %LogFile%
)
Echo ^</pre^> >> %LogFile%

Echo ^<hr size="4" noshade^> >> %LogFile%
Echo ^<p^>^<font face="Arial, Helvetica, sans-serif" size="4" color="#0000FF"^>^<b^>End of InterSystems IRIS Diagnostic Log^</b^>^</font^> >> %LogFile%
Echo ^</p^> >> %LogFile%

Echo ^<p^> >> %LogFile%
Echo End of Evidence Information for InterSystems IRIS configuration in directory: %IRISInstallDir% on Machine "%ComputerName%" >> %LogFile%
Echo ^</p^> >> %LogFile%

Echo ^</body^> >> %LogFile%
Echo ^</html^> >> %LogFile%

Echo.
Echo Log file saved to:
Echo %LogFile%
For %%F in (%LogFile%) Do @Echo File size is %%~zF bytes long

Goto End

:CmdOnly

Echo.
Echo You must run this script from the Windows Command Interpreter Cmd.exe
Echo with the Command Extensions option enabled.
Echo.
Goto :EOF

:NotIRISDir

Echo.
Echo Directory %IRISInstallDir% doesn't seem to be an InterSystems IRIS data platform directory
Echo.
Echo Please enter the full specification of the directory where InterSystems IRIS was
Echo installed, including the Drive letter (C:, D:, etc.) and the full path,
Echo e.g. C:\InterSystems\IRIS
Goto :EOF

:End

EndLocal

:Abort

Goto :EOF
