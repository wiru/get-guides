from flask_cors import CORS
from threading import Lock
from authlib.integrations.flask_client import OAuth
from flask import Flask, url_for, redirect, jsonify, send_from_directory, render_template, session, request
import datetime

from flask_pymongo import PyMongo

from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect

import os

import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)



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
app = Flask(__name__, static_folder="client/dist/pwa", static_url_path="")


# AUTHLIB #
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.environ.get('OAUTH_ID'),
    client_secret=os.environ.get('OAUTH_SECRET'),
    access_token_url='https://accounts.google.com/o/oauth2/token',    
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={'scope': 'openid profile email'}
)

# SOCKET.IO #
app.config['SECRET_KEY'] = 'secret!' # MAKE THIS HARDER FOR PRODUCTION
# import socketio

app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
socket = SocketIO(app, cors_allowed_origins='*')
# thread = None
# thread_lock = Lock()

CORS(app)

cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
mongo = PyMongo(app)

def searchUser(gid, email, name):
    guide = mongo.db.guides.find_one({"gid": gid}, {'_id':1})
    if guide: 
        return {
            'path': 'MyProfile',
            'id': str(guide['_id']),
            'loggedIn': True
            }
    traveler = mongo.db.travellers.find_one({"gid": gid}, {'_id':1})
    if traveler:
        return {
            'path': 'Search',
            'id': str(traveler['_id']),
            'loggedIn': True}
    return {
            'path': 'Registration',
            'loggedIn': False,
            'email': email,
            'name': name,
            'gid': gid,
            }

# AUTHLIB
@app.route('/login')
def login():
    google = oauth.create_client('google')
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

    # If authorized we this route takes us to app redirect
@app.route('/authorize')
def authorize():
    google = oauth.create_client('google')
    token = google.authorize_access_token()
    resp = google.get('userinfo')
    resp.raise_for_status()
    user_info = resp.json()
    print(user_info['id'])

    #check user_info against data in database
    authObj = searchUser(
        user_info['id'], 
        user_info['email'],
        user_info['name'])
    # session['email'] = user_info['email'] # This needs to be changed for security. We should take userinfo from above and query the database so we dont pass around googleinfo.
    socket.emit('authResult', authObj)
    # do something with the token and profile
    return redirect('http://localhost:8080/')

# SOCKET.IO

@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/api/guides/search/<location>/<language>/<startdate>/<enddate>")
def get_guides(location, language, startdate, enddate):
    out = []
    for guide in mongo.db.guides.find({ "$and": [
        {"locations" : location},
        {"languages": language},
        { "unavailable_dates": { "$nin": [startdate] } }
    ]
    }, {"name":1, "avatar":1}):
        guide["_id"] = str(guide["_id"])
        out.append(guide)
    print(out)
    return jsonify(out)

# datetime.datetime(2012, 3, 23, 23, 24, 55, 173504)
# >>> datetime.datetime.today().weekday()

@app.get("/api/guides/<id>")
def get_single_guide(id):
    guide = mongo.db.guides.find_one({"_id": ObjectId(id)})
    print(JSONEncoder().encode(guide))
    return JSONEncoder().encode(guide)

@app.get("/api/bookings/<name>")
def get_bookings():
    bookings = mongo.db.bookings
    out = []
    if userType == 'traveller':
        for booking in bookings.find({"name": request.form.name}):
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
        for booking in bookings.find({"name": request.form.name}):
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

# @app.get("/api/messages/<conversation_ID>")
# def get_conversation():


    
#     conversations = mongo.db.conversations
#     return jsonify(conversations.find_one({"_id": request.form.id}))

@app.get("/api/conversations/guide/<id>")
def get_conversation_by_guide(id):
    conversations = []
    for conversation in mongo.db.conversations.find({"guide": id}, {"traveller":1}):
        conversation["traveller"] = mongo.db.travellers.find_one({"_id": ObjectId(conversation["traveller"])}, {"name":1, "avatar":1})
        conversation["_id"] = str(conversation["_id"])
        conversation["traveller"]["_id"] = str(conversation["traveller"]["_id"])
        conversations.append(conversation)

    return jsonify(conversations)

@app.get("/api/conversations/traveller/<id>")
def get_conversation_by_traveller(id):
    conversations = []
    for conversation in mongo.db.conversations.find({"traveller": id}, {"guide":1}):
        conversation["guide"] = mongo.db.guides.find_one({"_id": ObjectId(conversation["guide"])}, {"name":1, "avatar":1})
        conversation["_id"] = str(conversation["_id"])
        conversation["guide"]["_id"] = str(conversation["guide"]["_id"])
        conversations.append(conversation)

    return jsonify(conversations)

@app.get("/api/conversations/<id>/messages")
def get_messages_from_conversation(id):
    conversation = mongo.db.conversations.find_one({"_id": ObjectId(id)})
    conversation["_id"] = str(conversation["_id"])
    conversation["traveller"] = mongo.db.travellers.find_one({"_id": ObjectId(conversation["traveller"])}, {"name":1, "avatar":1})
    conversation["guide"] = mongo.db.guides.find_one({"_id": ObjectId(conversation["guide"])}, {"name":1, "avatar":1})
    
    return JSONEncoder().encode(conversation)

# msg = {
#     from: Blah,
#     text: Bloh
#     timestamp: 43234
# }
@app.post("/api/conversations/<id>/messages")
def add_message_to_conversation(id):
    message = request.json
    mongo.db.conversations.update_one({"_id": ObjectId(id)}, { "$push": {"messages": message}})
    return "Sent"
    

# vvv mock
# @app.get("/api/messages/<partner_id>")
# def get_conversation(partner_id):
#     out = []
#     for message in mongo.db.conversations.find({"traveller": partner_id}):
#         out.append(message)
#     print(out)
#     return jsonify(out)


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
        "status": request.form.confirmed,
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
        "status": request.form.confirmed,
        "conversation": ""
    })

# post new message
@app.post("/api/messages/<message_ID>")
def post_message():
    conversation = mongo.db.conversations.find_one({"_id": request.form.id})
    mongo.db.conversations[request.form.id]['messages'] ({
        "from": request.form.sender,
        "text": request.form.text,
        "timestamp": datetime.datetime.now().replace(microsecond=0)
    })

@socket.event
def connect():
    print('CONNECTED')

@socket.event
def disconnect():
    print('DISCONNECTED')

# chat message receiver
@socket.event
def chatMessage(payload):
    print('MESSAGE RECEIVED', payload)

if __name__ == '__main__':
    socket.run(app)


# NOTES
    # Authlib Setup
        # pip install Authlib Flask
        # from authlib.integrations.flask_client import OAuth
        # oauth = OAuth(app)
        # Make Login route
        # Make Authorize route
        # add oauth register
        # register on google for oauth
        # added 1 test email "test@test.com" on google. 
