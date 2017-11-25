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
    events = Event.objects.all()
    pipeline = [{'$match':{"type" : {"$in" : ["pin","view","like"] } } }, {"$group" : { "_id" : {"email": "$user", "note": "$noteId"}, "count": { "$sum": 1 } } } ] 
    result = list(Event.objects.aggregate(*pipeline))
    users = Event.objects.distinct("user")
    notes = Event.objects.distinct("noteId")
    data = np.zeros((len(users),len(notes)))
    for i in result:
        user = i["_id"]["email"]
        note = i["_id"]["note"]
        data[users.index(user)][notes.index(note)] = i["count"]
    user_similarity = pairwise_distances(data, metric='cosine')
    user_similarity = 1-user_similarity
    user_prediction = predict(data, user_similarity)
    prediction  = np.argsort(-user_prediction[users.index(userEmail)])
    result = [notes[i] for i in prediction]
    notes = []
    for i in result:
        try:
            a = Note.objects(id__=i,author__ne=userEmail,pins__not__contains=userEmail,contributors__not__contains=userEmail,access__ne="private")
            if len(a) > 0:
                notes.append(a)
        except:
            continue
    return jsonify(notes)