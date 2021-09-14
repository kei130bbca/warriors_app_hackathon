from flask_app import app, db
from flask import jsonify
from .models.purchases import Purchases
from .models.users import Users
from .models.products import Products


@app.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@app.route("/purchases")
def get_purchases():
    query = db.session.query(Purchases).all()
    return jsonify(query)


@app.route("/users/<int:id>", methods=['GET'])
def get_user(id):
    user = db.session.query(Users.user_id, Users.username, Users.nickname,
                            Users.twitter, Users.youtube, Users.icon, Users.descriptioin).get(id)
    return jsonify(user)


@app.route("/products/<int:id>", methods=['GET'])
def get_product(id):
    product = db.session.query(Products).get(id)
    return jsonify(product)