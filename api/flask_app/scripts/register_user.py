from flask_script import Command


class TestUser():
    "test user to register"

    def __init__(self, username: str, password: str, roles: str = "viewer"):
        self.username = username
        self.password = password
        self.roles = roles

# You can run script through docker api container
# python manage.py [command_name]


class RegisterTestUser(Command):
    "register test user"

    def run(self):
        """Register test user data here. Because all password will be hashed when it is registered, we cannot add test user data to database directly."""
        from flask_app import app
        with app.app_context():
            # Add test users here!
            users = [TestUser('Yasoob', 'strongpassword', 'admin')]
            from flask_app.models.users import User
            for user in users:
                from flask_app import db, guard
                if db.session.query(User).filter_by(username=user.username).count() < 1:
                    db.session.add(User(
                        username=user.username,
                        password=guard.hash_password(user.password),
                        roles=user.roles
                    ))
            db.session.commit()
