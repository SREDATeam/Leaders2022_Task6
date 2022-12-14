from django.db import models


class User(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)
    login = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255, default="")
    last_name = models.CharField(max_length=255, default="")
    patronymic = models.CharField(max_length=255, default="")

    class Meta:
        db_table = "user"


class Solution(models.Model):
    solution_path = models.CharField(max_length=255, default="")
    address = models.CharField(max_length=255, default="")
    date = models.DateTimeField(auto_now=True)
