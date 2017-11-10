from noteapp.models import Users,Tag,Notes
from rest_framework import serializers
from rest_framework_mongoengine.serializers import DocumentSerializer

class UsersSerializer(DocumentSerializer):
    username = serializers.CharField(read_only=False)
    class Meta:
        model = Users
        fields = '__all__'

class TagSerializer(DocumentSerializer):
    tagname = serializers.CharField(read_only=False)
    class Meta:
        model = Tag
        fields = '__all__'

class NotesSerializer(DocumentSerializer):
    id = serializers.CharField(read_only=False)
    contributors = UsersSerializer()
    class Meta:
        model = Notes
        fields = '__all__'