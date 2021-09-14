from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@app.route("/users/<int:id>", methods=['GET'])
def get_user(id):
    from users import Users
    user = db.session.query(Users.user_id, Users.username, Users.nickname, Users.twitter, Users.youtube, Users.icon, Users.descriptioin).get(id)
    return jsonify(user)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
