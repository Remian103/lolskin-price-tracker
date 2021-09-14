"""Migrate constraint name

Revision ID: e94ff0f5b1f0
Revises: 282e09f96776
Create Date: 2021-09-14 15:44:34.806807

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e94ff0f5b1f0'
down_revision = '282e09f96776'
branch_labels = None
depends_on = None


constraint_names = [
    {
        'table': 'champions',
        'old': 'champions_pkey',
        'new': 'pk_champions'
    },
    {
        'table': 'skins',
        'old': 'skins_pkey',
        'new': 'pk_skins'
    },
    {
        'table': 'skins',
        'old': 'skins_champion_id_fkey',
        'new': 'fk_skins_champion_id_champions'
    },
    {
        'table': 'price_history',
        'old': 'price_history_pkey',
        'new': 'pk_price_history'
    },
    {
        'table': 'price_history',
        'old': 'price_history_skin_id_fkey',
        'new': 'fk_price_history_skin_id_skins'
    }
]

def upgrade():
    connection = op.get_bind()
    if connection.dialect.name == 'postgresql':
        for constraint_name in constraint_names:
            connection.execute(sa.text(f'ALTER TABLE {constraint_name["table"]} RENAME CONSTRAINT {constraint_name["old"]} TO {constraint_name["new"]}'))


def downgrade():
    connection = op.get_bind()
    if connection.dialect.name == 'postgresql':
        for constraint_name in constraint_names:
            connection.execute(sa.text(f'ALTER TABLE {constraint_name["table"]} RENAME CONSTRAINT {constraint_name["new"]} TO {constraint_name["old"]}'))
