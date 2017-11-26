from flask import Flask, request, session, abort, jsonify
import uuid
from models import *
from datetime import datetime
from event import generateEvent

def postNote():
    if 'user' not in session:
        abort(403)
    if 'title' not in request.json or \
            'content' not in request.json or \
            'access' not in request.json or \
            'tags' not in request.json:
            abort(400)
    userEmail = session['user']['email']
    note = Note()
    note.id = uuid.uuid4()
    note.title = request.json['title']
    note.content = request.json['content']
    note.access = request.json['access']
    note.views = 1
    note.modified_date = datetime.now
    note.created_date = datetime.now
    note.author = userEmail
    note.contributors = [userEmail]
    note.tags = request.json['tags']
    note.likes = []
    note.pins = []
    generateEvent("new", {"noteId": note.id})
    note.save()
    return jsonify(note)

def getNote(noteId):
    if 'user' not in session:
        abort(403)
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note = note[0]
        #http://thegeorgeous.com/2015/02/02/Atomic-updates-in-monogodb-using-monogengine.html
        note.update(inc__views=1)
        generateEvent("view", {"noteId": note.id})
        return jsonify(note)
    else:
        abort(404)

def getNotes():
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    myNotes = None
    pinNotes = None
    result = dict()

    if request.args.get('tags') is not None:
        tags = request.args.get('tags').split(',')
        pinNotes = Note.objects(pins__in=[userEmail], tags__in=tags).order_by("-modified_date")
        myNotes = Note.objects(id__nin=pinNotes.all().values_list('id'), contributors__in=[userEmail], tags__in=tags).order_by("-modified_date")
    else:
        pinNotes = Note.objects(pins__in=[userEmail]).order_by("-modified_date")
        myNotes = Note.objects(id__nin=pinNotes.all().values_list('id'), contributors__in=[userEmail]).order_by("-modified_date")

    if len(pinNotes) <= 0:
        pinNotes = []
    if len(myNotes) <= 0:
        myNotes = []

    result['pinnedNotes'] = pinNotes
    result['myNotes'] = myNotes
    generateEvent("get")
    return jsonify(result)

def putNote(noteId):
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note = note[0]
        if 'title' in request.json:
            note.title = request.json['title']
            generateEvent("title", {"noteId": note.id})
        if 'content' in request.json:
            note.content = request.json['content']
            generateEvent("content", {"noteId": note.id})
        if 'access' in request.json:
            note.access = request.json['access']
            generateEvent("access", {"noteId": note.id})
        note.modified_date = datetime.now
        if 'contributors' in request.json:
            if checkUsers(request.json['contributors']) is False:
                abort(400, "contributors does not have real user emails")
            generateEvent("contributors", {"noteId": note.id})
            note.contributors = request.json['contributors']
        if 'tags' in request.json:
            generateEvent("tags", {"noteId": note.id})
            note.tags = request.json['tags']
        if 'likes' in request.json:
            if checkUsers(request.json['likes']) is False:
                abort(400, "likes does not have real user emails")
            generateEvent("like", {"noteId": note.id})
            note.likes = request.json['likes']
        if 'pins' in request.json:
            if checkUsers(request.json['pins']) is False:
                abort(400, "pins does not have real user emails")
            generateEvent("pin", {"noteId": note.id})
            note.pins = request.json['pins']
        note.save()
        return jsonify(note)
    else:
        abort(404)

def deleteNote(noteId):
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note = note[0]
        if str(note.author) != userEmail:
            abort(403)
        generateEvent("delete", {"noteId": note.id})
        note.delete()
    else:
        abort(404)
    return jsonify({})

def checkUsers(userList):
    numOfUsers = User.objects(email__in=userList).count()
    if numOfUsers != len(userList):
        return False
    return True
