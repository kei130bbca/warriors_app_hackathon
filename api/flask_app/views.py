from flask_app import app, db
from flask import jsonify
from .models.purchases import Purchases


@app.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@app.route("/purchases")
def get_purchases():
    query = db.session.query(Purchases).all()
    return jsonify(query)
