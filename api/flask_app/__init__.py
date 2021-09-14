from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

from flask import Flask
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)


def import_views():
    """The function to avoid code shaping destroying import orders. Views has to be loaded finally due to circular import."""
    import flask_app.views


import_views()
