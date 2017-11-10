from flask import Flask, request, session, abort, jsonify
from models import *

# TODO
def recommendNotes():
    notes = Note.objects.all()
    return jsonify(notes)