#!/usr/bin/env python
# import sqlite3

# con = sqlite3.connect("sqlite3.db")
# cur = con.cursor()
# cur.execute("select sql from sqlite_master where type='table'")
# for i in cur.fetchall():
#     print(i[0])
# con.close()

from sqlalchemy import MetaData
from app.database import engine


metadata = MetaData()
metadata.reflect(bind=engine)
for table_name in metadata.tables:
    print(f'{"="*10} {table_name!r} {"="*(70 - len(table_name))}')
    for column in metadata.tables[table_name].columns:
        print(f'  {column!r}')
    for constraint in metadata.tables[table_name]._sorted_constraints:
        print(f'  {constraint.name}: {constraint!r}')
