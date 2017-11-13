from flask import Flask, request, session, abort, jsonify
from models import *

# TODO
def getCategories():
    if 'user' not in session:
        abort(403)
    userId = session['user']['_id']
    return jsonify({})