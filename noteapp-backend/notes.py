from flask import Flask, request, session, abort, jsonify
import uuid
from models import *
from datetime import datetime

def postNote():
    if 'user' not in session:
        abort(403)
    if 'title' not in request.json or \
            'content' not in request.json or \
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
    note.save()
    return jsonify(note)

def getNote(noteId):
    if 'user' not in session:
        abort(403)
    note = Note.objects(id=noteId)
    if len(note) == 1:
        #http://thegeorgeous.com/2015/02/02/Atomic-updates-in-monogodb-using-monogengine.html
        note.update(inc__views=1)
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
        pinNotes = Note.objects(access__exact="public", pins__in=[userEmail], tags__in=request.args.get('tags')).order_by("-modified_date")
        myNotes = Note.objects(id_not_in=pinNotes.all().values_list('id'), contributors__in=[userEmail], tags__in=request.args.get('tags')).order_by("-modified_date")
    else:
        pinNotes = Note.objects(access__exact="public", pins__in=[userEmail]).order_by("-modified_date")
        myNotes = Note.objects(id_not_in=pinNotes.all().values_list('id'), contributors__in=[userEmail]).order_by("-modified_date")

    if len(pinNotes) <= 0:
        myNotes = []
    if len(myNotes) <= 0:
        myNotes = []
    
    result['pinnedNotes'] = pinNotes
    result['myNotes'] = myNotes
    return jsonify(result)

def putNote(noteId):
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    note = Note.objects(id=noteId)
    if len(note) == 1:
        if 'title' in request.json: note.title = request.json['title']
        if 'content' in request.json: note.content = request.json['content']
        if 'access' in request.json: note.access = request.json['access']
        note.modified_date = datetime.now
        if 'contributors' in request.json: note.contributors = request.json['contributors']
        if 'tags' in request.json: note.tags = request.json['tags']
        if 'likes' in request.json: note.likes = request.json['likes']
        if 'pins' in request.json: note.pins = request.json['pins']
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
        if str(note[0].author) != userEmail:
            abort(403)
        note.delete()
    else:
        abort(404)
    return jsonify({})