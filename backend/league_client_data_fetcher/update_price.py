#!/usr/bin/env python
import time
import traceback
import os
import asyncio
from datetime import date, datetime

import requests
from tqdm import tqdm
from tqdm.asyncio import tqdm_asyncio
from lcu_driver import Connector

from app.database import SessionLocal
from app import models
from league_client_data_fetcher.secrets import EALRY_STOP_CALL_URL


pre_connector = Connector()
@pre_connector.ready
async def get_ready(connection):
    print('League Client detected.')
    print('Sleeping for 300 secs for stable connection...')
    for i in tqdm(range(300)):
        time.sleep(1)
pre_connector.start()


# https://stackoverflow.com/a/61478547/15909723
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
        price = skin_data['prices'][0]['cost']
        is_available = True
        # If the item is on sale
        try:
            sale_price = skin_data['sale']['prices'][0]['cost']
        except Exception:
            sale_price = price
    except Exception:
        price = None
        sale_price = None
        is_available = False 

    db_price_history = db.query(models.PriceHistory).filter((models.PriceHistory.skin_id == skin.id) & (models.PriceHistory.date == date.today())).first()
    if db_price_history is None:
        db_price_history = models.PriceHistory(skin=skin, date=date.today(), is_available=is_available, price=price, sale_price=sale_price)
    else:
        db_price_history.price = price
        db_price_history.sale_price = sale_price
        db_price_history.is_available = is_available

    db.add(db_price_history)


connector = Connector()
@connector.ready
async def update_skins_price(connection):
    print('Starting skin update...')
    with SessionLocal() as db:
        try:
            await gather_with_concurrency(50, *[update(connection, db, skin) for skin in db.query(models.Skin).all()])
            db.commit()
        except Exception as e:
            log_file = os.path.join(os.path.dirname(__file__), 'update_price.log')
            with open(log_file, 'a+') as f:
                f.write(f'===== [{datetime.today()}] ======\n')
                f.write(f'{str(e)}\n')
                f.write(traceback.format_exc())
    requests.get(EALRY_STOP_CALL_URL)
connector.start()
