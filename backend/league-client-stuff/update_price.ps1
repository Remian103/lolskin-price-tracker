cd "C:\Riot Games\Riot Client"
.\RiotClientServices.exe --launch-product=league_of_legends --launch-patchline=live
cd C:\Users\lstp2021\Desktop\lolskin-price-tracker\backend\update_scripts
poetry run python update_price_history.py