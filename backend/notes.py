from flask import Flask, request, session, abort, jsonify
import uuid
from models import *
from datetime import datetime

def postNote():
    note = Note()
    note.id = uuid.uuid4()
    note.title = request.json['title']
    note.content = request.json['content']
    note.category = request.json['category']
    note.views = 1
    note.modified_date = datetime.now
    note.created_date = datetime.now
    note.contributors = request.json['contributors']
    note.tags = request.json['tags']
    note.likes = []
    note.save()
    return jsonify(note)

def getNote(noteId):
    note = Note.objects(id=noteId)
    if len(note) == 1:
        #http://thegeorgeous.com/2015/02/02/Atomic-updates-in-monogodb-using-monogengine.html
        note.update(inc__views=1)
        return jsonify(note)
    else:
        abort(404)

def getNotes():
    notes = Note.objects.all()
    if len(notes) > 0:
        return jsonify(notes)
    else:
        abort(404)

def putNote(noteId):
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
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note.delete()
    else:
        abort(404)
    return jsonify({})