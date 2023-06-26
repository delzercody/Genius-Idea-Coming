from flask import request
from user_manager import *

@app.route('/users', methods=['POST'])
def create_user_route():
    data = request.json
    create_user(data['username'], data['password'], data['email'], data['bio'], data['location'])
    return 'User Created!', 201

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_route(user_id):
    user = get_user(user_id)
    if user is not None:
        return str(user), 200
    else:
        return 'User not found', 404
