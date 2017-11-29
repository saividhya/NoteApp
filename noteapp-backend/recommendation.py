from flask import Flask, request, session, abort, jsonify
from flask_mongoengine import MongoEngine
from models import *
import numpy as np
from sklearn.metrics.pairwise import pairwise_distances
from mongoengine.queryset.visitor import Q
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import json
import ast
import re

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
            a = Note.objects(id__=i,author__ne=userEmail,pins__nin=[userEmail],contributors__nin=[userEmail],access__="public")
            if len(a) > 0:
                notes.append(a[0])
        except:
            continue
    return jsonify(notes)


def contentRecommendNotes():
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    recentNotes = Note.objects(Q(author__ne=userEmail) & Q(contributors__nin=[userEmail]) & (Q(likes__in=[userEmail]) | Q(pins__in=[userEmail])) & Q(access__="public")).order_by("-modified_date").limit(10)
    notesToConsider = Note.objects(author__ne=userEmail,access__="public").to_json()
    jsonnotesToConsider = json.loads(notesToConsider)
    if jsonnotesToConsider is None or len(jsonnotesToConsider)<1:
        return jsonify([])
    ds = pd.DataFrame(list(jsonnotesToConsider))
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(ds['content'])
    cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)
    results = {}

    for idx, row in ds.iterrows():
        similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
        similar_items = [(cosine_similarities[idx][i], ds['_id'][i]) for i in similar_indices]
        results[row['_id']] = similar_items[1:]
    
    relevantNotes = []
    r = results.keys()
    for i in recentNotes:
        try:
            recs = results[unicode(str(i.id), "utf-8")][:5]
            for j in recs:
                n = Note.objects(id__=j[1])
                relevantNotes.append(n[0])
        except:
            continue
    return jsonify(relevantNotes[1:10])
