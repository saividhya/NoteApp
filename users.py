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
    user.notes = []
    user.save()
    return jsonify(user)

def getUser(userId):
    user = User.objects(id=userId)
    if len(user) == 1:
        return jsonify(user)
    else:
        abort(404)

def putUser(userId):
    user = User.objects(id=userId)
    if len(user) == 1:
        user.interests = request.json['interests']
        user.notes = request.json['notes']
        user.save()
        return jsonify(user)
    else:
        abort(404)