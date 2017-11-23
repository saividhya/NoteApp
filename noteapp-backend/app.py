from flask import Flask, request, session, abort, jsonify
from models import *
#from flaskext.csrf import csrf
import logging, uuid
from users import *
from search import *
from recommendation import *
from notes import *
from tags import *
from auth import *

app = Flask(__name__)
app.config.from_object('settings')
#csrf(app)
db.init_app(app)

### Notes endpoints
app.add_url_rule('/notes', None, getNotes, methods=["GET"])
# /notes
# /notes?tags=[tagNames...]
app.add_url_rule('/notes', None, postNote, methods=["POST"])
app.add_url_rule('/notes/<noteId>', None, getNote, methods=["GET"])
app.add_url_rule('/notes/<noteId>', None, putNote, methods=["PUT"])
app.add_url_rule('/notes/<noteId>', None, deleteNote, methods=["DELETE"])

### Auth endpoint
app.add_url_rule('/login', None, login, methods=["POST"])
app.add_url_rule('/login', None, logout, methods=["DELETE"])

### Users endpoints
app.add_url_rule('/users', None, postUser, methods=["POST"])
app.add_url_rule('/users/<userEmail>', None, getUser, methods=["GET"])
app.add_url_rule('/users/<userEmail>', None, putUser, methods=["PUT"])

### Recommend endpoint
app.add_url_rule('/recommend', None, recommendNotes, methods=["GET"])

### Category endpoint
app.add_url_rule('/tags', None, getTags, methods=["GET"])
# /tags?page=user
# /tags?page=general

### Search endpoint
app.add_url_rule('/search', None, searchNotes, methods=["GET"])

if __name__ == '__main__':
    app.debug = app.config['DEBUG']
    app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(debug=True)
