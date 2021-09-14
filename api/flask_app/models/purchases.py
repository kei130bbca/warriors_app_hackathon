
from flask_sqlalchemy import SQLAlchemy
from flask_app import db


class Purchase (db.Model):  # A Model representing purchases and reviews
    __tablename__ = "purchases"
    id = db.Column(db.Integer, primary_key=True)  # ID
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    products_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    count = db.Column(db.Integer)
    bought_at = db.Column(db.DateTime)
    comment = db.Column(db.String(511))
    stars = db.Column(db.Integer)
    title = db.Column(db.String(255))

    def __init__(self, id, products_id, count, bought_at, comment, stars, title):
        self.id = id
        self.name = name
        self.products_id = products_id
        self.count = count
        self.bought_at = bought_at
        self.comment = comment
        self.stars = stars
        self.title = title

    def __repr__(self):
        return f"<Purchase(id=%s)>" % self.id