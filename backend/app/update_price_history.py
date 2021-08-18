from datetime import date

from tqdm.asyncio import tqdm_asyncio
from lcu_driver import Connector

from .database import SessionLocal, engine
from . import models
    

connector = Connector()


async def update(connection, db, skin):
    skin_api_uri = f'/lol-store/v1/skins/{skin.id}'
    skin_data = await connection.request('get', skin_api_uri)
    skin_data = await skin_data.json()

    # If the item is available in store
    try:
        price = skin_data['prices'][0]['cost']
    except Exception:
        price = 0

    # If the item is on sale
    try:
        sale_price = skin_data['sale']['prices'][0]['cost']
    except Exception:
        sale_price = 0

    db_price_history = models.Price_History(skin=skin, date=date.today(), price=price, sale_price=sale_price)
    db.add(db_price_history)


@connector.ready
async def update_skins_price(connection):
    with SessionLocal() as db:
        # ----- Remove this line with alembic -----
        models.Base.metadata.create_all(bind=engine)
        # ----- Remove this line with alembic -----

        await tqdm_asyncio.gather(*[update(connection, db, skin) for skin in db.query(models.Skin).all()])
        db.commit()


connector.start()
