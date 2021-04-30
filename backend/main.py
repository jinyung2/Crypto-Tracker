from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS

import pymongo

from model import User

import string
import random

app = Flask(__name__)
CORS(app)

users = {
    'users_list' :
    []
}


@app.route('/signup', methods=['POST'])
def sign_up():

    userToAdd = request.get_json()

    existing = User().find_by_usernamename(userToAdd['username'])
    if existing:
        resp = jsonify(success=False)
        return resp, 400

    new_user = User(userToAdd)
    new_user.save()
    resp = jsonify(success=True)
    return resp, 201


@app.route('/user', methods=['GET', 'POST', 'DELETE'])
def get_users():
    if request.method == 'GET':
        search_username = request.args.get('name')
        search_job = request.args.get('job')
            
        if search_username:               #Updated to work with DB
            users = User().find_by_name(search_username)

        else:                               #Updated to work with DB
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