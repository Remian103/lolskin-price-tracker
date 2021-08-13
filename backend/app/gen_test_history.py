from datetime import date, timedelta

from tqdm import tqdm

from .database import SessionLocal, engine
from . import models
    

def main():
    print(f'Do you want to overwrite {models.Price_History.__tablename__!r} table with test data?')
    input('Press Enter to continue...')

    with SessionLocal() as db:
        models.Base.metadata.create_all(bind=engine)
        
        db.query(models.Price_History).delete()
        for skin in tqdm(db.query(models.Skin).all()):
            for i in range(10):
                db_price_history = models.Price_History(skin=skin, date=date.today() + timedelta(days=i))
                db.add(db_price_history)

        db.commit()


main()
