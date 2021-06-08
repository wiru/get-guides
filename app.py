from flask_cors import CORS
from threading import Lock
from authlib.integrations.flask_client import OAuth
from flask import Flask, url_for, redirect, jsonify, send_from_directory, render_template, session, request
import datetime
import stripe

stripe.api_key = 'sk_test_51IyBaBBjEZPN4gtmddzdTsU3OJD7t9iMSDKsSbMdLcbkvwERsA8oRtAKlJHWd9v8r3ZP9wqV9ntweO50qAiHxXFy00is0SZ7K4'

from flask_pymongo import PyMongo

from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect

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
app = Flask(__name__, static_folder="client/dist/spa", static_url_path="")


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
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
socket = SocketIO(app, cors_allowed_origins='*')
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
            'loggedIn': True,
            'userType': 'guide'
            }
    traveler = mongo.db.travellers.find_one({"gid": gid}, {'_id':1})
    if traveler:
        return {
            'path': 'Search',
            'id': str(traveler['_id']),
            'loggedIn': True,
            'userType': 'traveller'
            }
    return {
            'path': 'Registration',
            'loggedIn': False,
            'email': email,
            'name': name,
            'gid': gid,
            }

# AUTHLIB
@app.route("/auth")
def isLogged():
    print(session)
    if 'authObj' in session:
        return jsonify(session['authObj'])
    return ("", 204)

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
    print(user_info)

    #check user_info against data in database
    session["authObj"] = searchUser(
        user_info['id'],
        user_info['email'],
        user_info['name'])
    
    return redirect('/')

@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('/')


# Stripe integration
@app.post('/api/checkout-session')
def checkout():
    checkout_body = request.json
    print('not broken yet @ endpoint')
    stripeSession = stripe.checkout.Session.create(
        # success_url = os.environ['SUCCESS_URL'] or 'http://localhost:8000',
        # cancel_url = os.environ['CANCEL_URL'] or 'http://localhost:8000',
        success_url = os.environ['STRIPE_REDIRECT'],
        cancel_url = os.environ['STRIPE_REDIRECT'],
        payment_method_types = ['card'],
        # currency = checkout_body['currency'],
        line_items = [{
            'price_data': {
                'currency': checkout_body['currency'],
                'product_data': {
                    'name': 'Custom Tour',
                },
                'unit_amount': checkout_body['amount'],
            },
            'quantity': 1,
        }],
        mode = 'payment'
    )
    return jsonify(stripeSession["id"])

# Model of Stripe response:

# {
#   "id": "cs_test_DCqHZPdSM5iqHrpgEMylv9PXoh7U5qR5joW6EUYc838UArpV3Hm9A2Mn",
#   "object": "checkout.session",
#   "allow_promotion_codes": null,
#   "amount_subtotal": null,
#   "amount_total": null,
#   "billing_address_collection": null,
#   "cancel_url": "https://example.com/cancel",
#   "client_reference_id": null,
#   "currency": null,
#   "customer": null,
#   "customer_details": null,
#   "customer_email": null,
#   "livemode": false,
#   "locale": null,
#   "metadata": {},
#   "mode": "payment",
#   "payment_intent": "pi_1EUnBEF5IfL0eXz99dkRR60n",
#   "payment_method_options": {},
#   "payment_method_types": [
#     "card"
#   ],
#   "payment_status": "unpaid",
#   "setup_intent": null,
#   "shipping": null,
#   "shipping_address_collection": null,
#   "submit_type": null,
#   "subscription": null,
#   "success_url": "https://example.com/success",
#   "total_details": null
# }

# SOCKET.IO

@app.get("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/api/guides/search/<location>/<language>/<startdate>/<enddate>")
def get_guides(location, language, startdate, enddate):
    print("let's see if session persists")
    print(session)
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

# http://localhost:5000/api/bookings/guide/60b47b595c7aa6b557654a30

@app.get("/api/bookings/guide/<id>")
def get_bookings_as_guide(id):
    bookings = mongo.db.bookings
    out = []
    for booking in bookings.find({"guide": id}):
        out.append({
            "traveller": mongo.db.travellers.find_one({"_id": ObjectId(booking["traveller"])}, {"name":1, "avatar":1, "_id":0}),
            "location": booking['location'],
            "date": booking['date'],
            "start_time": booking['start_time'],
            "end_time": booking['end_time'],
            "meeting_location": booking['meeting_location'],
            "details": booking['details'],
            "price": booking['price'],
            "currency": booking['currency'],
            "status": booking['status'],
            "type": booking['type'],
            "conv_id": str(booking['conversation']['_id'])
            })
    return jsonify(out)

