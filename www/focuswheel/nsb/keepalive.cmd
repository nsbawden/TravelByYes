@powershell  (ls keepalive.cmd).LastWriteTime = Get-Date
@cd
@date /T
@time /T
@ping 1.1.1.1 -n 1 -w 180000 > nul
@cls
@keepalive.cmd