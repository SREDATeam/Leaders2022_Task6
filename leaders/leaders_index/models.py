from django.db import models


class User(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)
    login = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    patronymic = models.CharField(max_length=255)

    class Meta:
        db_table = "user"
