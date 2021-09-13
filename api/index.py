from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)


@app.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@app.route("/purchases")
def get_purchases():
    from purchases import Purchases
    query = db.session.query(Purchases).all()
    return jsonify(query)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
