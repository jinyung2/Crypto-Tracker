# Flask Backend
The backend for this project was implemented using Flask.
There are a couple things that you need to do to get started.

## Set Up

### Virtual Environment
It is recommended that you set up a virtual environment to ensure that the project is isolated.

For more information about setting up virtual environments, go to https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/

### Dependencies
To make sure that you have all the necessary dependencies run 
```pip install -r requirements.txt```
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

### pycodestyle and autopep8
`pycodestyle` is a tool that checks the formatting of a specific file and reports any lines of code that do not follow typical styling conventions. To use it, run
```pycodestyle <filename>```
on your terminal.

If your file follows PEP8 styling, nothing should be printed to the terminal. 

Any reported issues should be addressed before pushing.

To check that you are following the PEP8 style formatting guide, run
`pycodestyle <filename>`. To solve minor styling issues, you can also run
`autopep8 --in-place -a -a <file>`. Note that this does NOT remove all styling errors. 
You will have to re-run the stylechecker afterwards to make sure that all issues were addressed.

### autopep8
`autopep8` automatically addresses minor formatting issues. To use it, run
```autopep --in-place -a -a <filename>```
on your terminal.

Please note taht this does NOT remove all styling errors. You should re-run `pycodestyle` afterwards to make sure that all issues were addressed.

