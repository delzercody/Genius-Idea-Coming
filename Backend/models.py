from config.database import db
from datetime import datetime
from sqlalchemy_serializer import SerializerMixin

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
    prompts = db.relationship('Prompt', back_populates='category')

    serialize_rules = ('-prompts',)  # Exclude 'ideas' relationship from serialization

    def __init__(self, name, description):
        self.name = name
        self.description = description

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
    username = db.Column(db.String(50), unique=True, nullable=False)
    # Password of the user
    password = db.Column(db.String(100), nullable=False)
    # Email of the user (unique)
    email = db.Column(db.String(100), unique=True, nullable=False)
    # Created at timestamp
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Updated at timestamp
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # User's bio
    bio = db.Column(db.Text)
    # User's location
    location = db.Column(db.String(100))
    # User's first name
    first_name = db.Column(db.String(100)) 
    # User's last name
    last_name = db.Column(db.String(100)) 

    # Relationship with Idea model (one-to-many)
    prompts = db.relationship('Prompt', back_populates='user')
    # Relationship with User_Idea model (one-to-many)
    user_ideas = db.relationship('User_Idea', back_populates='user')

    serialize_rules = ('-prompts.user', '-user_ideas.user')  # Exclude 'ideas' and 'user_ideas' relationships from serialization

    def __init__(self, username, password, email, first_name, last_name, bio=None, location=None):
        self.username = username
        self.password = password
        self.email = email
        self.first_name = first_name 
        self.last_name = last_name 
        self.bio = bio
        self.location = location

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

    # Relationship with User model (many-to-one)
    user = db.relationship('User', back_populates='prompts')
    # Relationship with Category model (many-to-one)
    category = db.relationship('Category', back_populates='prompts')
    # Relationship with User_Idea model (one-to-many)
    user_ideas = db.relationship('User_Idea', back_populates='prompt')

    serialize_rules = ('-user.prompts', '-user_ideas.prompt')  # Exclude 'user' and 'user_ideas' relationships from serialization

    def __init__(self, category_id, title, description):
        self.category_id = category_id
        self.title = title
        self.description = description

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
    is_saved = db.Column(db.Boolean, default=False)
    # Flag indicating whether the idea is created
    is_created = db.Column(db.Boolean, default=False)
    # Timestamp when the idea is saved
    saved_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Additional notes for the idea
    notes = db.Column(db.String(255))

    # Relationship with User model (many-to-one)
    user = db.relationship('User', back_populates='user_ideas')
    # Relationship with Prompt model (many-to-one)
    prompt = db.relationship('Prompt', back_populates='user_ideas')

    serialize_rules = ('-user.user_ideas', '-prompt.user_ideas')

    def __init__(self, user_id, prompt_id, notes=None):
        self.user_id = user_id
        self.prompt_id = prompt_id
        self.notes = notes

    def __repr__(self):
        return f"SavedPrompt(id={self.id}, user_id={self.user_id}, prompt_id={self.prompt_id}, saved_at={self.saved_at})"






























# # class Category(db.Model):
# #     category_id = db.Column(db.Integer, primary_key=True)
# #     name = db.Column(db.String(50), nullable=False)
# #     ideas = db.relationship('Idea', backref='category', lazy=True)

# class Category(db.Model):
#     __tablename__ = 'categories'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), unique=True, nullable=False)
#     description = db.Column(db.String(255), nullable=False)

#     ideas = db.relationship('Idea', back_populates='category')

#     def __init__(self, name, description):
#         self.name = name
#         self.description = description

#     def __repr__(self):
#         return f"<Category {self.name}>"



# class Idea(db.Model):
#     __tablename__ = 'ideas'

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
#     title = db.Column(db.String(100), nullable=False)
#     description = db.Column(db.Text, nullable=False)
#     users = db.relationship('User_Idea', back_populates='idea')
#     user = db.relationship('User', back_populates='ideas', foreign_keys=[user_id])
#     category = db.relationship('Category', back_populates='ideas')
#     saved_ideas = db.relationship('SavedIdea', back_populates='idea')

#     def __init__(self, user_id, category_id, title, description):
#         self.user_id = user_id
#         self.category_id = category_id
#         self.title = title
#         self.description = description

#     def __repr__(self):
#         return f"<Idea {self.title}>"


# # class Idea(db.Model):
# #     idea_id = db.Column(db.Integer, primary_key=True)
# #     prompt = db.Column(db.String(100), nullable=False)
# #     description = db.Column(db.Text, nullable=False) #I want this to be a user input field that becomes the saved idea in the collection of ideas and has the full CRUD ability. What adjustments need to be made to make this happen?
# #     category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=False) #What's going on with the foreign key? Why do we have to do a form of dot notation to access the value?
# #     saved_ideas = db.relationship('SavedIdea', back_populates='idea')
# #     # saved_ideas = db.relationship('SavedIdea', backref='user', lazy=True) #What is backref? What about backpopulates? What even is backpopulates? Why would you choose one over the other?

# class User(db.Model):
#     __tablename__ = 'users'

#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(50), unique=True, nullable=False)
#     password = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
#     ideas = db.relationship('User_Idea', back_populates='user')
#     saved_ideas = db.relationship('SavedIdea', back_populates='saved_by_user')
#     bio = db.Column(db.Text)
#     location = db.Column(db.String(100))

#     def __init__(self, username, password, email, bio=None, location=None):
#         self.username = username
#         self.password = password
#         self.email = email
#         self.bio = bio
#         self.location = location

#     def __repr__(self):
#         return f"<User {self.username}>"


# # class User(db.Model):
# #     user_id = db.Column(db.Integer, primary_key=True)
# #     username = db.Column(db.String(50), unique=True, nullable=False) #Going to need to have some sort of authentication and/or authorization. Also want to make it so once someone logs in they stay logged in.
# #     password = db.Column(db.String(100), nullable=False) #This should display * when the user is inputting the password. should set up some password rules like must include a letter and at least one number/special character
# #     saved_ideas = db.relationship('SavedIdea', backref='user', lazy=True)

# class User_Idea(db.Model):
#     __tablename__ = 'user_ideas'
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     idea_id = db.Column(db.Integer, db.ForeignKey('ideas.id'), nullable=False)
#     is_saved = db.Column(db.Boolean, default=False)
#     is_created = db.Column(db.Boolean, default=False)
#     saved_at = db.Column(db.DateTime, default=datetime.utcnow)
#     notes = db.Column(db.String(255))

#     user = db.relationship('User', back_populates='ideas')
#     idea = db.relationship('Idea', back_populates='users')

#     def __init__(self, user, idea, notes=None):
#         self.user = user
#         self.idea = idea
#         self.notes = notes

#     def __repr__(self):
#         return f"SavedIdea(id={self.id}, user_id={self.user_id}, idea_id={self.idea_id}, saved_at={self.saved_at})"


# # class SavedIdea(db.Model):
# #     __tablename__ = 'saved_ideas'
# #     id = db.Column(db.Integer, primary_key=True)
# #     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False) #Again with the dot notation. How come? Do we really have 2 primary keys here?
# #     idea_id = db.Column(db.Integer, db.ForeignKey('ideas.id'), nullable= False) 
# #     notes = db.Column(db.Text)#This should be tied to description from the class Idea. I want it to be user input.


    