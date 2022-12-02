"""empty message

Revision ID: 1b668820394c
Revises: 427e54addc01
Create Date: 2022-11-09 10:53:58.470375

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1b668820394c'
down_revision = '427e54addc01'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('wish_list', sa.Column('address', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('country', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('property_type', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('bedroom', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('view1', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('view2', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('view3', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('view4', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('description', sa.String(), nullable=True))
    op.add_column('wish_list', sa.Column('price', sa.Integer(), nullable=True))
    op.add_column('wish_list', sa.Column('agent_id', sa.Integer(), nullable=True))
    op.alter_column('wish_list', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_column('wish_list', 'property_url')
    op.drop_column('wish_list', 'test')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('wish_list', sa.Column('test', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('wish_list', sa.Column('property_url', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.alter_column('wish_list', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('wish_list', 'agent_id')
    op.drop_column('wish_list', 'price')
    op.drop_column('wish_list', 'description')
    op.drop_column('wish_list', 'view4')
    op.drop_column('wish_list', 'view3')
    op.drop_column('wish_list', 'view2')
    op.drop_column('wish_list', 'view1')
    op.drop_column('wish_list', 'bedroom')
    op.drop_column('wish_list', 'property_type')
    op.drop_column('wish_list', 'country')
    op.drop_column('wish_list', 'address')
    # ### end Alembic commands ###
