from flask import Flask, request, session, abort, jsonify
from models import *
from event import generateEvent

# TODO
def searchNotes():
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    if request.args.get('q') is None:
        abort(400)
    q = request.args.get('q')
    myNotes = Note.objects(contributors__in=[userEmail]).search_text(q).order_by('$text_score').all()
    publicNotes = Note.objects(access__exact="public", contributors__not__in=[userEmail]).search_text(q).order_by('$text_score').all()
    result = {}
    result['myNotes'] = myNotes
    result['publicNotes'] = publicNotes
    generateEvent("search", {"query": q})
    return jsonify(result)