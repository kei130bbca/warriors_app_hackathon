import flask_praetorian
import flask_cors
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from .models.users import User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:docker@db/test_db?charset=utf8"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)
guard = flask_praetorian.Praetorian()
guard.init_app(app, User)
cors = flask_cors.CORS()
cors.init_app(app)


def import_views():
    """The function to avoid code shaping destroying import orders. Views has to be loaded finally due to circular import."""
    import flask_app.views


import_views()
