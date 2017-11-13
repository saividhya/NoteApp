from flask_mongoengine import MongoEngine
from datetime import datetime

db = MongoEngine()

class User(db.Document):
    id = db.UUIDField(primary_key=True, binary=False)
    username = db.StringField(max_length=200)
    email = db.StringField(max_length=200)
    password = db.StringField(max_length=200)
    interests = db.ListField(db.StringField(max_length=30))
    #notes = db.ListField(db.UUIDField(binary=False))

class Note(db.Document):
    id = db.UUIDField(primary_key=True, binary=False)
    title = db.StringField()
    content = db.StringField()
    category = db.StringField()
    views = db.IntField()
    modified_date = db.DateTimeField(default=datetime.now)
    created_date = db.DateTimeField(default=datetime.now)
    author = db.UUIDField(binary=False)
    contributors = db.ListField(db.UUIDField(binary=False))
    tags = db.ListField(db.StringField(max_length=30))
    #edits = fields.ListField(fields.EmbeddedDocumentField(ToolInput))
    likes = db.ListField(db.UUIDField(binary=False))

    meta = {'indexes': [
        {'fields': ['$title', "$content"],
         'default_language': 'english',
         'weights': {'title': 10, 'content': 4}
        }
    ]}
