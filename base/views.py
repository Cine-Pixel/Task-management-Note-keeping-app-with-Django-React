from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import TodoListSerializer, TodoDetailSerializer, NoteSerializer
from .models import Todo, Note


class TodoList(APIView):
    def get(self, request, format=None) -> Response:
        todos = Todo.objects.all().order_by('-created_at')
        serializer = TodoListSerializer(todos, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None) -> Response:
        serializer = TodoListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TodoDetail(RetrieveAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoDetailSerializer


class TodoUpdate(UpdateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoListSerializer
    lookup_field = 'pk'
    lookup_url_kwarg = 'pk'


class TodoDelete(DestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoListSerializer 
    lookup_field = 'pk'


class NoteList(APIView):
    def get(self, request, todo_pk, format=None) -> Response:
        notes = Note.objects.filter(todo=todo_pk)
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    def post(self, request, todo_pk, format=None) -> Response:
        note = request.data
        note['todo'] = todo_pk
        serializer = NoteSerializer(data=note)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NoteUpdate(UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'pk'


class NoteDelete(DestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'pk'
