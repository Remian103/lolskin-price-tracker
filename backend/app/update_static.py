import asyncio
import time

import requests
import aiohttp
from tqdm.asyncio import tqdm_asyncio

from .database import SessionLocal, engine
from . import models

START = time.monotonic()

class RateLimiter:
    """Rate limits an HTTP client that would make get() and post() calls.
    Calls are rate-limited by host.
    https://quentin.pradet.me/blog/how-do-you-rate-limit-calls-with-aiohttp.html
    This class is not thread-safe."""
    RATE = 50  # request per second
    MAX_TOKENS = 10

    def __init__(self, client):
        self.client = client
        self.tokens = self.MAX_TOKENS
        self.updated_at = time.monotonic()

    async def get(self, *args, **kwargs):
        await self.wait_for_token()
        now = time.monotonic() - START
        print(f'{now:.0f}s: ask {args[0]}')
        return self.client.get(*args, **kwargs)

    async def wait_for_token(self):
        while self.tokens < 1:
            self.add_new_tokens()
            await asyncio.sleep(0.1)
        self.tokens -= 1

    def add_new_tokens(self):
        now = time.monotonic()
        time_since_update = now - self.updated_at
        new_tokens = time_since_update * self.RATE
        if self.tokens + new_tokens >= 1:
            self.tokens = min(self.tokens + new_tokens, self.MAX_TOKENS)
            self.updated_at = now


async def update(db, version, champion, session):
    icon_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{champion["id"]}.png'
    db_champion = models.Champion(id=int(champion['key']), name=champion['name'], icon_url=icon_url)
    # print(db_champion)
    db.add(db_champion)
    champion_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion/{champion["id"]}.json'
    async with await session.get(champion_url) as response:
        response = await response.json()
        skins = response['data'][champion['id']]['skins']
        for skin in skins:
            image_url = f'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champion["id"]}_{skin["num"]}.jpg'
            db_skin = models.Skin(id=skin['id'], name=skin['name'], image_url=image_url, price=0, sale_price=0, champion_id=int(champion['key']))
            #print(db_skin)
            db.add(db_skin)
    

async def main():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    version_url = 'https://ddragon.leagueoflegends.com/api/versions.json'
    version = requests.get(version_url).json()[0]

    champions_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion.json'
    champions = requests.get(champions_url).json()['data']

    # for champion in champions.values():
    #     champion_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion/{champion["id"]}.json'
    #     res = requests.get(champion_url)
    #     print(champion['id'])

    print(f'Fetched {len(champions)} champions from version {version}.')
    print('Do you want to overwrite current \'champions\' and \'skins\' table?')
    input('Press Enter to continue...')

    db.query(models.Champion).delete()
    db.query(models.Skin).delete()
    async with aiohttp.ClientSession() as session:
        session = RateLimiter(session)
        await tqdm_asyncio.gather(*[update(db, version, champion, session) for champion in champions.values()])
    db.commit()

asyncio.run(main())
