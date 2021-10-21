## About
Utilities for league client data fetcher which depend on Windows environment and Azure Logic App.

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
 - League Client, AFAIK, pops EULA when new patch is delivered. Currently, there's no consideration of this behavior.

 - ConnectionRefusedError: [WinError 1225] The remote computer refused the network connection

   It seems to happen when calling too early. connector.ready() seems not reliable.

 - ConnectionResetError: [WinError 10054] An existing connection was forcibly closed by the remote host

   It seems to happen when calling too late. connector seems to have time out.

### Current Fix
- Use two connectors. One detects the league client and initiate 5 mins wait, and the other actually fetch data after the 5 mins wait.
