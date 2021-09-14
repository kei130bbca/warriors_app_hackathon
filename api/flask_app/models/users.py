from flask_sqlalchemy import SQLAlchemy
from . import db


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(127))
    nickname = db.Column(db.String(127))
    twitter_screenname = db.Column(db.String(127))
    youtube_url = db.Column(db.String(511))
    password = db.Column(db.String(127))
    icon = db.Column(db.String(127))
    description = db.Column(db.String(511))
