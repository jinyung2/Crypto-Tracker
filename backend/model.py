import pymongo
from bson import ObjectId
import dns
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer,
                          BadSignature, SignatureExpired)


from dotenv import load_dotenv
import os


class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        if not self._id:
            self.collection.insert(self)
        else:
            self.collection.update(
                {"_id": ObjectId(self._id)}, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result:
                self.update(result)
                self._id = str(self._id)
                return True
        return False

    def remove(self):
        if self._id:
            resp = self.collection.remove({"_id": ObjectId(self._id)})
            self.clear()
            return resp


class User(Model):

    load_dotenv()
    URI = os.environ['URI']
    SECRET_KEY = os.environ['SECRET_KEY']

    db_client = pymongo.MongoClient(
        URI,
        tls=True,
        tlsAllowInvalidCertificates=True)
    db = db_client.get_database('cryptotracker')
    collection = db.Users

    def find_all(self) -> list:
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def find_by_email(self, email: str) -> list:
        """
        Input:  An email
        Output: The entry that matches the given email, if found
                Returns None otherwise
        """
        user = self.collection.find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])
        return user

    def find_by_id(self, id: str) -> list:

        user = self.collection.find_one({"_id": id})

        if user:
            user["_id"] = str(user["_id"])

        return user

    # Auth-Token Generation
    def generate_auth_token(self, user: dict, expiration: int = 600):
        """
        Input:  A dictionary representing a user and an expiration timer,
                600 seconds (10 minutes) by default
        Output: A token linked to the user's email
        """
        # Set up serializer
        s = Serializer(User.SECRET_KEY, expiration)

        # Return encrypted dictionary containing the user's email
        return s.dumps({'email': user['email']})

    # Token verification
    def verify_auth_token(self, token: str):
        """
        Input:  A token
        Output: Returns the user linked to that token if the token is valid
                Returns None otherwise
        """
        # Set up serializer
        s = Serializer(User.SECRET_KEY)

        # Try loading token
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None  # Returns none if the token expired
        except BadSignature:
            return None  # Returns None if the token is invalid

        # Find and return user linked to that token
        user = User().find_by_email(data['email'])
        return user

    # Watchlist update
    def update_watchlist(self):
        """
            Updates the entry with the same '_id'
        """

        self.collection.update(
            {"_id": ObjectId(self._id)},
            {'$set': {'watchlist': self.watchlist}}
        )
