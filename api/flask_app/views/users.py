import base64
from flask import flash, jsonify
from sqlalchemy import func
from flask_app import app, db, guard
from flask import jsonify, request
from flask import Blueprint
from flask_app.models.users import User
users = Blueprint("users", __name__)


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


@users.route("/users/<int:id>", methods=['GET'])
def get_user(id: int):
    user = db.session.query(User.user_id, User.username, User.nickname,
                            User.twitter, User.youtube, User.icon, User.descriptioin).get(id)
    return jsonify(user), 200


@users.route("/users/<int:id>", methods=['PUT'])
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


def convert_and_save(b64_string: str):
    FILE_NAME = "imageToSave.png"
    with open(FILE_NAME, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
    return FILE_NAME


@users.route("/users", methods=['POST'])
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
