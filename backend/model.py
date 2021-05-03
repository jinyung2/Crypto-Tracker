import pymongo
from bson import ObjectId
import dns


from dotenv import dotenv_values
config = dotenv_values(".env")

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
                { "_id": ObjectId(self._id) }, self)
        self._id = str(self._id)

    def reload(self):
        if self._id:
            result = self.collection.find_one({"_id": ObjectId(self._id)})
            if result :
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

    db_client = pymongo.MongoClient(config["URI"], tls=True, tlsAllowInvalidCertificates=True)
    db = db_client.get_database('cryptotracker')
    collection = db.Users

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def find_by_email(self, email: str) -> list:
        """
        Input:  An email
        Output: A list containing the entry that matches the given email, if found
                Returns an empty list otherwise
        """
        user = self.collection.find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])
        return user

    def find_by_id(self, id: str):
        
        user = self.collection.find_one( {"_id": id} )

        if user:
            user["_id"] = str(user["_id"])

        return user
