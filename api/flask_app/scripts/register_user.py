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
                User(username='clutch@eagles.com',
                     nickname='Clutch',
                     twitter_screenname='rakuten__eagles',
                     youtube_url='https://www.youtube.com/user/EAGLESTATION2012',
                     password='clutchclutch',
                     icon='https://www.rakuteneagles.jp/cmn/images/expansion/character/clutch01_list.png',
                     description='I am Clutch from Japan. I like eating and drawing. My favorite food is Onigiri.'),
                User(username='clutchena@eagles.com',
                     nickname='Clutchena',
                     twitter_screenname='rakuten__eagles',
                     youtube_url='https://www.youtube.com/user/EAGLESTATION2012',
                     password='clutchenaclutchena',
                     icon='https://www.rakuteneagles.jp/cmn/images/expansion/character/clutchena01_list.png',
                     description='I am Clutchena born in Japan. My hobbies are drawing and making accessories. I like srawberry and cute stuff.'),
                User(username='switch@eagles.com',
                     nickname='Switch',
                     twitter_screenname='rakuten__eagles',
                     youtube_url='https://www.youtube.com/user/EAGLESTATION2012',
                     password='switchswitch',
                     icon='https://www.rakuteneagles.jp/cmn/images/expansion/character/switch01_list.png',
                     description='This is Switch from US. I love DJ and dancing.')
            ]
            for user in users:
                from flask_app import db
                if db.session.query(User).filter_by(username=user.username).count() < 1:
                    user.password = guard.hash_password(user.password)
                    db.session.add(user)
            db.session.commit()
