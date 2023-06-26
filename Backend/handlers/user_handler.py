def create_user(username, password, email, bio=None, location=None):
    user = User(username=username, password=password, email=email, bio=bio, location=location)
    db.session.add(user)
    db.session.commit()

def get_user(user_id):
    user = User.query.get(user_id)
    return user

def update_user(user_id, username=None, password=None, email=None, bio=None, location=None):
    user = get_user(user_id)
    if user is not None:
        if username is not None:
            user.username = username
        if password is not None:
            user.password = password
        if email is not None:
            user.email = email
        if bio is not None:
            user.bio = bio
        if location is not None:
            user.location = location
        db.session.commit()

def delete_user(user_id):
    user = get_user(user_id)
    if user is not None:
        db.session.delete(user)
        db.session.commit()
