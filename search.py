from flask import Flask, request, session, abort, jsonify
from models import *

# TODO
def searchNotes():
    if 'user' not in session:
        abort(403)
    notes = Note.objects.all()
    userId = session['user']['_id']
    return jsonify(notes)