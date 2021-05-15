# Flask Backend
The backend for this project was implemented using Flask.
There are a couple things that you need to do to get started.

## Set Up

### Virtual Environment
It is recommended that you set up a virtual environment to ensure that the project is isolated.

For more information about setting up virtual environments, go to https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/

### Dependencies
To make sure that you have all the necessary dependencies run 
```
pip install -r requirements.txt
```
This will install all the required libraries that are used in the project.

### URIs and Secret Keys
In order to protect our information, URIs and secret keys were not uploaded into the repo, but are required.

You will need to go to the backend channel in the server and download the `env` pinned in that channel.

After downloading it, move that file into the backend folder and rename it to `.env`

Any questions, please contact Wes.

### Starting Up The Application
After carrying all the previous steps, all that is left is starting up the application.

To do this, run the following commands:
```
set FLASK_APP=main.py
set FLASK_ENV=development
run flask
```

## Collaborating
If you make any changes, it would be appreciated that you follow PEP8 styling conventions. There exist a few tools to help aid with that (those are installed when running `pip install -r requirements.txt`). Note that these tools are not able to cover all styling issues, so you will still need to do some checking and fixing yourself.

Info about the PEP8 Style Guide can be found at https://www.python.org/dev/peps/pep-0008/

### pycodestyle
`pycodestyle` is a tool that checks the formatting of a specific file and reports any lines of code that do not follow typical styling conventions. To use it, run
```
pycodestyle <filename>
```
on your terminal.

If your file follows PEP8 styling, nothing should be printed to the terminal. 

Any reported issues should be addressed before pushing.

### autopep8
`autopep8` automatically addresses minor formatting issues. To use it, run
```
autopep --in-place -a -a <filename>
```
on your terminal.

Please note that this does NOT remove all styling errors. You should re-run `pycodestyle` afterwards to make sure that all issues were addressed.

## Routes

### `/signup`
#### Compatible Methods: POST
Used for user account creation.

Expects `data` to have a json file containing:
* `email`: the user's email
* `password`: the user's password
* `reEnterPass`: the re-entered password

#### Response
Upon successful signup, a json file containing a `token` is returned. This `token` can be used to access pages that require authentication and will expire after 10 minutes.

If signup fails, a json file containing a `reason` will be returned.

### `/signin`
#### Compatible Methods: POST
Used for users to sign in into their existing accounts.

Expects `data` to have a json file containing:
* `email`: the user's email
* `password`: the user's password

#### Response
Upon successful login, a json file containing a `token` is returned. This `token` can be used to access pages that require authentication and will expire after 10 minutes.

If login fails, a json file containing a `reason` will be returned (Does not specify what the error is).

### `/coin/<id>`
#### Compatible Methods: GET
Used to search for specific coins. NOTE that this route is still in development, so the information might change in the future.

`id` can either be the id of a coin, or the symbol of a coin.

#### Response
If a coin with the given `id` is found, then a json file is returned containing:
* `name`: The name of the coin
* `id`: the id of the coin
* `symbol`: the symbol of the coin
* `priceUsd`: The current price, in USD, of the coin

### `/watchlist`
#### Compatible Methods: GET
Used to get the watchlist of a specific user. NOTE that this route is still in development, so the information might change in the future.

Route expects a `token` to be passed in through the `bearer` header.

#### Response
Returns json file with a `wachlist`: an array containing the names of the coins that the user has in their watchlist.

### `/watchlist/<id>`
#### Compatible Methods: POST, DELETE
Used to add or delete elements from a user's watchlist. NOTE that this route is still in development, so the information might change in the future.

`id` is the name of coin. Can be updated to also work with symbols
