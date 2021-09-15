import os
import base64
from flask import flash, jsonify
from sqlalchemy import func
from flask_app import app, db, guard
from flask import jsonify, request
from flask import Blueprint
from flask_app.models.users import User
users = Blueprint("users", __name__)


@app.route('/users', methods=['GET'])
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
    index = request.args.get("index")
    index = int(index)
    count = db.session.query(func.count(User.id)).scalar()
    query = db.session.query(User)
    if count < index:
        flash('not enough data')
    else:
        query = query.limit(10).offset(index)
        ans = []
        for user in query:
            ans.append({"user_id": user.id,
                        "username": user.username,
                        "nickname": user.nickname,
                        "twitter_screenname": user.twitter_screenname,
                        "youtube_url": user.youtube_url,
                        "password": user.password,
                        "icon": user.icon,
                        "description": user.description
                        })
        return jsonify(ans)


@users.route("/users/<int:id>", methods=['GET'])
def get_user(id: int):
    query = db.session.query(User).get(id)
    user = {
        "id": query.id,
        "username": query.username,
        "nickname": query.nickname,
        "twitter_screenname": query.twitter_screenname,
        "youtube_url": query.youtube_url,
        "icon": query.icon,
        "description": query.description
    }
    return jsonify(user)


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
        src = convert_and_save(icon, user.username)
        user.icon = src
    db.session.add(user)
    db.session.commit()
    return jsonify({}), 200


def convert_and_save(b64_string: str, filename="imageToSave"):
    filename = filename+".png"
    path = os.path.join(app.root_path, 'static', filename)
    with open(path, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))
    return filename


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
