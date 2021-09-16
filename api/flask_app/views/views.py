import random
import time
import urllib.parse
from flask_app.models.products import Product
from flask_app import db
from flask_app.models.users import User
import requests
from flask import jsonify
from flask_app import guard, RAKUTEN_APP_ID
from flask import jsonify, request
import flask_praetorian
from flask import Blueprint
views = Blueprint("views", __name__)


@views.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@views.route("/products/<string:id>", methods=['GET'])
def get_product(id: str):
    try:
        product = db.session.query(Product).get(id)
        # If the product not found on database, create new product with speficied id
        if product is None:
            product = Product(id, None, None, None, None)
        # If the product name is None, call Rakuten API to get latest infromation
        # print(product.id, product.name)
        if product.name is None:
            product = get_product_rakuten(product)
        product = {
            'id': product.id,
            'name': product.name,
            'img': product.img,
            'price': product.price,
            'url': product.url
        }
    except Exception as e:
        print(e)
        return jsonify({"message": "specified product code not found"}), 404
    return jsonify(product)


@views.route('/auth_user')
@flask_praetorian.auth_required
def protected():
    """
    A protected endpoint provides authenticated user. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:8000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    user: User = flask_praetorian.current_user()
    urlparse = urllib.parse.urlparse(user.icon)
    if len(urlparse.scheme) > 0:
        icon = user.icon
    else:
        icon = request.url_root+"static/"+user.icon
    user_obj = {
        "id": user.id,
        "username": user.username,
        "nickname": user.nickname,
        "twitter_screenname": user.twitter_screenname,
        "youtube_url": user.youtube_url,
        "password": user.password,
        "icon": icon,
        "desc": user.description,
    }
    return jsonify(user_obj)


@views.route("/login", methods=['POST'])
def login():
    payload = request.json
    username = payload.get('username')
    password = payload.get('password')
    user = guard.authenticate(username, password)
    token = {'access_token': guard.encode_jwt_token(user)}
    return jsonify(token), 200


@views.route('/refresh', methods=['POST'])
def refresh():
    print('refresh request')
    token_str = request.headers.get("Authorization")
    token = token_str.split("Bearer ")[1]
    new_token = guard.refresh_jwt_token(token)
    ret = {'access_token': new_token}
    return jsonify(ret), 200


def get_product_rakuten(product: Product):
    query = {
        "applicationId": RAKUTEN_APP_ID,
        "itemCode": product.id
    }
    # retry for 10 times
    for _ in range(10):
        response = requests.get(
            f"https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706", params=query)
        if response.status_code != 200:
            time.sleep(1+random.random())
            continue
        break
    item = response.json()['Items'][0]['Item']

    # Update product object
    product.id = item['itemCode']
    product.name = item['itemName']
    product.img = item['smallImageUrls'][0]['imageUrl']
    product.price = item['itemPrice']
    product.url = item['itemUrl']

    # Save product as cashe into database
    db.session.add(product)
    db.session.commit()
    return product
