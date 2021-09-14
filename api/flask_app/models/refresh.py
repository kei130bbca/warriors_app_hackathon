import flask
import flask_praetorian

guard = flask_praetorian.Praetorian()
app = flask.Flask(__name__)
app.debug = True
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}


@app.route('/refresh', methods=['POST'])
def refresh():
    print('refresh request')
    old_token = flask.request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200