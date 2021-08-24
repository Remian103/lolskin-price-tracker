from datetime import date, timedelta
import random

from tqdm import tqdm

from app.database import SessionLocal
from app import models


def main():
    print(f'Do you want to overwrite {models.Price_History.__tablename__!r} table with test data?')
    input('Press Enter to continue...')

    with SessionLocal() as db:
        db.query(models.Price_History).delete()
        for skin in tqdm(db.query(models.Skin).all()):
            for i in range(50):
                price = random.randrange(3000)
                sale_price = price * random.random()
                db_price_history = models.Price_History(skin=skin, price=price, sale_price=sale_price, date=date.today() - timedelta(days=i))
                db.add(db_price_history)

        db.commit()


main()