"""Add 'is_available' and 'is_on_sale'

Revision ID: 282e09f96776
Revises: 0314efd61303
Create Date: 2021-08-26 13:51:23.615763

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import MetaData, Table


# revision identifiers, used by Alembic.
revision = '282e09f96776'
down_revision = '0314efd61303'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('price_history', sa.Column('is_available', sa.Boolean(), server_default='false', nullable=False))
    op.add_column('price_history', sa.Column('is_on_sale', sa.Boolean(), server_default='false', nullable=False))

    # Data Migration
    connection = op.get_bind()
    meta = MetaData(bind=connection)
    table = Table('price_history', meta, autoload_with=connection)
    connection.execute(sa.update(table).where(table.c.price != 0).values(is_available=True))
    connection.execute(sa.update(table).where(
        sa.and_(
            table.c.is_available == True,
            table.c.price != table.c.sale_price,
            table.c.sale_price != 0
        )
    ).values(is_on_sale=True))
    
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('price_history', 'is_on_sale')
    op.drop_column('price_history', 'is_available')
    # ### end Alembic commands ###
