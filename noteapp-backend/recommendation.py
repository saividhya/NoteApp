from flask import Flask, request, session, abort, jsonify
from flask_mongoengine import MongoEngine
from models import *
import numpy as np
from sklearn.metrics.pairwise import pairwise_distances

db = MongoEngine()

def predict(ratings, similarity):
    mean_user_rating = ratings.mean(axis=1)
    ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
    pred = mean_user_rating[:, np.newaxis] + similarity.dot(ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    return pred

# TODO
def recommendNotes():
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    events = Events.objects.all()
    pipeline = [{'$match':{"event" : {"$in" : ["pin","view","like"] } } }, {"$group" : { "_id" : {"email": "$email", "note": "$note"}, "count": { "$sum": 1 } } } ] 
    result = list(Events.objects.aggregate(*pipeline))
    users = Events.objects.distinct("email")
    notes = Events.objects.distinct("note")
    data = np.zeros((len(users),len(notes)))
    for i in result:
        user = i["_id"]["email"]
        note = i["_id"]["note"]
        data[users.index(user)][notes.index(note)] = i["count"]
    user_similarity = pairwise_distances(data, metric='cosine')
    user_prediction = predict(data, user_similarity)
    prediction  = np.argsort(-user_prediction[users.index(userEmail)])
    result = [notes[i] for i in prediction]
    return jsonify(result)