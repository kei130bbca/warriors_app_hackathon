from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask import Flask

from flask import Flask
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)

# Write import flask_app.views at the last line!!!
import flask_app.views