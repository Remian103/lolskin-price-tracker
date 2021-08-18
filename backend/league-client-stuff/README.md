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