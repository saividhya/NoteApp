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
from event import *
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('settings')
#csrf(app)
app.config['CORS_HEADERS']=['Content-Type','accept','accept-encoding','authorization','content-type',
'dnt','origin','user-agent','x-csrftoken','x-requested-with','Access-Control-Allow-Origin']
CORS(app, supports_credentials=True)
db.init_app(app)

@app.before_request
def option_autoreply():
    """ Always reply 200 on OPTIONS request """

    if request.method == 'OPTIONS':
        resp = app.make_default_options_response()
        return resp





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

app.add_url_rule('/contentrecommend', None, contentRecommendNotes, methods=["GET"])

### Category endpoint
app.add_url_rule('/tags', None, getTags, methods=["GET"])
# /tags?page=user
# /tags?page=general

### Search endpoint
app.add_url_rule('/search', None, searchNotes, methods=["GET"])

### Event endpoint
app.add_url_rule('/events', None, postEvent, methods=["POST"])
app.add_url_rule('/events', None, getEvents, methods=["GET"])

app.add_url_rule('/authors/<tag>', None, getAuthors, methods=["GET"])

if __name__ == '__main__':
    app.debug = app.config['DEBUG']
    app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(debug=True)
