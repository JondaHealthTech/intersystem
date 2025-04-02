rem Register Cache Self-Registering executables in common directory
regsvr32.exe /s "C:\Program Files (x86)\Common Files\Intersystems\Cache\CacheQuery.ocx"
regsvr32.exe /s "C:\Program Files (x86)\Common Files\Intersystems\Cache\CacheFormWizard.dll"
regsvr32.exe /s "C:\Program Files (x86)\Common Files\Intersystems\Cache\CacheList.ocx"
regsvr32.exe /s "C:\Program Files (x86)\Common Files\Intersystems\Cache\CacheActiveX.dll"
regsvr32.exe /s "C:\Program Files (x86)\Common Files\Intersystems\Cache\vism.ocx"
regsvr32.exe /s "C:\Program Files (x86)\Common Files\Intersystems\Cache\TL.dll"
@if /I (%1)==(ALL) goto ALL
@goto EXIT
:ALL
rem Register JCOM dlls
set CacheDir=C:\InterSystems\IRISHealth\bin\
regsvr32.exe /s  "%CacheDir%IRISCom.dll"
regsvr32.exe /s  "%CacheDir%IRISCSS.dll"
regsvr32.exe /s  "%CacheDir%IRISMVBasic.dll"
regsvr32.exe /s  "%CacheDir%IRISStudioAssist.dll"
regsvr32.exe /s  "%CacheDir%IRISPP.dll"
regsvr32.exe /s  "%CacheDir%IRISHTML.dll"
regsvr32.exe /s  "%CacheDir%IRISColorHTML.dll"
regsvr32.exe /s  "%CacheDir%IRISObjectScript.dll"
regsvr32.exe /s  "%CacheDir%IRISScanner.dll"
regsvr32.exe /s  "%CacheDir%IRISSPP.dll"
regsvr32.exe /s  "%CacheDir%IRISPM.dll"
regsvr32.exe /s  "%CacheDir%IRISBasic.dll"
regsvr32.exe /s  "%CacheDir%IRISUDL.dll"
regsvr32.exe /s  "%CacheDir%IRISTNodes.dll"
regsvr32.exe /s  "%CacheDir%IRISJavaScript.dll"
regsvr32.exe /s  "%CacheDir%IRISJavaSyn.dll"
regsvr32.exe /s  "%CacheDir%IRISSQLSyn.dll"
regsvr32.exe /s  "%CacheDir%IRISTSQL.dll"
regsvr32.exe /s  "%CacheDir%IRISXMLSyn.dll"
regsvr32.exe /s  "%CacheDir%IRISPythonSyn.dll"
:EXIT
