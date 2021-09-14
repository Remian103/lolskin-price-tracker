"""Remove obsolete columns

Revision ID: 102045a9baaa
Revises: 78c2284225d0
Create Date: 2021-09-14 20:52:22.493021

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '102045a9baaa'
down_revision = '78c2284225d0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('price_history', schema=None) as batch_op:
        batch_op.drop_column('is_on_sale')

    with op.batch_alter_table('skins', schema=None) as batch_op:
        batch_op.drop_column('sale_price')
        batch_op.drop_column('price')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('skins', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('sale_price', sa.INTEGER(), autoincrement=False, nullable=True))

    with op.batch_alter_table('price_history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_on_sale', sa.BOOLEAN(), server_default=sa.text('false'), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
