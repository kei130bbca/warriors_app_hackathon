import base64
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


@app.route("/users/<int:id>", methods=['PUT'])
def put_user(id):
    user = db.session.query(User).get(id)
    if user is None:
        return jsonify({'message': 'the user was not found'}), 404
    payload = request.json
    user.nickname = payload.get('nickname')
    user.youtube_url = payload.get('youtube')
    user.twitter_screenname = payload.get('twitter_screenname')
    user.description = payload.get('desc')
    # save user icon
    icon = payload.get('img')
    if icon is not None:
        src = convert_and_save(icon)
        user.icon = src
    db.session.add(user)
    db.session.commit()
    return jsonify({}), 200


@app.route("/products/<int:id>", methods=['GET'])
def get_product(id):
    product = db.session.query(Product).get(id)
    return jsonify(product)


def convert_and_save(b64_string):
    FILE_NAME = "imageToSave.png"
    with open(FILE_NAME, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
    return FILE_NAME
