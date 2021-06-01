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


# AUTHLIB
@app.route('/login')
def login():
    google = oauth.create_client('google')
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

    # If authorized we this route takes us to app redirect
@app.route('/authorize')
def authorize():
    newPath = 'http://localhost:8080'
    google = oauth.create_client('google')
    token = google.authorize_access_token()
    resp = google.get('userinfo')
    resp.raise_for_status()
    user_info = resp.json()

    #check user_info against data in database

    # print(user_info)
    # session['email'] = user_info['email'] # This needs to be changed for security. We should take userinfo from above and query the database so we dont pass around googleinfo.
    socketio.emit('authSuccess', user_info)
    ## user_info == mongo.userID ? newPath = '/authorized' : newPath = '/registerSomethingnoclue'
    
    # do something with the token and profile
    return redirect(newPath)

# SOCKET.IO

@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# db.inventory.find( { qty: { $in: [ 5, 15 ] } } )


@app.get("/api/guides/search/<location>/<language>/<date>")
def get_guides(location, language, date):
    out = []
    for guide in mongo.db.guides.find({ "$and": [
        {"locations" : location},
        {"languages": language},
        { "unavailable_dates": { "$nin": [date] } }
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
    return JSONEncoder().encode(guide)

@app.get("/api/messages/<partner_id>")
def get_conversation(partner_id):
    out = []
    for message in mongo.db.conversations.find({"traveller": partner_id}):
        out.append(message)
    print(out)
    return jsonify(out)
    
@app.get("/api/bookings/<name>")
def get_bookings(name):
    bookings = mongo.db.bookings
    out = []
    if userType == 'traveller':
        for booking in bookings.find({"name": name}):
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
        for booking in bookings.find({"name": name}):
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

# post new guide
@app.post("/api/guides/<name>")
def add_guide(name):
    mongo.db.guides.insert_one({
        'name': request.form.name,
        "avatar": "https://randomuser.me/api/portraits/men/11.jpg",
        "gallery": [],
        "email": email,
        "languages": [language],
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


# @socketio.event
# def connect():
#     print('FUCKING! CONNECTED')

# @socketio.event
# def disconnect():
#     print('FUCKED OFF')

# @socketio.event
# def Message(data):
#     # print(data)

if __name__ == '__main__':
    socketio.run(app)


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
