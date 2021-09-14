from flask import flash, jsonify
from models.users import User
from models.purchases import Purchase
from sqlalchemy import func
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
<<<<<<< HEAD
=======


@app.route('/get_user/<int: index>')
def get_user(index):
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
>>>>>>> fd3b9453d1bc49e8d13a97f96dcee521a4d94455
