from flask import Flask, request, session, abort, jsonify
import uuid
from models import *
from datetime import datetime

def postNote():
    if 'user' not in session:
        abort(403)
    userId = session['user']['_id']
    note = Note()
    note.id = uuid.uuid4()
    note.title = request.json['title']
    note.content = request.json['content']
    note.category = request.json['category']
    note.views = 1
    note.modified_date = datetime.now
    note.created_date = datetime.now
    note.author = userId
    note.contributors = [userId]
    note.tags = request.json['tags']
    note.likes = []
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
    userId = session['user']['_id']
    notes = Note.objects(contributors__in=[userId])
    if len(notes) > 0:
        return jsonify(notes)
    else:
        abort(404)

def putNote(noteId):
    if 'user' not in session:
        abort(403)
    userId = session['user']['_id']
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note.title = request.json['title']
        note.content = request.json['content']
        note.category = request.json['category']
        note.modified_date = datetime.now
        note.contributors = request.json['contributors']
        note.tags = request.json['tags']
        note.likes = request.json['likes']
        note.save()
        return jsonify(note)
    else:
        abort(404)

def deleteNote(noteId):
    if 'user' not in session:
        abort(403)
    userId = session['user']['_id']
    note = Note.objects(id=noteId)
    if len(note) == 1:
        if str(note[0].author) != userId:
            abort(403)
        note.delete()
    else:
        abort(404)
    return jsonify({})