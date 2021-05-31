from flask_cors import CORS
from threading import Lock
import os
import datetime

from flask import Flask, jsonify, send_from_directory, render_template, session, request, \
    copy_current_request_context

from flask_pymongo import PyMongo

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
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
socketio = SocketIO(app, cors_allowed_origins='*')
# thread = None
# thread_lock = Lock()

CORS(app)

cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

mongo = PyMongo(app)

@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.get("/api/guides")
def get_guides():
    guides = mongo.db.guides
    out = []
    for guide in guides.find():
        print(guide)
        out.append({'name': guide['name'], 'avatar': guide['avatar']})
    return jsonify(out)

@app.get("/api/guides/<name>")
def get_single_guide(name):
    guide = mongo.db.guides.find_one({"name": request.form.name})
    return jsonify(guide)

@app.get("/api/bookings/<name>")
def get_bookings():
    bookings = mongo.db.bookings
    out = []
    if userType == 'traveller':
        for booking in bookings.find("name": request.form.name):
            out.append({
                guide: booking['guide'],
                location: booking['location'],
                date: booking['date'],
                start_time: booking['start_time'],
                end_time: booking['end_time'],
                meeting_location: booking['meeting_location'],
                details: booking['details'],
                status: booking['status'],
                convID: booking['conversation']['_id']
            })
    else: 
        for booking in bookings.find("name": request.form.name):
            out.append({
                traveller: booking['traveller'],
                location: booking['location'],
                date: booking['date'],
                start_time: booking['start_time'],
                end_time: booking['end_time'],
                meeting_location: booking['meeting_location'],
                details: booking['details'],
                status: booking['status'],
                convID: booking['conversation']['_id']
            })

@app.get("/api/messages/<conversation_ID>")
def get_conversation():
    converations = mongo.db.conversations
    return jsonify(conversations.find_one({"_id": request.form.id}))


# post new guide
@app.post("/api/guides/<name>")
def add_guide():
    mongo.db.guides.insert_one({
        'name': request.form.name,
        "avatar": "https://randomuser.me/api/portraits/men/11.jpg",
        "gallery": [],
        "email": request.form.email,
        "languages": [
            {"italian": 5},
            {"arabic": 5},
            {"english": 4},
        ],
        "bio": request.form.bio,
        "weekdays": request.form.weekdays,
        "locations": request.form.locations,
        "bookings": [],
        "rate": 0,
        })

# post new traveller
@app.post("/api/travellers/<name>")
def add_traveller():
    mongo.db.travellers.insert_one({
        'name': request.form.name,
        "avatar": "https://randomuser.me/api/portraits/men/11.jpg",
        "email": request.form.email,
        "bookings": [],
        })

# post new booking
@app.post("/api/bookings/<booking_ID>")
def add_booking():
    mongo.db.bookings.insert_one({
        "traveller": request.form.traveller,
        "guide": request.form.guide,
        "location": request.form.location,
        "date": request.form.date,
        "start_time": request.form.start_time,
        "end_time":request.form.end_time,
        "meeting_location": request.form.meeting_location,
        "details": request.form.details,
        "status": request.form.confirmed",
        "conversation": ""
    })

# put booking
@app.put("/api/bookings/<booking_ID>")
def modify_booking():
    mongo.db.bookings.insert_one({
        "traveller": request.form.traveller,
        "guide": request.form.guide,
        "location": request.form.location,
        "date": request.form.date,
        "start_time": request.form.start_time,
        "end_time":request.form.end_time,
        "meeting_location": request.form.meeting_location,
        "details": request.form.details,
        "status": request.form.confirmed",
        "conversation": ""
    })

# post new message
@app.post("/api/messages/<message_ID>")
def post_message():
    conversation = mongo.db.conversations.find_one({"_id": request.form.id})
    mongo.db.conversations[request.form.id]['messages'] ({
        "from": request.form.from,
        "text": request.form.text,
        "timestamp": datetime.datetime.now().replace(microsecond=0)
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