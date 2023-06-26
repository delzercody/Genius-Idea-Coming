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

class Prompts( Resource ):
    def get(self):
        prompts = [ p.to_dict() for p in Prompt.query.all() ]
        response = make_response( prompts, 200 )
        return response

    def post( self ):
        rq = request.get_json()
        try:
            new_prompt = Prompt(
                category_id = rq['category_id'] ,
                title = rq['title'] , 
                description = rq['description'] , 
                user_id = rq['user_id']
            )
            db.session.add(new_prompt)
            db.session.commit()
            new_prompt_dict = new_prompt.to_dict()
            response = make_response( new_prompt_dict, 201 )
            return response
        except:
            response = make_response( { "error": ["validation errors"]}, 400)
            return response 
api.add_resource( Prompts, '/prompts')

class PromptByID( Resource ):
    def get( self, id ):
        try:
            prompt = Prompt.find(id).to_dict( only = ( 'id', 'title', 'description', ))
            response = make_response( prompt, 200 )
            return response
        except:
            response = make_response( {"error": "prompt not found"}, 404 )
            return response
    
    def patch( self, id ):
        prompt = Prompt.find(id)
        if not prompt:
            response = make_response( {"error": "prompt not found"}, 404 )
            return response
        try:
            for attr in request.get_json():
                setattr( prompt, attr, request.get_json()[attr] )
            db.session.add(prompt)
            db.session.commit()

            prompt_dict = prompt.to_dict( only = ( 'id', 'title', 'description', ) )
            response = make_response( prompt_dict, 200 )
            return response
        
        except:
            response = make_response( {"errors": ["validation errors"]}, 400)
            return response
        
    def delete( self, id ):
        prompt = Prompt.find(id)
        try:
            db.session.delete( prompt )
            db.session.commit()
            response = make_response( ' ', 204 )
            return response
        except:
            response = make_response( {"error": "prompt not found"}, 404 )
            return response
api.add_resource( PromptByID, '/prompts/<int:id>' )

class UserIdeas( Resource ):
    def get(self):
        user_ideas = [ ui.to_dict() for ui in User_Idea.query.all() ]
        response = make_response( user_ideas, 200 )
        return response

    def post( self ):
        rq = request.get_json()
        try:
            new_user_idea = User_Idea(
                notes = rq['notes'] , 
                prompt_id = rq['prompt_id'] , 
                user_id = rq['user_id']
            )
            db.session.add(new_user_idea)
            db.session.commit()
            new_user_idea_dict = new_user_idea.to_dict()
            response = make_response( new_user_idea_dict, 201 )
            return response
        except:
            response = make_response( { "error": ["validation errors"]}, 400)
            return response 
api.add_resource( UserIdeas, '/user-ideas')

class UserIdeasByID( Resource ):
    def get( self, id ):
        try:
            user_idea = User_Idea.find(id).to_dict( only = ( 'id', 'title', 'description', ))
            response = make_response( user_idea, 200 )
            return response
        except:
            response = make_response( {"error": "prompt not found"}, 404 )
            return response
    
    def patch( self, id ):
        user_idea = User_Idea.find(id)
        if not user_idea:
            response = make_response( {"error": "prompt not found"}, 404 )
            return response
        try:
            for attr in request.get_json():
                setattr( user_idea, attr, request.get_json()[attr] )
            db.session.add(user_idea)
            db.session.commit()

            prompt_dict = user_idea.to_dict( only = ( 'id', 'title', 'description', ) )
            response = make_response( prompt_dict, 200 )
            return response
        
        except:
            response = make_response( {"errors": ["validation errors"]}, 400)
            return response
        
    def delete( self, id ):
        user_idea = User_Idea.find(id)
        try:
            db.session.delete( user_idea )
            db.session.commit()
            response = make_response( ' ', 204 )
            return response
        except:
            response = make_response( {"error": "prompt not found"}, 404 )
            return response
api.add_resource( UserIdeasByID, '/user-ideas/<int:id>' )

if __name__ == '__main__':
    app.run (debug=True)