"""initial migrate

Revision ID: 2da5b720a8c8
Revises: 
Create Date: 2021-09-14 07:42:53.885545

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2da5b720a8c8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=127), nullable=True),
    sa.Column('img', sa.String(length=511), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('url', sa.String(length=511), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=127), nullable=True),
    sa.Column('nickname', sa.String(length=127), nullable=True),
    sa.Column('twitter_screenname', sa.String(length=127), nullable=True),
    sa.Column('youtube_url', sa.String(length=511), nullable=True),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.Column('icon', sa.String(length=127), nullable=True),
    sa.Column('description', sa.String(length=511), nullable=True),
    sa.Column('roles', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('purchases',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('products_id', sa.Integer(), nullable=True),
    sa.Column('count', sa.Integer(), nullable=True),
    sa.Column('bought_at', sa.DateTime(), nullable=True),
    sa.Column('comment', sa.String(length=511), nullable=True),
    sa.Column('stars', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['products_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('purchases')
    op.drop_table('users')
    op.drop_table('products')
    # ### end Alembic commands ###
