"""empty message

Revision ID: 6d0d8b144559
Revises: e94ff0f5b1f0
Create Date: 2021-09-14 20:25:01.630630

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d0d8b144559'
down_revision = 'e94ff0f5b1f0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('champions', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('skins', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('champion_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('skins', schema=None) as batch_op:
        batch_op.alter_column('champion_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    with op.batch_alter_table('champions', schema=None) as batch_op:
        batch_op.alter_column('name',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###