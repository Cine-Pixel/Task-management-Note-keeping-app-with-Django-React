from django.contrib import admin
from .models import Todo, Note

# Register your models here.
admin.site.register(Todo)
admin.site.register(Note)