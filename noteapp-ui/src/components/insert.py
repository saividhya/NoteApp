 print "hi"
    with open('data2.csv') as csvDataFile:
        csvReader = csv.reader(csvDataFile)
        for row in csvReader:
            try:
                userEmail = "user_" + str(row[1]) + "@gmail.com"
                note = Note()
                note.id = uuid.uuid4()
                note.title = row[3]
                note.content = (str(row[4]))
                a = Note.objects(content=note.content)
                if len(a) > 0:
                    continue 
                if row[2] == "0":
                    note.access =  "private"
                else:
                    note.access =  "public"
                note.views = 1
                note.modified_date = datetime.now
                note.created_date = datetime.now
                note.author = userEmail
                note.contributors = [userEmail]
                note.tags = [x.strip() for x in row[5].split(',')]
                note.likes = []
                note.pins = []
                generateEvent("new", {"noteId": note.id})
                note.save()
            except:
                continue