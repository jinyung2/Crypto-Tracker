from model import User
from flask import Flask
from flask import request
from flask import jsonify
from flask import g as context
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import requests as r


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

    # Password encryption
    crypt = bcrypt.generate_password_hash(
        userToAdd['password']).decode('utf-8')
    userToAdd['password'] = crypt

    # Remove casing from email
    userToAdd['email'] = userToAdd['email'].lower()

    # Remove re-entered password from the dict
    del userToAdd['reEnterPass']

    # Create an empty watchlist
    userToAdd['watchlist'] = []

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
        return jsonify(success=False, reason="Invalid Credentials"), 400

    # Search for the email in database
    found = User().find_by_email(given_user['email'])
    if not found:
        return jsonify(success=False, reason="Invalid Credentials"), 400

    # Compare given password to database
    if not bcrypt.check_password_hash(
            found['password'],
            given_user['password']):
        return jsonify(success=False, reason="Invalid Credentials"), 400

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


# Only for testing purposes. Will be removed afterwards
# Gets the token for the user passed through the header.
@app.route('/token', methods=['GET'])
def get_auth_token():

    # A header is still to be decided
    token = request.headers.get("bearer")

    token = User().generate_auth_token(context.user)
    return jsonify({'token': token.decode('ascii')})


# If given an email, verifies that the password matches the one in the database
# If given a token, verifies that the token is valid

def verify_token(token):
    """
    Input:  A token
    Output: Returns True if the given token is valid.
            Returns False otherwise.

            On successful validation of the token, the user is passed back
            through context.user and remains through the request
    """

    # First checks if a token was passed in
    user = User().verify_auth_token(token)

    if not user:  # If no user was linked to the token that was passed in
        return False

    # context remains constant through a request. Used to securely pass info
    # back from a call
    context.user = user
    return True


# Route to get the user's watchlist
@app.route('/watchlist', methods=['GET'])
def get_watchlist():

    # Get the passed in token
    token = request.headers.get("bearer")

    # Verify that a valid token was passed in
    if not verify_token(token):
        return jsonify(success=False), 400

    # Return user's watchlist
    return jsonify(watchlist=context.user['watchlist']), 201


# Route to add/remove an item from watchlist
@app.route('/watchlist/<id>', methods=['POST', 'DELETE'])
def edit_watchlist(id):

    # Get the passed in token
    token = request.headers.get("bearer")

    # Verify that a valid token was passed in
    if not verify_token(token):
        return jsonify(success=False), 400

    # 'id' is to be added to the list
    if request.method == 'POST':

        # TODO: implement a check to see that the id does indeed exist

        # Add 'id' to watchlist and remove casing
        context.user['watchlist'].append(id.lower())

    # 'id' is to be removed from the list
    elif request.method == 'DELETE':

        # Check that the 'id' is in the list
        if id in context.user['watchlist']:

            # Remove 'id'
            context.user['watchlist'].remove(id.lower())

    # Update user's watchlist
    updated = User(context.user)
    updated.update_watchlist()

    return jsonify(success=True), 201
        

@app.route('/coin/<id>', methods=['GET'])
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
