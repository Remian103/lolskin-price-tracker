import time
import asyncio
from datetime import date

import requests
from tqdm import tqdm
from tqdm.asyncio import tqdm_asyncio
from lcu_driver import Connector

from app.database import SessionLocal
from app import models
    

pre_connector = Connector()
@pre_connector.ready
async def get_ready(connection):
    print('League Client detected.')
    print('Sleeping for 180 secs for stable connection...')
    for i in tqdm(range(180)):
        time.sleep(1)

pre_connector.start()


connector = Connector()


async def gather_with_concurrency(n, *tasks):
    semaphore = asyncio.Semaphore(n)

    async def sem_task(task):
        async with semaphore:
            return await task
    return await tqdm_asyncio.gather(*(sem_task(task) for task in tasks))

async def update(connection, db, skin):
    skin_api_uri = f'/lol-store/v1/skins/{skin.id}'
    skin_data = await connection.request('get', skin_api_uri)
    skin_data = await skin_data.json()

    # If the item is available in store
    try:
        is_available = True
        price = skin_data['prices'][0]['cost']
    except Exception:
        is_available = False
        price = 0

    # If the item is on sale
    try:
        is_on_sale = True
        sale_price = skin_data['sale']['prices'][0]['cost']
    except Exception:
        is_on_sale = False
        sale_price = price

    db_price_history = models.PriceHistory(skin=skin, date=date.today(), is_available=is_available, is_on_sale=is_on_sale, price=price, sale_price=sale_price)
    db.add(db_price_history)


@connector.ready
async def update_skins_price(connection):
    print('Starting skin update...')
    with SessionLocal() as db:

        await gather_with_concurrency(50, *[update(connection, db, skin) for skin in db.query(models.Skin).all()])
        db.commit()
    EALRY_STOP_CALL_URL = 'Make_your_own_url_by_Azure_Logic_App'
    requests.get(EALRY_STOP_CALL_URL)


connector.start()
