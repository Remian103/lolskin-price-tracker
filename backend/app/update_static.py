import requests
from tqdm import tqdm

from .database import SessionLocal, engine
from . import models


def update(db, version, champion):
    icon_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{champion["id"]}.png'
    db_champion = models.Champion(id=int(champion['key']), name=champion['name'], icon_url=icon_url)
    db.add(db_champion)
    champion_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion/{champion["id"]}.json'

    skins = requests.get(champion_url).json()['data'][champion['id']]['skins']
    for skin in skins:
        trimmed_image_url = f'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/{champion["id"]}_{skin["num"]}.jpg'
        full_image_url = f'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champion["id"]}_{skin["num"]}.jpg'
        db_skin = models.Skin(id=skin['id'], name=skin['name'], trimmed_image_url=trimmed_image_url, full_image_url=full_image_url, champion=db_champion)
        db.add(db_skin)
    

def main():
    version_url = 'https://ddragon.leagueoflegends.com/api/versions.json'
    version = requests.get(version_url).json()[0]

    champions_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion.json'
    champions = requests.get(champions_url).json()['data']

    print(f'Fetched {len(champions)} champions from version {version}.')
    print(f'Do you want to reconstruct {models.Champion.__tablename__!r} and {models.Skin.__tablename__!r} table?')
    input('Press Enter to continue...')

    with SessionLocal() as db:
        # ----- Remove these lines with alembic -----
        models.Base.metadata.create_all(bind=engine)
        db.query(models.Champion).delete()
        db.query(models.Skin).delete()
        # ----- Remove these lines with alembic -----

        for champion in tqdm(champions.values()):
            update(db, version, champion)
        db.commit()


main()
