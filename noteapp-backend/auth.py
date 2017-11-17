from flask import Flask, request, session, abort, jsonify
from models import *

def login():
    email = request.json['email']
    password = request.json['password']
    user = User.objects(email=email)
    if len(user) == 1 and user[0].password == password:
        session['user'] = user[0]
        return ('', 200)
    else:
        abort(403)

def logout():
    if 'user' not in session:
        abort(403)
    del session['user']
    return ('', 200)
