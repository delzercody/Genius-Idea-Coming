SQLALCHEMY_DATABASE_URI = 'sqlite:///generate_ideas.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData