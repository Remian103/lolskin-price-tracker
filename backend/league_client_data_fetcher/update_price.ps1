cd "C:\Riot Games\Riot Client"
.\RiotClientServices.exe --launch-product=league_of_legends --launch-patchline=live
cd C:\Users\lspt2021\Desktop\lolskin-price-tracker\backend\league_client_data_fetcher
poetry run python update_price.py