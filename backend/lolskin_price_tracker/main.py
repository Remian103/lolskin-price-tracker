from fastapi import FastAPI
import requests

app = FastAPI()


@app.get('/{champion_name}')
async def read_items(champion_name: str):
    res = requests.get(f'http://ddragon.leagueoflegends.com/cdn/11.15.1/data/ko_KR/champion/{champion_name}.json')
    skins = res.json()['data'][champion_name]['skins']
    return skins