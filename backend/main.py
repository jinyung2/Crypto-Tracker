from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt                                 #Encryption module

import pymongo

from model import User

import string

app = Flask(__name__)                                           #Initializing flask app
bcrypt = Bcrypt(app)                                            #Initializing encryption utility
CORS(app)                                                       #Can't remember why anymore, but we need it

@app.route('/signup', methods=['POST'])
def signup():

    userToAdd = request.get_json()

    #Check if the given user is valid
    if not validSignUp(userToAdd):
        return jsonify(success=False, reason="Invalid Fields"), 400

    if existingEmail(userToAdd):
        return jsonify(success=False, reason="Email Already Exists"), 400

    #Password encrytion
    crypt = bcrypt.generate_password_hash(userToAdd['password']).decode('utf-8')
    userToAdd['password'] = crypt

    #Remove re-entered password from the dict
    del userToAdd['reEnterPass']

    #Save user to database
    new_user = User(userToAdd)
    new_user.save()

    #Return token and success code
    resp = jsonify(token=new_user.get("_id"))
    return resp, 201

def validSignUp(user: dict) -> bool:
    """
    Input:  A dictionary representing the fields passed in for the user (email, password and re-entered password)
    Output: Returns False if any of the fields are empty, or if the passwords don't match. Returns True otherwise
    """

    #Check if any of the fields are empty
    if not user.get('email') or not user.get('password') or not user.get('reEnterPass'):
        return False

    #Check if passwords match
    if user['password'] != user['reEnterPass']:
        return False

    return True

def existingEmail(user: dict) -> bool:
    """
    Input:  A dictionary representing the fields passed in for the user (email, password and re-entered password)
    Output: Returns True if the given email already exists in the database. Returns False otherwise
    """

    if User().find_by_email(user['email'].lower()):
        return True

    return False


@app.route('/signin', methods=['POST'])
def signin():

    given_user = request.get_json()

    #Check if any of the fienlds is empty
    if not validSignIn(given_user):
        return jsonify(success=False, reason="Invalid Fields"), 400

    #Search for the email in database
    found = User().find_by_email(given_user['email'])
    if not found:
        return jsonify(success=False, reason="Email Not Found"), 400

    #Compare given password to database
    if not bcrypt.check_password_hash(found['password'], given_user['password']):
        return jsonify(success=False, reason="Password Does Not Match"), 400

    return jsonify(token=found['_id']), 200

def validSignIn(user: dict) -> bool:
    """
    Input:  A dictionary represengint the fields passed in for the user (email and password)
    Output: Returns False if either of the fields is empty. Returns True otherwise
    """

    if not user.get('email') or not user.get('password'):
        return False
    
    return True


#WILL BE LEAVING THIS FOR NOW FOR DEBUGGING PURPOSES
@app.route('/users', methods=['GET', 'POST', 'DELETE'])
def get_users():
    if request.method == 'GET':
        search_email = request.args.get('email')
            
        if search_email:
            users = User().find_by_email(search_email)

        else:
            users = User().find_all()
            
        return { "users_list" : users }

    elif request.method == 'POST':
        userToAdd = request.get_json()

        newUser = User(userToAdd)
        newUser.save()
        resp = jsonify(success=True, person=newUser)

        app.logger.info(newUser)

        return resp, 201


@app.route('/users/<id>', methods=['GET', 'DELETE'])
def get_user(id):

    if request.method == 'GET':
        
        user = User( {"_id": id} )
        if user.reload():
            return user
        return jsonify({ "error": "user not found" }), 404

    elif request.method == 'DELETE':

        user = User( {"_id": id} )
        if user.reload():
            user.remove()
            return jsonify({}), 204

        return jsonify({"error": "user not found"}), 404