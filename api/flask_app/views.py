from flask_app import app, db
from flask import jsonify, request
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


@app.route("/purchases/<int:id>", methods=['PUT'])
def put_purchase(id):
    purchase = db.session.query(Purchase).get(id)
    if purchase is None:
        return jsonify({'message': 'the purchase was not found'}), 404
    payload = request.json
    purchase.title = payload.get('title')
    purchase.comment = payload.get('comment')
    db.session.add(purchase)
    db.session.commit()
    return jsonify({}), 200


@app.route("/users/<int:id>", methods=['GET'])
def get_user(id):
    user = db.session.query(User.user_id, User.username, User.nickname,
                            User.twitter, User.youtube, User.icon, User.descriptioin).get(id)
    return jsonify(user)


@app.route("/products/<int:id>", methods=['GET'])
def get_product(id):
    product = db.session.query(Product).get(id)
    return jsonify(product)
