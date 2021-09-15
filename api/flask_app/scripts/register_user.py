from flask_script import Command
from flask_app.models.users import User

# You can run scripts through docker api container
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
                     icon="https://upload.wikimedia.org/wikipedia/commons/e/ec/%E9%84%AD%E5%B8%82%E9%95%B7%E6%AD%A1%E8%BF%8ERakuten_Monkeys%E6%A8%82%E5%A4%A9%E6%A1%83%E7%8C%BF%E9%9A%8A%E5%8A%A0%E5%85%A5%E4%B8%AD%E8%8F%AF%E8%81%B7%E6%A3%92%EF%BC%8C%E7%9B%BC%E6%8F%90%E5%8D%87%E6%95%B4%E9%AB%94%E8%A1%A8%E7%8F%BE%28%E4%B8%89%E6%9C%A8%E8%B0%B7%E6%B5%A9%E5%8F%B2%29%28cropped%29.jpg",
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
                    db.session.add(user)
            db.session.commit()
