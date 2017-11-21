from flask import Flask, request, session, abort, jsonify
from models import *

# TODO
def getCategories():
    if 'user' not in session:
        abort(403)
    userId = session['user']['_id']
    tag_freqs = Note.objects.item_frequencies('tags', normalize=True)
    #notes = Note.objects(contributors__in=[userId])
    # [
    #     {
    #         "name": "asdg",
    #         "termFrequency": 0.25
    #     }
    # ]
    return jsonify(tag_freqs)
