from flask_cors import CORS
from threading import Lock

from flask import Flask, jsonify, send_from_directory, render_template, session, request, \
    copy_current_request_context
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
     
# async_mode = None

# import socketio

app = Flask(__name__)
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