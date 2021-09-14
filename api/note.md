# Collaborating Flask with Database

To applying model files to database, you need to use [flask-migrate](https://flask-migrate.readthedocs.io/en/latest/).

## Initialize Database

If you have't initialized database yet, you have to initialize at first.
Launch containers using docker-compose up, Enter the api container, and type "flask db init".

## Migration

When models file updated, you need to apply changes to database.
Enter the api container, type 'flask db migrate -m "YOUR COMMENT HERE"'
