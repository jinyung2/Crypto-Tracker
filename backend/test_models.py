import pytest
from crypto_model import Crypto
from model import User

existing_user = 'testuser@users.com'   # Email of an existing user


def test_find_by_email_found():
   # Checks that the user was found
   assert User().find_by_email(existing_user) != None


def test_find_by_email_not_found():
   # Checks that there is no user with the passed in email
   assert User().find_by_email("nonexistentemail@no.com") == None


def test_update_watchlist_empty():
   # Get a user and replace its watchlist with an empty list
   found_user = User().find_by_email(existing_user)
   found_user['watchlist'] = []
   User(found_user).update_watchlist()

   # Get the newly updated user
   updated_user = User().find_by_email(existing_user)

   # Check that the user's watchlist is indeed empty
   assert updated_user['watchlist'] == []


def test_update_watchlist_one_item():
   # List with a single item that will replace the user's watchlist
   single_item = 'dogecoin'
   
   # Get a user and replace its watchlist with a one-item watchlist
   found_user = User().find_by_email(existing_user)
   found_user['watchlist'] = [single_item]
   User(found_user).update_watchlist()

   # Get the newly updated user
   updated_user = User().find_by_email(existing_user)

   # Check that the user's watchlist contains only one item
   assert updated_user['watchlist'] == [single_item]


def test_find_all():
   # Checks that there is at least one user
   assert User().find_all() != []


def test_generate_auth_token():
   # Get a user and generate a token for it
   user = User().find_by_email(existing_user)
   token = User().generate_auth_token(user)

   # Check that a token was indeed generated
   assert token != None


def test_verify_auth_token_valid():
   # Get a user and generate a token for it
   user = User().find_by_email(existing_user)
   token = User().generate_auth_token(user)

   # Get the user linked to the token
   linked_user = User().verify_auth_token(token)

   # Check that the user linked to the token matches with the passed in user
   assert linked_user['email'] == existing_user


def test_verify_auth_token_invalid():
   # Get a user and generate a token for it
   user = User().find_by_email(existing_user)
   token = User().generate_auth_token(user)

   # Try go verify an invalid token
   linked_user = User().verify_auth_token("invalid token")

   # Check that there was no user linked to that token
   assert linked_user == None

# ------------- CRYPTO MODEL TESTS ---------------

def test_get_all_coin():
   # Get all of the cois
   coins = Crypto().get_all_coin()

   # Check that something was returned
   assert coins != None

   # Check that the response has a data section
   assert 'data' in coins

   # Check that data contains a list of coins
   assert type(coins['data']) == list


def test_get_history():
   # Get the hitory of a coin
   coin_hist = Crypto().get_history('dogecoin', 'm1')

   # Check that something was returned
   assert coin_hist != None

   # Check that the response has a data section
   assert 'data' in coin_hist

   # Check that data contains a list with historical data 
   assert type(coin_hist['data']) == list
