import json
import requests
from flask import flash, jsonify
from sqlalchemy import func
import base64
from flask_app import app, db, guard, RAKUTEN_APP_ID
from flask import jsonify, request
from .models.purchases import Purchase
from .models.users import User
from .models.products import Product
import flask_praetorian


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
    return jsonify(user), 200


@app.route("/users/<int:id>", methods=['PUT'])
def put_user(id):
    user = db.session.query(User).get(id)
    if user is None:
        return jsonify({'message': 'the user was not found'}), 404
    payload = request.json
    user.nickname = payload.get('nickname')
    user.youtube_url = payload.get('youtube')
    user.twitter_screenname = payload.get('twitter')
    user.description = payload.get('desc')
    # save user icon
    icon = payload.get('img')
    if icon is not None:
        src = convert_and_save(icon)
        user.icon = src
    db.session.add(user)
    db.session.commit()
    return jsonify({}), 200


@app.route("/users", methods=['POST'])
def post_user():
    user = User()
    payload = request.json
    user.username = payload.get('username')
    user.nickname = payload.get('nickname')
    user.password = guard.hash_password(payload.get('password'))
    user.youtube_url = payload.get('youtube')
    user.twitter_screenname = payload.get('twitter')
    user.description = payload.get('desc')
    user.roles = "viewer"
    # save user icon
    icon = payload.get('img')
    if icon is not None:
        src = convert_and_save(icon)
        user.icon = src
    db.session.add(user)
    db.session.commit()
    return jsonify({}), 201


@app.route("/products/<str:id>", methods=['GET'])
def get_product(id: str):
    # product = db.session.query(Product).get(id)
    product = get_product_rakuten(id)
    return jsonify(product), 200


@app.route('/users')
def get_users():
    '''
    where does the parameter index from  --> calculated by the front page
    logic:display by id?
    for example: index = 0, display users from id = 0 to id = 9?
    1.if not exists user where id = index
        flash('no enough data')
    2.query from users where id in range(index, index+10)
    3.return attribute array
    :param index:
    :return:
    '''
    '''
    query the sum of users, if it is smaller than index, invalid operation
    '''
    args = request.args
    index = args.get("index")
    count = db.session.query(func.count(User.id)).scalar()
    if count < index:
        flash('not enough data')
    else:
        try:
            sub_query = db.session.query(
                User, func.row_number()).label("row_number")
            sub_query = sub_query.subquery()
            user_array = db.session.query(sub_query).filter(
                sub_query.c.row_number >= index & sub_query.c.row_number < index + 10)
        except Exception as e:
            print(e)
            flash('query failed!')
            db.session.rollback()
    return jsonify(user_array)


def convert_and_save(b64_string):
    FILE_NAME = "imageToSave.png"
    with open(FILE_NAME, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
    return FILE_NAME


@app.route('/api/protected')
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint provides authenticated user. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:8000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    return jsonify({"username": flask_praetorian.current_user().username})


@app.route("/login", methods=['POST'])
def login():
    payload = request.json
    username = payload.get('username')
    password = payload.get('password')
    user = guard.authenticate(username, password)
    token = {'access_token': guard.encode_jwt_token(user)}
    return jsonify(token), 200


@app.route('/refresh', methods=['POST'])
def refresh():
    print('refresh request')
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return jsonify(ret), 200


def get_product_rakuten(product_id: str = "sorara:10001376"):
    query = {
        "applicationId": RAKUTEN_APP_ID,
        "itemCode": product_id
    }
    response = requests.get(
        f"https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706", params=query)
    item = response.json().Items[0].Item
    print(item)
    product = {"id": item.itemCode, "name": item.itemName,
               "img": item.smallImageUrls[0].imageUrl, "price": item.itemPrice, "url": item.itemUrl}
    return product
