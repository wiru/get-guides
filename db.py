import pymongo
import os

client = pymongo.MongoClient(os.environ.get("MONGO_URI"))

db = client[ "getguides" ]

travellers = db[ "travellers" ]
guides = db[ "guides" ]
bookings = db[ "bookings" ]
conversations = db[ "conversations" ]

travellers.insert_many([
  {
    "name": "Joann Torres",
    "avatar": "https://randomuser.me/api/portraits/women/87.jpg",
    "email": "joann.torres@example.com",
    "bookings": [],
  },
  {
    "name": "Kristin Johnson",
    "avatar": "https://randomuser.me/api/portraits/women/19.jpg",
    "email": "kristin.johnson@example.com",
    "bookings": [],
  },
])

guides.insert_many([
  {
    "name": "Noah Phillips",
    "avatar": "https://randomuser.me/api/portraits/men/57.jpg",
    "gallery": [],
    "email": "noah.phillips@example.com",
    "languages": [
      {
        "italian": 5,
        "arabic": 5,
        "english": 4,
      },
    ],
    "bio": "I love Japan and taking people around Tokyo.",
    "weekdays": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    "locations": ["tokyo", "nikko", "hakone", "yokohama"],
    "bookings": [],
    "rate": 0,
  },
  {
    "name": "Steve Mendoza",
    "avatar": "https://randomuser.me/api/portraits/men/43.jpg",
    "gallery": [],
    "email": "steve.mendoza@example.com",
    "languages": [
      {
        "english": 5,
      },
    ],
    "bio": "I know good places to go drink!",
    "weekdays": ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    "locations": ["tokyo"],
    "bookings": [],
    "rate": 0,
  },
])



bookings.insert_many([
  {
    "traveller": "joann.torres@example.com",
    "guide": "noah.phillips@example.com",
    "location": "",
    "date": "2021-08-21T15:00:00.000Z",
    "start_time": "",
    "end_time": "",
    "meeting_location": "",
    "details": "",
    "status": "confirmed",
    "conversation": "",
  },
  {
    "traveller": "kristin.johnson@example.com",
    "guide": "steve.mendoza@example.com",
    "location": "",
    "date": "2021-10-15T15:00:00.000Z",
    "start_time": "",
    "end_time": "",
    "meeting_location": "",
    "details": "",
    "status": "confirmed",
    "conversation": "",
  },
])

for booking in bookings.find():
    travellers.update_one({"email": booking["traveller"]}, { "$push": {"bookings": booking}})
    guides.update_one({"email": booking["guide"]}, { "$push": {"bookings": booking}})

conversations.insert_many([
  {
    "traveller": "joann.torres@example.com",
    "guide": "noah.phillips@example.com",
    "messages": [
      {
        "from": "joann.torres@example.com",
        "text": "hi",
        "timestamp": "1622427783218",
      },
      {
        "from": "noah.phillips@example.com",
        "text": "Hello! Nice to meet  .",
        "timestamp": "1622427819612",
      },
    ],
  },
  {
    "traveller": "kristin.johnson@example.com",
    "guide": "steve.mendoza@example.com",
    "messages": [
      {
        "from": "kristin.johnson@example.com",
        "text": "Hello, how is it going? My name is Kristin.",
        "timestamp": "1622427783218",
      },
      {
        "from": "steve.mendoza@example.com",
        "text": "Hello Kristin! Thank you for contacting me.",
        "timestamp": "1622427819612",
      },
    ],
  },
])

for conversation in conversations.find():
    bookings.update_one({"traveller": conversation["traveller"], "guide": conversation["guide"]}, { "$set": {"conversation": conversation}})