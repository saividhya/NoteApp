from flask import Flask, request, session, abort, jsonify
from models import *
from event import generateEvent

def login():
    email = request.json['email']
    password = request.json['password']
    user = User.objects(email=email)
    if len(user) == 1 and user[0].password == password:
        session['user'] = user[0]
        generateEvent("login")
        return ('', 200)
    else:
        abort(403)

def logout():
    if 'user' not in session:
        abort(403)
    generateEvent("logout")
    del session['user']
    return ('', 200)
