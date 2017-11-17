from flask import Flask, request, session, abort, jsonify
import uuid
from models import *

def postUser():
    user = User()
    user.id = uuid.uuid4()
    user.username = request.json['username']
    user.email = request.json['email']
    user.password = request.json['password']
    user.interests = request.json['interests']
    alreadyExist = User.objects(email=user.email)
    if len(alreadyExist) > 0:
        abort(400)
    user.save()
    return jsonify(user)

def getUser(userId):
    if 'user' not in session:
        abort(403)
    user = User.objects(id=userId)
    if len(user) == 1:
        return jsonify(user)
    else:
        abort(404)

def putUser(userId):
    if 'user' not in session:
        abort(403)
    user = User.objects(id=userId)
    if len(user) == 1:
        user.interests = request.json['interests']
        user.save()
        return jsonify(user)
    else:
        abort(404)