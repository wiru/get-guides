from flask_cors import CORS
from threading import Lock

from flask import Flask, jsonify, send_from_directory, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
     
# async_mode = None

# The two lines below have to be added to the .env file to run flask
# create .env and add follwoing 2 lines.
#  
# FLASK_APP=app.py
# FLASK_ENV=development
# 
# alias python= python3
# Add .env to gitignore
#
# then do pipenv install (this installs everything mentioned in the pipfile)
#
# to run (any) python file, a virtual environment has to be created
# this has to be done by running 'pipenv shell' (step has to be done after .env file is prepared)
# After this, type "flask run" into cmd/bash


# import socketio

app = Flask(__name__, static_folder="client/dist/pwa", static_url_path="")
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')
# thread = None
# thread_lock = Lock()

CORS(app)

cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@socketio.event
def connect():
    print('FUCKING! CONNECTED')

@socketio.event
def disconnect():
    print('FUCKED OFF')

# Currently stuck on long polling. Issue with server most likely relating to 
# https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen/17697134#17697134
@socketio.event
def Message(data):
    print(data)


if __name__ == '__main__':
    socketio.run(app)