import logging
import sys
from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from config.database import db
from config.config import SQLALCHEMY_DATABASE_URI
from models import Category, Prompt, User, User_Idea
from routes import *
import openai
from generated.secret import API_KEY
from werkzeug.exceptions import NotFound, UnprocessableEntity, Unauthorized



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)
CORS(app)


api = Api(app)
migrate = Migrate(app, db)

CORS(app)

openai.api_key = API_KEY

logging.basicConfig(
    level=logging.ERROR,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)  # Output logs to the console
        # logging.FileHandler('error.log')  # Output logs to a file
    ]
)

@app.route('/')
def hello():
    return 'Hello Flask!'

############# Login/Signup ################
@app.route('/logout', methods=["GET"])
def logout():
    session['user_id'] = None 
    return make_response('' , 204)

@app.route('/authorized-session', methods=["GET"])
def authorize():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(), 200)
    except: 
        raise Unauthorized("invalid credentials")

class Signup( Resource ):
    def post(self):
        rq = request.get_json()
        new_user = User(
            username = rq.get('username'),
            first_name = rq.get('first_name'),
            last_name = rq.get('last_name'), 
            email = rq.get('email'),
            location = rq.get('location'),
            bio = rq.get('bio'), 
            avatar = rq.get('avatar'), 
            )
        new_user.password_hash = rq.get('password')
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return make_response(new_user.to_dict(rules = ('-_password_hash', )), 201)
    
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        try:
            rq = request.get_json()
            user = User.query.filter_by(username = rq.get('username')).first()
            if user.authenticate(rq.get('password')):
                session['user_id'] = user.id 
                return make_response(user.to_dict(), 200)
        except:
            abort(401, "Unauthorized")

api.add_resource(Login, '/login')            

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

def generate_idea(input_word):
    try:
        prompt = f"Generate a genius idea using the word '{input_word}'."
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=prompt,
            max_tokens=50,
            n=1,
            stop=None,
            temperature=0.7
        )
        idea = response.choices[0].text.strip()
        return idea
    except Exception as e:
        # Log the exception
        logging.error('An error occurred while generating the idea: %s', str(e))
        raise

# Define the API route for generating ideas
@app.route('/api/generate-idea', methods=['POST'])
def generate_idea_route():
    try:
        input_word = request.json.get('inputWord')
        if not input_word:
            return jsonify({'error': 'Input word is missing'}), 400

        # Generate the idea using the input word
        generated_idea = generate_idea(input_word)

        return jsonify({'generatedIdea': generated_idea}), 200

    except Exception as e:
        # Log the exception
        logging.error('An error occurred while processing the request: %s', str(e))

        # Handle the error and return an appropriate response to the client
        # ...

# Add resource routes and other necessary code

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, use_reloader=False)
