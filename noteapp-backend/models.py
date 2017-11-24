from flask_mongoengine import MongoEngine
from datetime import datetime

db = MongoEngine()

class User(db.Document):
    email = db.StringField()
    username = db.StringField()
    password = db.StringField()
    interests = db.ListField(db.StringField())

class Note(db.Document):
    id = db.UUIDField(primary_key=True, binary=False)
    title = db.StringField()
    content = db.StringField()
    access = db.StringField()
    views = db.IntField()
    modified_date = db.DateTimeField(default=datetime.now)
    created_date = db.DateTimeField(default=datetime.now)
    author = db.StringField()
    contributors = db.ListField(db.StringField())
    tags = db.ListField(db.StringField())
    #edits = fields.ListField(fields.EmbeddedDocumentField(ToolInput))
    likes = db.ListField(db.StringField())
    pins = db.ListField(db.StringField())

    meta = {'indexes': [
        {'fields': ['$title', "$content"],
         'default_language': 'english',
         'weights': {'title': 10, 'content': 4}
        }
    ]}

class Event(db.DynamicDocument):
    type = db.StringField()
    user = db.StringField()
    timeStamp = db.DateTimeField(default=datetime.now)