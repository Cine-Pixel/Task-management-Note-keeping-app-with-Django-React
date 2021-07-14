from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    content = models.CharField(max_length=300, null=True, blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Note(models.Model):
    content = models.CharField(max_length=255, null=False, blank=False)
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return self.content
