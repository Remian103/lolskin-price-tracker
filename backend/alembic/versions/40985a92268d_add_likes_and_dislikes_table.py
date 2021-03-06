"""Add 'likes' and 'dislikes' table

Revision ID: 40985a92268d
Revises: a80b813b9641
Create Date: 2021-09-15 05:11:09.495257

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40985a92268d'
down_revision = 'a80b813b9641'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dislikes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], name=op.f('fk_dislikes_comment_id_comments')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_dislikes_user_id_users')),
    sa.PrimaryKeyConstraint('user_id', 'comment_id', name=op.f('pk_dislikes'))
    )
    op.create_table('likes',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], name=op.f('fk_likes_comment_id_comments')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_likes_user_id_users')),
    sa.PrimaryKeyConstraint('user_id', 'comment_id', name=op.f('pk_likes'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('dislikes')
    # ### end Alembic commands ###
