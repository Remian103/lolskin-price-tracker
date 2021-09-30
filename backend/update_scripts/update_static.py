import requests
from tqdm import tqdm

from app.database import SessionLocal
from app import models


def update(db, version, champion):
    icon_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/img/champion/{champion["id"]}.png'

    db_champion = db.query(models.Champion).filter(models.Champion.id == int(champion['key'])).first()
    if db_champion is None:
        db_champion = models.Champion(id=int(champion['key']), name=champion['name'], icon_url=icon_url)
        db.add(db_champion)
    else:
        db_champion.id = int(champion['key'])
        db_champion.name = champion['name']
        db_champion.icon_url = icon_url

    champion_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion/{champion["id"]}.json'
    skins = requests.get(champion_url).json()['data'][champion['id']]['skins']
    for skin in skins:
        trimmed_image_url = f'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/{champion["id"]}_{skin["num"]}.jpg'
        full_image_url = f'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champion["id"]}_{skin["num"]}.jpg'

        db_skin = db.query(models.Skin).filter(models.Skin.id == skin['id']).first()
        if db_skin is None:
            db_skin = models.Skin(id=skin['id'], name=skin['name'], trimmed_image_url=trimmed_image_url, full_image_url=full_image_url, champion=db_champion)
            db.add(db_skin)
        else:
            db_skin.id = skin['id']
            db_skin.name = skin['name']
            db_skin.trimmed_image_url = trimmed_image_url
            db_skin.full_image_url = full_image_url
            db_skin.champion = db_champion
    

def main():
    version_url = 'https://ddragon.leagueoflegends.com/api/versions.json'
    version = requests.get(version_url).json()[0]

    champions_url = f'http://ddragon.leagueoflegends.com/cdn/{version}/data/ko_KR/champion.json'
    champions = requests.get(champions_url).json()['data']

    print(f'Fetched {len(champions)} champions from version {version}.')
    print(f'Do you want to update {models.Champion.__tablename__!r} and {models.Skin.__tablename__!r} table?')
    input('Press Enter to continue...')

    with SessionLocal() as db:
        for champion in tqdm(champions.values()):
            update(db, version, champion)
        db.commit()


if __name__ == '__main__':
    main()
