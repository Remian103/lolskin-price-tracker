from .database import SessionLocal
from . import models
import requests

db = SessionLocal()

champions_url = 'http://ddragon.leagueoflegends.com/cdn/11.15.1/data/ko_KR/champion.json'
icon_url_prefix = 'http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/'
icon_url_postfix = '.png'

res_json = requests.get(champions_url).json()
champions = res_json['data']

print(f'Fetched {len(champions)} champions from version {res_json["version"]}.')
print('Do you want to overwrite \'Champion\' table?')
input('Press Enter to continue...')

try: 
    db.query(models.Champion).delete()
    for champion in champions.values():
        db_champion = models.Champion(id=int(champion['key']), name=champion['name'], icon_url=icon_url_prefix + champion['id'] + icon_url_postfix)
        print(db_champion)
        db.add(db_champion)
    db.commit()
except:
    print('An error occured.')
    print('This script does not generate database metedata.')
    print('Try run the app once to intialize database metadata.')
