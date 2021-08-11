import asyncio

import requests
import aiohttp
from .database import SessionLocal, engine
from . import models


async def update(db, version, champion, session):
    icon_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{champion["id"]}.png'
    db_champion = models.Champion(id=int(champion['key']), name=champion['name'], icon_url=icon_url)
    print(db_champion)
    db.add(db_champion)
    champion_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion/{champion["id"]}.json'
    async with session.get(url=champion_url) as response:
        response = await response.json()
        skins = response['data'][champion['id']]['skins']
        for skin in skins:
            image_url = f'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champion["id"]}_{skin["num"]}.jpg'
            db_skin = models.Skin(id=skin['id'], name=skin['name'], image_url=image_url, price=0, sale_price=0, champion_id=int(champion['key']))
            print(db_skin)
            db.add(db_skin)
    

async def main():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    version_url = 'https://ddragon.leagueoflegends.com/api/versions.json'
    version = requests.get(version_url).json()[0]

    champions_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion.json'
    champions = requests.get(champions_url).json()['data']

    print(f'Fetched {len(champions)} champions from version {version}.')
    print('Do you want to overwrite current \'champions\' and \'skins\' table?')
    input('Press Enter to continue...')

    db.query(models.Champion).delete()
    db.query(models.Skin).delete()
    async with aiohttp.ClientSession() as session:
        await asyncio.gather(*[update(db, version, champion, session) for champion in champions.values()])
    db.commit()

asyncio.run(main())
