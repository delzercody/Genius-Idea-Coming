from config.database import db
from config.config import bcrypt
from datetime import datetime
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

import re

# Category model represents the categories table in the database

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    @classmethod
    def find(cls, id):
        category = Category.query.filter(Category.id == id).first()
        return category

    # Primary key column
    id = db.Column(db.Integer, primary_key=True)
    # Name of the category
    name = db.Column(db.String(50), unique=True, nullable=False)
    # Description of the category
    description = db.Column(db.String(255), nullable=False)

    # Relationship with Idea model (one-to-many)
    prompts = db.relationship('Prompt', back_populates='category', cascade = 'all, delete-orphan')
    users = association_proxy( 'prompts', 'user' )

    serialize_rules = ('-prompts.category', '-prompts.user')  # Exclude 'prompts' and 'user' relationships from serialization

############ validations for Category ##############
    # Name must be a string in between 1 - 50 characters
    @validates( 'name' )
    def validate_name( self, key, name ):
        if type(name) is str and len(name) in range(1, 51):
            return name
        else: 
            raise ValueError( "Category name must be a string between 1 - 50 characters.")
    # Description cannot exceed 255 characters
    @validates( 'description' )
    def validate_description( self, key, description ):
        if type(description) is str and len(description) < 255 :
            return description
        else: 
            raise ValueError( "Description cannot exceed 255 characters.")

    def __repr__(self):
        return f"<Category {self.name}>"

# User model represents the users table in the database
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    @classmethod
    def find(cls, id):
        user = User.query.filter(User.id == id).first()
        return user

    # Primary key column
    id = db.Column(db.Integer, primary_key=True)
    # Username of the user (unique)
    username = db.Column(db.String(15), unique=True, nullable=False)
    # Password of the user
    _password_hash = db.Column(db.String(15), nullable=False)
    # Email of the user (unique)
    email = db.Column(db.String(255), unique=True, nullable=False)
    # Created at timestamp
    created_at = db.Column(db.DateTime, default=datetime.utcnow, server_default=db.func.now())
    # Updated at timestamp
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=db.func.now())
    # User's bio
    bio = db.Column(db.String)
    # User's location
    location = db.Column(db.String(100))
    # User's first name
    first_name = db.Column(db.String(100)) 
    # User's last name
    last_name = db.Column(db.String(100)) 
    # User's avatar 
    avatar = db.Column(db.String, default = "https://wallpapers.com/images/hd/blank-default-pfp-wue0zko1dfxs9z2c.jpg" )

    # Relationship with Idea model (one-to-many)
    prompts = db.relationship('Prompt', back_populates='user', cascade = 'all, delete-orphan')
    # Relationship with User_Idea model (one-to-many)
    user_ideas = db.relationship('User_Idea', back_populates='user', cascade = 'all, delete-orphan')
    
    categories = association_proxy( 'prompts', 'categories' )
    # prompts = association_proxy( 'user_ideas', 'prompt' )

    serialize_rules = (
        '-prompts.user',
        '-user_ideas.user',
        '-password',
        '-created_at'
        )  
    # Exclude 'ideas' and 'user_ideas' relationships from serialization
    #also exclude password and created_at from displaying

############ validations for User ##############
    # Username is a unique string between 5-15 characters w/ no special characters
    @validates('username')
    def validate_username(self, key, username):
        un = User.query.filter(User.username.like(f'%{username}%')).first()
        if type(username) is str and username and un == None and len(username) in range(5, 16) and re.match(r'^[A-Za-z0-9_]+$', username):
            return username
        else: 
            raise ValueError('Username must be unique string between 5 - 15 characters and not contain any special characters.')
    # Email is a unique and valid email
    @validates('email')
    def validate_email(self, key, email):
        em = User.query.filter(User.email.like(f'%{email}%')).first()
        if type(email) is str and email and em is None and "@" in email and ".com" in email:
            return email
        else: 
            raise ValueError( 'Must be a valid email or email has already been registered.')
    # First and last name should be a string with a max of 50 characters
    @validates( 'first_name' )
    def validate_first_name( self, key, first_name ):
        if type(first_name) is str and len(first_name) in range(1, 51):
            return first_name
        else: 
            raise ValueError( "First and last name must be a string between 1 - 50 characters.")
    @validates( 'last_name' )
    def validate_last_name( self, key, last_name ):
        if type(last_name) is str and len(last_name) in range(1, 51):
            return last_name
        else: 
            raise ValueError( "First and last name must be a string between 1 - 50 characters.")
    # Bio has a 200 character limit
    @validates( 'bio' )
    def validate_bio( self, key, bio ):
        if type(bio) is str and len(bio) < 200 :
            return bio
        else: 
            raise ValueError( "Bio cannot exceed 200 characters.")
    # Location has a 100 character limit
    @validates( 'location' )
    def validate_location( self, key, location ):
        if type(location) is str and len(location) < 100 :
            return location
        else: 
            raise ValueError( "Location cannot exceed 100 characters.")
    # Avatar is a .jpg or .png // maybe gif?
    @validates( 'avatar' )
    def validates_avatar( self, key, avatar ):
        file_format = [ 'jpeg', 'png', 'jpg', 'gif' ]
        if isinstance(avatar, str) and any(format_str in avatar for format_str in file_format):
            return avatar
        else: 
            raise ValueError("Only JPEG/PNG/GIF images are permitted.")


