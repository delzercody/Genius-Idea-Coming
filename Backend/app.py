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
        # Retrieve all users from the database and convert them to dictionaries
        users = [user.to_dict() for user in User.query.all()]
        response = make_response(users, 200)
        return response

    def post(self):
        # Extract the user data from the request and create a new User object
        rq = request.get_json()
        try:
            new_user = User(
                username=rq['username'],
                password=rq['password'],
                email=rq['email'],
                bio=rq['bio'],
                location=rq['location'],
                first_name=rq['first_name'],
                last_name=rq['last_name']
            )
            # Add the new user to the session and commit the changes to the database
            db.session.add(new_user)
            db.session.commit()
            # Convert the new user to a dictionary and return it as a response
            new_user_dict = new_user.to_dict()
            response = make_response(new_user_dict, 201)
            return response
        except:
            response = make_response({"error": "validation errors"}, 400)
            return response

class UserByID(Resource):
    def get(self, user_id):
        # Retrieve a specific user from the database based on the provided user_id
        user = User.query.get(user_id)
        if user is not None:
            # Convert the user object to a dictionary and return it as a response
            user_dict = user.to_dict()
            response = make_response(user_dict, 200)
            return response
        else:
            response = make_response({"error": "User not found"}, 404)
            return response

    def patch(self, user_id):
        # Retrieve the specific user to be updated based on the provided user_id
        user = User.query.get(user_id)
        if not user:
            response = make_response({"error": "User not found"}, 404)
            return response
        try:
            # Extract the updated user data from the request and update the user object
            rq = request.get_json()
            for attr in rq:
                setattr(user, attr, rq[attr])
            # Add the updated user to the session and commit the changes to the database
            db.session.add(user)
            db.session.commit()
            # Convert the updated user to a dictionary and return it as a response
            user_dict = user.to_dict()
            response = make_response(user_dict, 200)
            return response
        except:
            response = make_response({"error": "validation errors"}, 400)
            return response

    def delete(self, user_id):
        # Retrieve the specific user to be deleted based on the provided user_id
        user = User.query.get(user_id)
        try:
            # Delete the user from the session and commit the changes to the database
            db.session.delete(user)
            db.session.commit()
            response = make_response('User deleted successfully', 204)
            return response
        except:
            response = make_response({"error": "User not found"}, 404)
            return response

class Categories(Resource):
    def get(self):
        # Retrieve all categories from the database and convert them to dictionaries
        categories = [category.to_dict(only = ('name', 'description')) for category in Category.query.all()]
        response = make_response(categories, 200)
        return response

    def post(self):
        # Extract the category data from the request and create a new Category object
        rq = request.get_json()
        try:
            new_category = Category(
                name=rq['name'],
                description=rq['description']
            )
            # Add the new category to the session and commit the changes to the database
            db.session.add(new_category)
            db.session.commit()
            # Convert the new category to a dictionary and return it as a response
            new_category_dict = new_category.to_dict()
            response = make_response(new_category_dict, 201)
            return response
        except:
            response = make_response({"error": "validation errors"}, 400)
            return response

class CategoryByID(Resource):
    def get(self, category_id):
        # Retrieve a specific category from the database based on the provided category_id
        category = Category.query.get(category_id)
        if category is not None:
            # Convert the category object to a dictionary and return it as a response
            category_dict = category.to_dict()
            response = make_response(category_dict, 200)
            return response
        else:
            response = make_response({"error": "Category not found"}, 404)
            return response

    def patch(self, category_id):
        # Retrieve the specific category to be updated based on the provided category_id
        category = Category.query.get(category_id)
        if not category:
            response = make_response({"error": "Category not found"}, 404)
            return response
        try:
            # Extract the updated category data from the request and update the category object
            rq = request.get_json()
            for attr in rq:
                setattr(category, attr, rq[attr])
            # Add the updated category to the session and commit the changes to the database
            db.session.add(category)
            db.session.commit()
            # Convert the updated category to a dictionary and return it as a response
            category_dict = category.to_dict()
            response = make_response(category_dict, 200)
            return response
        except:
            response = make_response({"error": "validation errors"}, 400)
            return response

    def delete(self, category_id):
        # Retrieve the specific category to be deleted based on the provided category_id
        category = Category.query.get(category_id)
        try:
            # Delete the category from the session and commit the changes to the database
            db.session.delete(category)
            db.session.commit()
            response = make_response('Category deleted successfully', 204)
            return response
        except:
            response = make_response({"error": "Category not found"}, 404)
            return response

# Registering the resource classes with their respective routes
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:user_id>')
api.add_resource(Categories, '/categories')
api.add_resource(CategoryByID, '/categories/<int:category_id>')

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
    app.debug = True
    app.run (debug=True)