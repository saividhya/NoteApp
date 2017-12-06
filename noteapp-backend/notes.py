from flask import Flask, request, session, abort, jsonify
import uuid
from models import *
from datetime import datetime
from event import generateEvent
import csv
import bson
import re
from mongoengine.queryset.visitor import Q


def postNote():
    if 'user' not in session:
        abort(403)
    if 'title' not in request.json or \
            'content' not in request.json or \
            'access' not in request.json or \
            'tags' not in request.json:
            abort(400)
    userEmail = session['user']['email']
    note = Note()
    note.id = uuid.uuid4()
    note.title = request.json['title']
    note.content = request.json['content']
    note.access = request.json['access']
    note.views = 1
    note.modified_date = datetime.now
    note.created_date = datetime.now
    note.author = userEmail
    note.contributors = [userEmail]
    note.tags = request.json['tags']
    note.likes = []
    note.pins = []
    generateEvent("new", {"noteId": note.id})
    note.save()
    return jsonify(note)

def getNote(noteId):
    if 'user' not in session:
        abort(403)
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note = note[0]
        #http://thegeorgeous.com/2015/02/02/Atomic-updates-in-monogodb-using-monogengine.html
        note.update(inc__views=1)
        generateEvent("view", {"noteId": note.id})
        return jsonify(note)
    else:
        abort(404)

def getNotes():
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    myNotes = None
    pinNotes = None
    result = dict()

    if request.args.get('tags') is not None:
        tags = request.args.get('tags').split(',')
        pinNotes = Note.objects(pins__in=[userEmail], tags__in=tags).order_by("-modified_date")
        myNotes = Note.objects(id__nin=pinNotes.all().values_list('id'), contributors__in=[userEmail], tags__in=tags).order_by("-modified_date")
    else:
        pinNotes = Note.objects(pins__in=[userEmail]).order_by("-modified_date")
        myNotes = Note.objects(id__nin=pinNotes.all().values_list('id'), contributors__in=[userEmail]).order_by("-modified_date")

    if len(pinNotes) <= 0:
        pinNotes = []
    if len(myNotes) <= 0:
        myNotes = []

    result['pinnedNotes'] = pinNotes
    result['myNotes'] = myNotes
    generateEvent("get")
    return jsonify(result)

def putNote(noteId):
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note = note[0]
        if 'title' in request.json:
            note.title = request.json['title']
            generateEvent("title", {"noteId": note.id})
        if 'content' in request.json:
            note.content = request.json['content']
            generateEvent("content", {"noteId": note.id})
        if 'access' in request.json:
            note.access = request.json['access']
            generateEvent("access", {"noteId": note.id})
        note.modified_date = datetime.now
        if 'contributors' in request.json:
            if checkUsers(request.json['contributors']) is False:
                abort(400, "contributors does not have real user emails")
            generateEvent("contributors", {"noteId": note.id})
            note.contributors = request.json['contributors']
        if 'tags' in request.json:
            generateEvent("tags", {"noteId": note.id})
            note.tags = request.json['tags']
        if 'likes' in request.json:
            if checkUsers(request.json['likes']) is False:
                abort(400, "likes does not have real user emails")
            generateEvent("like", {"noteId": note.id})
            note.likes = request.json['likes']
        if 'pins' in request.json:
            if checkUsers(request.json['pins']) is False:
                abort(400, "pins does not have real user emails")
            generateEvent("pin", {"noteId": note.id})
            note.pins = request.json['pins']
        note.save()
        return jsonify(note)
    else:
        abort(404)

def deleteNote(noteId):
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    note = Note.objects(id=noteId)
    if len(note) == 1:
        note = note[0]
        if str(note.author) != userEmail:
            abort(403)
        generateEvent("delete", {"noteId": note.id})
        note.delete()
    else:
        abort(404)
    return jsonify({})

def checkUsers(userList):
    numOfUsers = User.objects(email__in=userList).count()
    if numOfUsers != len(userList):
        return False
    return True

def getAuthors(tag):
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    p = [{'$match':{"tags":{"$in": [ tag ] } } }, {"$group":{"_id":{"author":"$author", "pins":"$pins"}, "viewscount":{"$sum":"$views"} } }, {"$project":{"viewscount":"$viewscount", "noofpins":{"$size":{"$ifNull":["$_id.pins", [] ] } } } }, {"$group":{"_id":{"author":"$_id.author"}, "views":{"$sum":"$viewscount"}, "pins":{"$sum":"$noofpins"} } }, {"$project":{"views" : "$views", "pins" : "$pins", "total" : { "$add" : [ "$views", "$pins" ] } } }, { "$sort"  : { "total" : -1 } } ]
    result = list(Note.objects.aggregate(*p))[1:4]
    authors = []
    totalcount = 0 
    for i in result:
        totalcount += i['total']
    for i in result:
        author = { "author" : i['_id']['author'] , "score" : round(float(float(i['total'])/totalcount)*100,2) }
        authors.append(author)
    return jsonify(authors)


def getTreeMap():
    if 'user' not in session:
        abort(403)
    userEmail = session['user']['email']
    tag_freqs = Note.objects(tags__nin= ["Cheatsheet"] ).item_frequencies('tags', normalize=True)
    
    tags = tag_freqs.keys()
    data = {"name" : "Popular Notes","children" : [ ] }
    
    c = 0
    for t in tags:

        data["children"].append({"name": t, "children" : []})
        baseNotes = Note.objects(Q(tags__in=[t]) & Q(tags__in=["Cheatsheet"]) & Q(author__nin= [userEmail] ) & Q(contributors__nin= [userEmail] ) & Q(pins__nin= [userEmail] ) & Q(pins__size__ne = 0 ) )
        nbaseNotes = Note.objects(Q(tags__in=[t]) & Q(tags__nin=["Cheatsheet"]) & Q(author__nin= [userEmail] ) & Q(contributors__nin= [userEmail] ) & Q(pins__nin= [userEmail] ) & Q(pins__size__ne = 0 ) )

        
        p = [{'$match': { "pins": {"$exists": "true", "$not": {"$size": 0 } }}},{"$group": {"_id": {"id": "$_id", "title": "$title", "content": "$content", "likes": "$likes", "tags" : "$tags", "pins" : "$pins"}, "count": {"$sum": 1} } }, {"$sort": {"count": -1 } }]
        Cheatsheets = list(baseNotes.aggregate(*p))
        
        
        p=[{'$match': { "pins": {"$exists": "true", "$not": {"$size": 0 } }}},{"$group": {"_id": {"id": "$_id", "title" : "$title", "content" : "$content", "likes" : "$likes", "tags" : "$tags", "pins" : "$pins"}, "count": {"$sum": 1} } }, {"$sort"  : { "count" : -1 } }]
        notes = list(nbaseNotes.aggregate(*p))

        
        data["children"][c]["children"].append({"name": "Cheatsheets", "children" : []})
        data["children"][c]["children"].append({"name": "Notes", "children" : []})
        
        for i in Cheatsheets:
            data["children"][c]["children"][0]["children"].append({"name" : i["_id"]["title"] , "value" : i["count"], "link" : "http://localhost:3000/notes/" + str(i["_id"]["id"]) })

        for i in notes:
            data["children"][c]["children"][1]["children"].append({"name" : i["_id"]["title"] , "value" : i["count"], "link" : "http://localhost:3000/notes/" + str(i["_id"]["id"]) })

        c=c+1

    return jsonify(data)
    