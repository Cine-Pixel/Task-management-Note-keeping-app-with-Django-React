from django.db.models import fields
from rest_framework import serializers
from .models import Todo, Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('__all__')
    

class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'content', 'completed', 'created_at']


class TodoDetailSerializer(serializers.ModelSerializer):
    notes = NoteSerializer(many=True)

    class Meta:
        model = Todo
        fields = ['id', 'title', 'content', 'completed', 'created_at', 'notes']
