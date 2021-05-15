import pytest
import main
from model import User

user = {
   '_id':'60a03a5f546cc6c6769229b8',
   'email': 'hadiasemi@gmail.com',
   "password": "$2b$12$d8uiLkJ2p4ofT8jHBLU/YOiem5oJSySnoExs.1hAMZ1wmSnU1pRie",
   "watchlist": ['Doge']
}
def test_findEmail():
   assert User().find_by_email(user['email']) == user
def test_updateWatchlist():
   new = {
   '_id':'60a03a5f546cc6c6769229b8',
   'email': 'hadiasemi@gmail.com',
   "password": "$2b$12$d8uiLkJ2p4ofT8jHBLU/YOiem5oJSySnoExs.1hAMZ1wmSnU1pRie",
   "watchlist": ['Doge']
   }
   user_update = User(new).update_watchlist()   
   assert new == User().find_by_email(user['email'])
