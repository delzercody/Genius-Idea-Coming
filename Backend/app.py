from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from config.database import db
from config.config import SQLALCHEMY_DATABASE_URI
from models import Category, Prompt, User, User_Idea
from routes import *


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)

api = Api(app)
migrate = Migrate(app, db)

@app.route('/')
def hello():
    return 'Hello Flask!'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(users, 200)
        return response
    
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run (debug=True)