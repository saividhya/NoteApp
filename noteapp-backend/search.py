from flask import Flask, request, session, abort, jsonify
from models import *

# TODO
def searchNotes():
    if 'user' not in session:
        abort(403)
    userId = session['user']['_id']
    q = request.args.get('q')
    myNotes = Note.objects(contributors__in=[userId]).search_text(q).order_by('$text_score').all()
    publicNotes = Note.objects(category__exact="public").search_text(q).order_by('$text_score').all()
    result = {}
    result['myNotes'] = myNotes
    result['publicNotes'] = publicNotes
    return jsonify(result)