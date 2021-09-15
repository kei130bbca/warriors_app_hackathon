# Collaborating Flask with Database

To applying model files to database, you need to use [flask-migrate](https://flask-migrate.readthedocs.io/en/latest/).

## Initialize Database

Skip this phaze if you have "migrations" folder.
If you have't initialized database yet, you have to initialize at first.
Launch containers using docker-compose up, Enter the api container, and type "flask db init".

## Migration

When models file updated, you need to apply changes to database.
Enter the api container, type 'flask db migrate -m "YOUR COMMENT HERE"'
The migration files will be created.
However, these migrations haven't applied yet.
Do not forget to proceed update.

## Update

When you have non applied migration files, you need to update database with them.
Type "flask db upgrade".

# Don't use flask run

Flask run doesn't load app.run arguments in app.py
Use python app.py to launch application

# Adding test user data

If you want to add test user data, you cannot add them directory to database.
Because user table has password column which should contain hashed password.
To hash password, you have to use flask_praetorian.Praetorian.hash_password() function.

Open register_user.py to add test data.
There is "users" array. You can add some data into it.
Then run "python manage.py regist_user" command in the docker API container.
You can see the data registerd in database, through phpmyadmin.