########### Password hashing #################
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password )

    def __repr__(self):
        return f"<User {self.username}>"

# Prompt model represents the prompts table in the database
class Prompt(db.Model, SerializerMixin):
    __tablename__ = 'prompts'

    @classmethod
    def find(cls, id):
        prompt = Prompt.query.filter(Prompt.id == id).first()
        return prompt

    # Primary key column
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key column referencing the categories table
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    # Title of the prompt
    title = db.Column(db.String(100), nullable=False)
    # Description of the prompt
    description = db.Column(db.Text, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False )

    # Relationship with User model (many-to-one)
    user = db.relationship('User', back_populates='prompts')
    # Relationship with Category model (many-to-one)
    category = db.relationship('Category', back_populates='prompts',)
    # Relationship with User_Idea model (one-to-many)
    user_ideas = db.relationship('User_Idea', back_populates='prompt', cascade = 'all, delete-orphan')

    serialize_rules = (
        '-user.prompts',
        '-user_ideas.prompt'
        )  
    # Exclude 'user' and 'user_ideas' relationships from serialization

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())    

############ validations for Prompt ##############
    #checking if user and category exists
    @validates( 'user_id')
    def validate_user( self, key, user_id ):
        user = User.find( user_id )        
        if user:
            return user_id
        else: 
            raise ValueError( "User not found. ")
    @validates( 'category_id')
    def validate_category( self, key, category_id ):
        user = Category.find( category_id )        
        if user:
            return category_id
        else: 
            raise ValueError( "Category not found. ")
    # title can't exceed 150 characters
    @validates( 'title' )
    def validate_title( self, key, title ):
        if type(title) is str and len(title) < 150 :
            return title
        else: 
            raise ValueError( "Title cannot exceed 150 characters.")
    #description can't exceed 10k characters
    @validates( 'description' )
    def validate_description( self, key, description ):
        if type(description) is str and len(description) < 10000 :
            return description
        else: 
            raise ValueError( "Description cannot exceed 10,000 characters.")

    def __repr__(self):
        return f"<Prompt {self.title}>"

# User_Idea model represents the user_ideas table in the database
class User_Idea(db.Model, SerializerMixin):
    __tablename__ = 'user_ideas'

    @classmethod
    def find(cls, id):
        user_idea = User_Idea.query.filter(User_Idea.id == id).first()
        return user_idea

    # Primary key column
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key column referencing the users table
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # Foreign key column referencing the prompts table
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.id'), nullable=False)

    # Flag indicating whether the idea is saved
    # is_saved = db.Column(db.Boolean, default=False)
    # Flag indicating whether the idea is created
    # is_created = db.Column(db.Boolean, default=False)
    # Timestamp when the idea is saved
    # saved_at = db.Column(db.DateTime, default=datetime.utcnow)
        # updated time stamps 
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    # Additional notes for the idea
    notes = db.Column(db.String)

    # Relationship with User model (many-to-one)
    user = db.relationship('User', back_populates='user_ideas')
    # Relationship with Prompt model (many-to-one)
    prompt = db.relationship('Prompt', back_populates='user_ideas')
    category = association_proxy( 'prompts', 'categories' )

    serialize_rules = ('-user.user_ideas', '-prompt.user_ideas',  )
#'-user_ideas.prompt'
############ validations for User_Idea ##############
    #checking if user and prompt exists
    @validates( 'user_id')
    def validate_user( self, key, user_id ):
        user = User.find( user_id )        
        if user:
            return user_id
        else: 
            raise ValueError( "User not found. ")
    # @validates( 'prompt_id')
    # def validate_prompt( self, key, prompt_id ):
    #     user = Category.find( prompt_id )        
    #     if user:
    #         return prompt_id
    #     else: 
    #         raise ValueError( "Prompt not found. ")
    # notes cannot exceed 10k characters
    @validates( 'notes' )
    def validate_notes( self, key, notes ):
        if type(notes) is str and len(notes) < 10000 :
            return notes
        else: 
            raise ValueError( "Notes cannot exceed 10,000 characters.")

    def __repr__(self):
        return f"SavedPrompt(id={self.id}, user_id={self.user_id}, prompt_id={self.prompt_id}, saved_at={self.saved_at})"