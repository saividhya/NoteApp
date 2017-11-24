from flask import Flask, request, session, abort, jsonify
from models import *
from datetime import datetime

def generateEvent(eventType, anyData={}):
    event = Event()
    event.user = session['user']['email']
    event.type = eventType
    event.timeStamp = datetime.now()
    for key, value in anyData.items():
        event[key] = str(value)
    event.save()

def postEvent():
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    event = Event()
    if 'type' not in request.json:
        abort(400)
    for key, value in request.json.items():
        event[key] = value
    event.user = userEmail

    event.save()
    return jsonify(event)

def getEvents():
    if 'user' not in session:
        abort(403)
    events = None

    if request.args.get('type') is not None:
        if request.args.get('user') is not None:
            events = Event.objects(type=request.args.get('type'), user=request.args.get('user')).order_by("-timeStamp")
        else:
            events = Event.objects(type=request.args.get('type')).order_by("-timeStamp")
    else:
        if request.args.get('user') is not None:
            events = Event.objects(user=request.args.get('user')).order_by("-timeStamp")
        else:
            events = Event.objects().order_by("-timeStamp")

    return jsonify(events)