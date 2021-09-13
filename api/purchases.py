
from flask_sqlalchemy import SQLAlchemy
from . import db


class Purchases (db.Model):  # A Model representing purchases and reviews
    __tablename__ = "purchases"
    id = db.Column(db.Integer, primary_key=True)  # ID
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    procucts_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    count = db.Column(db.Integer)
    bought_at = db.Column(db.DateTime)
    comment = db.Column(db.String)
    stars = db.Column(db.Integer)
    title = db.Column(db.String)

    # def __init__(self, attendance_id=None, started_at=None, end_at=None):
    #     self.attendance_id = attendance_id
    #     self.started_at = started_at
    #     self.end_at = end_at

    # def __repr__(self):
    #     return f"<Break id:{self.id} attendance_id:{self.attendance_id} started_at:{self.started_at} end_at:{self.end_at}"
