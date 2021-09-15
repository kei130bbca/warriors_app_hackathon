from flask_script import Command
from flask_app.models.users import User
from flask_app import guard

# You can run scripts in docker api container
# python manage.py [command_name]
# commands are listed in manage.py


class RegisterTestUser(Command):
    "register test user"

    def run(self):
        """Register test user data here. Because all password will be hashed when it is registered, we cannot add test user data to database directly."""
        from flask_app import app
        with app.app_context():
            # Add test users here!
            users = [
                User(username='Yasoob',
                     nickname='Yasoob',
                     password='strongpassword',
                     twitter_screenname="Yasoob",
                     youtube_url="Yasoob_youtube_link",
                     icon="https://th.bing.com/th/id/OIP.7J4ZZXCg0CXWkowqduuvQgHaHa?pid=ImgDet&rs=1",
                     description="This is test user",
                     roles='admin'),
                User(username='hikakin@hikakin.com',
                     nickname='Hikakin',
                     twitter_screenname='Hikakin',
                     youtube_url='https://www.youtube.com/user/HikakinTV',
                     password='hikakinhikakin',
                     icon='https://th.bing.com/th/id/OIP.7J4ZZXCg0CXWkowqduuvQgHaHa?pid=ImgDet&rs=1',
                     description='This is Hikakin.')
            ]
            for user in users:
                from flask_app import db
                if db.session.query(User).filter_by(username=user.username).count() < 1:
                    user.password = guard.hash_password(user.password)
                    db.session.add(user)
            db.session.commit()
