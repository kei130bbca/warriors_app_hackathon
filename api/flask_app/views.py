from flask_app import app, db
from flask import jsonify
from .models.purchases import Purchase
from .models.users import User
from .models.products import Product


@app.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@app.route("/purchases")
def get_purchases():
    query = db.session.query(Purchase).all()
    return jsonify(query)


@app.route("/users/<int:id>", methods=['GET'])
def get_user(id):
    user = db.session.query(User.user_id, User.username, User.nickname,
                            User.twitter, User.youtube, User.icon, User.descriptioin).get(id)
    return jsonify(user)


@app.route("/products/<int:id>", methods=['GET'])
def get_product(id):
    product = db.session.query(Product).get(id)
    return jsonify(product)
