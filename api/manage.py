from flask_script import Manager
from flask_app import app
from flask_app.scripts.register_user import RegisterTestUser


def register_commands():
    manager = Manager(app)
    manager.add_command('regist_user', RegisterTestUser())
    manager.run()


if __name__ == "__main__":
    register_commands()
