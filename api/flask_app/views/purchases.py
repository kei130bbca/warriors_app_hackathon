from flask_app.models.purchases import Purchase
from flask import jsonify, request
from flask_app import db
from flask import jsonify
from flask import Blueprint
purchases = Blueprint("purchases", __name__)


@purchases.route("/purchases")
def get_purchases():
    args = request.args
    user_id = args.get("user_id")
    product_id = args.get("product_id")
    index = args.get("index")
    query = db.session.query(Purchase)
    if user_id is not None:
        query = query.filter(Purchase.user_id == user_id)
    if product_id is not None:
        query = query.filter(Purchase.products_id == product_id)
    if index is not None:
        query = query.offset(index)
    query = query.all()
    ans = []
    for purchase in query:
        ans.append({"purchase_id": purchase.id,
                    "users_id": purchase.user_id,
                    "products_id": purchase.products_id,
                    "count": purchase.count,
                    "bought_at": purchase.bought_at,
                    "comment": purchase.comment,
                    "stars": purchase.stars,
                    "title": purchase.title,
                    })
    return jsonify(ans)


@purchases.route("/purchases/<int:id>", methods=['PUT'])
def put_purchase(id: int):
    purchase = db.session.query(Purchase).get(id)
    if purchase is None:
        return jsonify({'message': 'the purchase was not found'}), 404
    payload = request.json
    purchase.title = payload.get('title')
    purchase.comment = payload.get('comment')
    db.session.add(purchase)
    db.session.commit()
    return jsonify({}), 200
