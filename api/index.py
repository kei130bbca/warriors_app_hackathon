from flask import Flask

app = Flask(__name__)
db = None  # TODO: replace None to SQLAlchemy() object


@app.route("/")
def index():
    return "<h1>Hello, Flask!</h1>"


@app.route("/purchases")
def get_purchases():
    return ""


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
