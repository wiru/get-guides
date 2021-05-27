# jsonify is 
# send_from_directory is
# cors is checking if injected from outside or valid request. 
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# The two lines below have to be added to the .env file to run flask
# create .env and add follwoing 2 lines. 
# FLASK_APP=app.py
# FLASK_ENV=development
# alias python= python3
# Add .env to gitignore
# to run (any) python file, a virtual environment has to be created
# this has to be done by running 'pipenv shell' (step has to be done after .env file is prepared)


# make server like express()
app = Flask(__name__)
# wrap app in CORS protection?
CORS(app)

cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.route("/", methods=['GET', 'POST'])
def index():
    print(request.data)
    if request.method == 'POST':
        return "<h1>This was a POST</h1>"

@app.route("/api/guides")
def guides():
    return "<h1>It's a guide page</h1>"

@app.route("/api/user/<username>")
def user():
    headers = {'content-type': 'application/json'}
    return make_response(
        'some shit',
        200,
        headers=headers
    )