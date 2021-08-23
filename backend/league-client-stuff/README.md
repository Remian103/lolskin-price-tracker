## About
A messy folder for files/instructions about deployment on the server where League Client and the update script runs.

### How to reformulate current image?
Install
- [League Client](https://download.kr.riotgames.com/league?_gl=1*e509tb*_ga*NTYwNTAzODc0LjE2Mjg2NjI5NjE.*_ga_FXBJE5DEDD*MTYyOTMwNzk1NS40LjAuMTYyOTMwNzk1NS42MA..)
- [Python](https://www.python.org/downloads/)
- [Git](https://git-scm.com/downloads)
- [Poetry](https://python-poetry.org/docs/)

Configure
- [Enable Windows Auto logon](https://docs.microsoft.com/en-us/sysinternals/downloads/autologon)
- register 'update_script.ps1' as daily task

...

### Known issues
 - Username on the windows instance is wrong! 'ls**pt**2021' was intended, but not it is 'ls**tp**2021'
 - League Client, AFAIK, pops EULA when new patch is delivered. Currently, there's no consideration of this behavior.
 - 'update_*.py' obviously doesn't belong to the 'app'. Wrong hierarchy!


 - ConnectionRefusedError: [WinError 1225] The remote computer refused the network connection

   It seems to happen when calling too early. connector.ready() seems not reliable.

 - ConnectionResetError: [WinError 10054] An existing connection was forcibly closed by the remote host

   It seems to happen when calling too late. connector seems to have time out.

### Current Fix
- Use two connectors, one just to detect the league client and initiate 5min wait, and the other to actually fetch data after the 5min wait.