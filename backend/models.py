from email.policy import default
import os
# from settings import DB_NAME, DB_USER, DB_PASSWORD
from sqlalchemy import Column, String, Integer, DateTime
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


database_path = 'postgresql://postgres:postgres@localhost:5432/housify'
                # f.'postgresql://{DB_USER}:{DB_PASSWORD}@localhost:5432/{DB_NAME}'

db = SQLAlchemy()

"""
setup_db(app)
    binds a flask application and a SQLAlchemy service
"""

def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    migrate = Migrate(app, db)
"""
User
"""

class User(db.Model):
    __tablename__= 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    email = db.Column(db.String())
    password = db.Column(db.String())
    created_at = Column(DateTime, default=datetime.utcnow)
    wishlist = db.relationship('WishList', backref='user', lazy=True)
    agent = db.relationship('Agent', backref='agent', lazy=True)
    property = db.relationship('Property', backref='property', lazy=True)
    isAgent = db.Column(db.Boolean(), default=False)

    # def __init__(self, username, email, password, created_at, wishlist):
    #     self.username = username
    #     self.email = email
    #     self.password = password
    #     self.created_at = created_at
    #     self.wishlist = wishlist
        
    def format(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at,
            'isAgent': self.isAgent
            # 'wishlist': self.wishlist
           # agent's info            
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

"""
Saved property wishlist
"""
class WishList(db.Model):
    __tablename__='wish_list'
    id = Column(Integer, primary_key=True)
    address = Column(String)
    country = Column(String)
    property_type = Column(String)
    bedroom = Column(String)
    view1 = Column(String)
    view2 = Column(String)
    view3 = Column(String)
    view4 = Column(String)
    description = Column(String)
    price = Column(Integer)
    property_id= Column(Integer)
    agent_id= Column(Integer)
    user_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # def __init__(self, property_url, user_id, created_at):
    #     self.property_url = property_url
    #     self.user_id = user_id
    #     self.created_at = created_at

    def format(self):
        return {
            'id': self.id,
            'address' : self.address,
            'country' : self.country,
            'property_type' : self.property_type,
            'bedroom' : self.bedroom,
            'view1' : self.view1,
            'view2' : self.view2,
            'view3' : self.view3,
            'view4' : self.view4,
            'description' : self.description,
            'price' : self.price,
            'agent_id':  self.agent_id,
            'property_id':  self.property_id,
            'user_id=': self.user_id,
            'created_at': self.created_at
        }
    
    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

"""
Agent
"""

class Agent(db.Model):
    __tablename__ = 'agent'

    id = Column(Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    fullname = Column(String)
    address = Column(String)
    country = Column(String)
    phonenumber = Column(db.Integer)
    linkedin = Column(String)
    email = Column(String)
    profilePic = Column(String)
    bio = Column(String)
    twitter = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    property = db.relationship('Property', backref="agent", lazy=True)

    def format(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'fullname': self.fullname,
            'address': self.address,
            'country': self.country,
            'phonenumber': self.phonenumber,
            'linkedin': self.linkedin,
            'email': self.email,
            'bio': self.bio,
            'twitter': self.twitter,
            'profilePic': self.profilePic,
            'created_at': self.created_at 
            # 'property': self.property
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

"""
Property
"""

class Property(db.Model):
    __tablename__ = 'properties'

    id = Column(Integer, primary_key=True)
    address = Column(String)
    country = Column(String)
    property_type = Column(String)
    bedroom = Column(String)
    view1 = Column(String)
    view2 = Column(String)
    view3 = Column(String)
    view4 = Column(String)
    description = Column(String)
    price = Column(Integer)
    agent_id= db.Column(db.Integer, db.ForeignKey('agent.id'))
    user_id= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # def __init__(self, address, country, property_type,
    #             bedroom, view1, view2, view3, view4, description, price, agent_id, created_at):
    #     self.address = address
    #     self.country = country
    #     self.property_type = property_type
    #     self.bedroom = bedroom
    #     self.view1 = view1
    #     self.view2 = view2
    #     self.view3 = view3
    #     self.view4 = view4
    #     self.description = description
    #     self.price = price
    #     self.agent_id= agent_id
    #     self.created_at = created_at

    def format(self):
        return {
            'id': self.id,
            'address' : self.address,
            'country' : self.country,
            'property_type' : self.property_type,
            'bedroom' : self.bedroom,
            'view1' : self.view1,
            'view2' : self.view2,
            'view3' : self.view3,
            'view4' : self.view4,
            'description' : self.description,
            'price' : self.price,
            'agent_id':  self.agent_id,
            'created_at': self.created_at,
            'user_id=': self.user_id
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()