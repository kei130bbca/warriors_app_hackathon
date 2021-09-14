from flask_sqlalchemy import SQLAlchemy
from flask_app import db


class Product (db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)  # ID
    # TODO add __repr__ and __init__
    name = db.Column(db.String(127))
    img = db.Column(db.String(511))
    price = db.Column(db.Integer)
    url = db.Column(db.String(511))
