from flask import Flask
from flask_migrate import Migrate
from config.database import db
from config.config import SQLALCHEMY_DATABASE_URI
from models import Category, Idea, User
from routes import *


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)

migrate = Migrate(app, db)

@app.route('/')
def hello():
    return 'Hello Flask!'


if __name__ == '__main__':
    app.run (debug=True)