import pymongo
from bson import ObjectId
import dns
import dotenv

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

    db_client = pymongo.MongoClient(dotenv.URI, tls=True, tlsAllowInvalidCertificates=True)
    #db = client.test
    #collection = db_client["cryptotracker"]["Users"]  #db name is 'cryptotracker' and collection name is 'Users'
    db = db_client.get_database('cryptotracker')
    collection = db.Users

    def find_all(self):
        users = list(self.collection.find())
        for user in users:
            user["_id"] = str(user["_id"])
        return users

    def find_by_usernamename(self, name):
        users = list(self.collection.find({"name": name}))
        for user in users:
            user["_id"] = str(user["_id"])
        return users