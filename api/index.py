from api.models.purchases import Purchases
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()
db.init_app(app)


@app.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@app.route("/purchases")
def get_purchases():
    query = db.session.query(Purchases).all()
    return jsonify(query)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
