from django.urls import path
from .views import NoteDelete, NoteUpdate, TodoDelete, TodoList, TodoDetail, NoteList, TodoUpdate

app_name = 'base'

urlpatterns = [
    path('todos/', TodoList.as_view(), name='todo-list'),
    path('todos/<int:pk>', TodoDetail.as_view(), name='todo-detail'),
    path('todos/update/<int:pk>', TodoUpdate.as_view(), name='todo-update'),
    path('todos/delete/<int:pk>', TodoDelete.as_view(), name='todo-delete'),
    path('todos/<int:todo_pk>/notes/', NoteList.as_view(), name='note-list'),
    path('notes/update/<int:pk>', NoteUpdate.as_view(), name='note-update'),
    path('notes/delete/<int:pk>', NoteDelete.as_view(), name='note-delete'),
]
