import pytest
from model import User

existing_user = 'hadiasemi@gmail.com'   # Email of an existing user


def test_find_by_email_found():
   # Checks that the user was found
   assert User().find_by_email(existing_user) != None


def test_find_by_email_not_found():
   assert User().find_by_email("nonexistentemail@no.com") == None


def test_update_watchlist_empty():

   empty_watchlist = []

   found_user = User().find_by_email(existing_user)
   found_user['watchlist'] = empty_watchlist
   User(found_user).update_watchlist()

   assert User().find_by_email(existing_user)['watchlist'] == empty_watchlist


def test_update_watchlist_one_item():

   one_item_watchlist = ['dogecoin']
   
   found_user = User().find_by_email(existing_user)
   found_user['watchlist'] = one_item_watchlist
   User(found_user).update_watchlist()

   assert User().find_by_email(existing_user)['watchlist'] == one_item_watchlist


def test_find_all():

   all_users = User().find_all()

   found_user = None
   for user in all_users:
      if user['email'] == existing_user:
         found_user = user
         break

   assert found_user != None



