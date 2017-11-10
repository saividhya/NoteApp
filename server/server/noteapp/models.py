# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from mongoengine import Document, EmbeddedDocument, fields

class Users(Document):
    username = fields.StringField(max_length=200,primary_key=True)
    email = fields.StringField(max_length=200)
    password = fields.StringField(max_length=200)
    tags = ListField(ReferenceField(Tag))
    notes = ListField(ReferenceField(Notes))
    def __str__(self):
        return self.username
    
class Tag(Document):
    tagname = fields.StringField(max_length=200,primary_key=True)

class Notes(Document):
	id = fields.StringField(primary_key=True)
    title = fields.StringField()
    content = fields.StringField()
    category = fields.StringField(max_length=200)
    views = fields.IntField()
    modified_date = fields.DateTimeField(null=True, blank=True)
    created_date = fields.DateTimeField(default=datetime.now, blank=True)
    contributors = ListField(ReferenceField(Users))
    tags = ListField(ReferenceField(Tag))
    #edits = fields.ListField(fields.EmbeddedDocumentField(ToolInput))
    likes = ListField(ReferenceField(Users))
