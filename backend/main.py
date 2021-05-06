import string
from model import User
import pymongo
from flask import Flask
from flask import request
from flask import jsonify
from flask import g as context
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import requests as r

from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()


app = Flask(__name__)  # Initializing flask app
bcrypt = Bcrypt(app)  # Initializing encryption utility
CORS(app)  # Can't remember why anymore, but we need it


@app.route('/signup', methods=['POST'])
def signup():

    userToAdd = request.get_json()

    # Check if the given user is valid
    if not validSignUp(userToAdd):
        return jsonify(success=False, reason="Invalid Fields"), 400

    if existingEmail(userToAdd):
        return jsonify(success=False, reason="Email Already Exists"), 400

    # Password encrytion
    crypt = bcrypt.generate_password_hash(
        userToAdd['password']).decode('utf-8')
    userToAdd['password'] = crypt

    # Remove re-entered password from the dict
    del userToAdd['reEnterPass']

    # Save user to database
    new_user = User(userToAdd)
    new_user.save()

    # Return token and success code
    token = User().generate_auth_token(new_user)
    return jsonify(token=token.decode('utf-8')), 201


def validSignUp(user: dict) -> bool:
    """
    Input:  A dictionary representing the fields passed in for the user (email,
            password and re-entered password)
    Output: Returns False if any of the fields are empty, or if the passwords
            don't match. Returns True otherwise
    """

    # Check if any of the fields are empty
    if not user.get('email') or not user.get(
            'password') or not user.get('reEnterPass'):
        return False

    # Check if passwords match
    if user['password'] != user['reEnterPass']:
        return False

    return True


def existingEmail(user: dict) -> bool:
    """
    Input:  A dictionary representing the fields passed in for the user (email,
            password and re-entered password)
    Output: Returns True if the given email already exists in the database.
            Returns False otherwise
    """

    if User().find_by_email(user['email'].lower()):
        return True

    return False


@app.route('/signin', methods=['POST'])
def signin():

    given_user = request.get_json()

    # Check if any of the fienlds is empty
    if not validSignIn(given_user):
        return jsonify(success=False, reason="Invalid Fields"), 400

    # Search for the email in database
    found = User().find_by_email(given_user['email'])
    if not found:
        return jsonify(success=False, reason="Email Not Found"), 400

    # Compare given password to database
    if not bcrypt.check_password_hash(
            found['password'],
            given_user['password']):
        return jsonify(success=False, reason="Password Does Not Match"), 400

    # Generate token for the user
    token = User().generate_auth_token(given_user)
    return jsonify(token=token.decode('utf-8')), 201


def validSignIn(user: dict) -> bool:
    """
    Input:  A dictionary represengint the fields passed in for the user (email
            and password)
    Output: Returns False if either of the fields is empty.
            Returns True otherwise
    """

    if not user.get('email') or not user.get('password'):
        return False

    return True


# Gets the token for the user passed through the HTTP header
@app.route('/token', methods=['GET'])
@auth.login_required
def get_auth_token():
    token = User().generate_auth_token(context.user)
    return jsonify({'token': token.decode('ascii')})


# If given an email, verifies that the password matches the one in the database
# If given a token, verifies that the token is valid
@auth.verify_password
def verify_password(email_or_token, password):

    # First checks if a token was passed in
    user = User().verify_auth_token(email_or_token)

    if not user:  # If no user was linked to a token or an email was passed in

        # Search email in database and then compare passwords
        user = User().find_by_email(email_or_token)
        if not user or not bcrypt.check_password_hash(
                user['password'],
                password):
            return False

    # context remains constant through a request. Used to securely hold info
    # through different calls
    context.user = user
    return True


@app.route('/search/<id>', methods=['GET'])
def get_coin(id):
    url = "http://api.coincap.io/v2/assets"

    payload = {}
    headers = {}
    info_coin = {}
    response = r.request("GET", url, headers=headers, data=payload)
    data = response.json()
    for info in data['data']:
        if id == info['id'] or str.upper(id) == info['symbol']:
            info_coin = {
                "name": info['name'],
                'id': info['id'],
                'symbol': info['symbol'],
                'priceUsd': info['priceUsd']

            }
            return info_coin
    return jsonify({"error": "Coin not found"}), 404


# WILL BE LEAVING THIS FOR NOW FOR DEBUGGING PURPOSES
@app.route('/users', methods=['GET', 'POST', 'DELETE'])
def get_users():
    if request.method == 'GET':
        search_email = request.args.get('email')

        if search_email:
            users = User().find_by_email(search_email)

        else:
            users = User().find_all()

        return {"users_list": users}
