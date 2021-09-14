from flask_sqlalchemy import SQLAlchemy
from flask_app import db


class Product (db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)  # ID
    name = db.Column(db.String(127))
    img = db.Column(db.String(511))
    price = db.Column(db.Integer)
    url = db.Column(db.String(511))

    # TODO add __repr__ and __init__
    def __init__(self, id, name, img, price, url):
        self.id = id
        self.name = name
        self.nickname = nickname
        self.img = img
        self.price = price
        self.url = url