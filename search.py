from flask import Flask, request, session, abort, jsonify
from models import *

# TODO
def searchNotes():
    notes = Note.objects.all()
    return jsonify(notes)