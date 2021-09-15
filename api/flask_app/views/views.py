import requests
from flask import jsonify
import base64
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
    # product = db.session.query(Product).get(id)
    product = get_product_rakuten(id)
    return jsonify(product), 200


def convert_and_save(b64_string: str):
    FILE_NAME = "imageToSave.png"
    with open(FILE_NAME, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
    return FILE_NAME


@views.route('/api/protected')
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