@app.get("/api/bookings/traveller/<id>")
def get_bookings_as_traveller(id):
    bookings = mongo.db.bookings
    out = []
    for booking in bookings.find({"traveller": id}):
        out.append({
            "guide": mongo.db.guides.find_one({"_id": ObjectId(booking["guide"])}, {"name":1, "avatar":1, "_id":0}),
            "location": booking['location'],
            "date": booking['date'],
            "start_time": booking['start_time'],
            "end_time": booking['end_time'],
            "meeting_location": booking['meeting_location'],
            "details": booking['details'],
            "price": booking['price'],
            "status": booking['status'],
            "currency": booking['currency'],
            "type": booking['type'],
            "conv_id": str(booking['conversation']['_id'])
            })
    return jsonify(out)

@app.post("/api/bookings")
def add_booking():
    booking_body = request.json
    conversation_body = {
        "traveller": booking_body["traveller"],
        "guide": booking_body["guide"],
        "messages": []
    }
    # make a conversation
    # if a conversation doesn't exist already
    new_conv_id = mongo.db.conversations.insert_one(conversation_body).inserted_id
    booking_body["conversation"] = mongo.db.conversations.find_one({"_id": ObjectId(new_conv_id)})
    mongo.db.bookings.insert_one(booking_body)
    return "ok"



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

@app.post("/api/conversations/<id>/messages")
def add_message_to_conversation(id):
    message = request.json
    mongo.db.conversations.update_one({"_id": ObjectId(id)}, { "$push": {"messages": message}})
    return "Sent"


# post new guide
@app.post("/api/guides/newguideregistration")
def add_guide():
    newguide = request.json
    mongo.db.guides.insert_one({
        'name': newguide['username'],
        'gid': newguide['gid'],
        "avatar": "https://randomuser.me/api/portraits/men/11.jpg",
        "gallery": [],
        "email": newguide['email'],
        "languages": newguide['language'],
        "bio": newguide['bio'],
        "weekdays": newguide['availabledays'],
        "locations": newguide['location'],
        "bookings": [],
        "rate": newguide['rate'],
        })
    return "ok"

# update existing guide
@app.post("/api/guides/update")
def update_guide():
    guideUpdate = request.json 
    mongo.db.guides.update_one({"_id": ObjectId(guideUpdate["id"])},  
    { "$set": {
        "avatar": "https://randomuser.me/api/portraits/men/11.jpg",
        "languages": guideUpdate['language'],
        "bio": guideUpdate['bio'],
        "weekdays": guideUpdate['availabledays'],
        "locations": guideUpdate['location'],
        "bookings": [],
        "rate": guideUpdate['rate'],
        }})
    return "ok"

# mongo.db.conversations.update_one({"_id": ObjectId(payload["conversationId"])}, { "$push": {"messages": message}})

# post new traveller
@app.post("/api/travellers/newtravellerregistration")
def add_traveller():
    newtraveller = request.json
    mongo.db.travellers.insert_one({
        'name': newtraveller['username'],
        'gid': newtraveller['gid'],
        "avatar": "https://randomuser.me/api/portraits/men/11.jpg",
        "email": newtraveller['email'],
        "bookings": [],
        })
    return "ok"


connectedSockets = {}

@socket.event
def connect():
    print('CONNECTED')
    print('this is the socket id ', request.sid)

@socket.event
def disconnect():
    print(request.sid)
    print('DISCONNECTED')

@socket.event
def matchSocketWithMongoId(payload):
    print("THIS IS THE MATCH FUNCTION")
    print("MONGOID", payload)
    print("REQUEST.SID", request.sid)
    connectedSockets[payload] = request.sid
    print("CONNECTED SOCKETS", connectedSockets)

# chat message receiver
@socket.event
def chatMessage(payload):
    print('CHAT EMIT ARRIVES')
    message = {"from": payload["from"], "text": payload["text"], "timestamp": payload["timestamp"]}
    mongo.db.conversations.update_one({"_id": ObjectId(payload["conversationId"])}, { "$push": {"messages": message}})
    for mongoId, socketId in connectedSockets.items():
        if mongoId == payload["to"]:
            print('CHAT IF STMENT PASSES')
            print('relayMessage: ', message, socketId)
            emit('relayMessage', message, room=socketId),
            return

@socket.event
def typingStatus(payload):
    print('TYPING STATUS CHANGE')
    for mongoId, socketId in connectedSockets.items():
        if mongoId == payload["to"]:
            print("THE IF STATEMENT IS FIRING")
            print('typing status: ', payload, socketId)
            emit('typingStatus', { 
                'status': payload["status"], 
                'from': payload["from"] 
                }, room=socketId),
            return # return here incase socket duplicated

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
