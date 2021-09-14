from datetime import date, timedelta
import random

from tqdm import tqdm

from app.database import SessionLocal, DB_URL
from app import models


def main():
    if not DB_URL.startswith('sqlite'):
        print('Current database is not local SQLite')
        print('History test data generation for database other than local SQLite is restricted for safety')
        return
    print(f'Do you want to overwrite current local SQLite\'s {models.Price_History.__tablename__!r} table with test data?')
    input('Press Enter to continue...')

    with SessionLocal() as db:
        db.query(models.Price_History).delete()
        for skin in tqdm(db.query(models.Skin).all()):
            for i in range(20):
                if random.random() > 0.8:
                    # Not for sale
                    db_price_history = models.Price_History(skin=skin, date=date.today() - timedelta(days=i))
                else:
                    price = random.choice([390, 520, 750, 975, 1350, 1820, 2775, 3250])
                    if random.random() > 0.3:
                        # Not on sale
                        db_price_history = models.Price_History(skin=skin, price=price, is_available=True, date=date.today() - timedelta(days=i))
                    else:
                        sale_price = price * random.random()
                        db_price_history = models.Price_History(skin=skin, price=price, sale_price=sale_price, is_available=True, date=date.today() - timedelta(days=i))
                db.add(db_price_history)

        db.commit()


main()