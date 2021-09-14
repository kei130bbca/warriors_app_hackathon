from flask_sqlalchemy import SQLAlchemy
from flask_app import db
from .purchases import Purchase


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(127))
    nickname = db.Column(db.String(127))
    twitter_screenname = db.Column(db.String(127))
    youtube_url = db.Column(db.String(511))
    password = db.Column(db.String(255))
    icon = db.Column(db.String(127))
    description = db.Column(db.String(511))
    roles = db.Column(db.Text)
    purchses = db.relationship('Purchase')
    # TODO add __repr__ and __init__

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    # def __init__(self, id, username, nickname, password, twitter_screenname=None, youtube_url=None, icon=None, description=None):
    #     self.id = id
    #     self.username = username
    #     self.nickname = nickname
    #     self.password = password
    #     self.twitter_screenname = twitter_screenname
    #     self.youtube_url = youtube_url
    #     self.icon = icon
    #     self.description = description

    def __repr__(self):
        return f"<User(id=%s)>" % self.id
