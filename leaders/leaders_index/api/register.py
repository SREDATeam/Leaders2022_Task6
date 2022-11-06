import hashlib
import json
import os

from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden
from django.http import HttpResponseBadRequest
from leaders_index.models import User
import dotenv

dotenv.load_dotenv()


def get_users(request):
    return JsonResponse([user for user in User.objects.values()], safe=False)


def add_user(request):
    body = json.loads(request.body)
    login = body.get("login")
    password = body.get("password")
    first_name = body.get("first_name")
    last_name = body.get("last_name")
    patronymic = body.get("patronymic")
    if not all([login, password, first_name, last_name, patronymic]):
        return HttpResponseBadRequest(content=json.dumps({"message": "missing field"}))
    password = hashlib.sha256((password + os.getenv("SALT")).encode()).hexdigest()
    user = User(login=login,
                password=password,
                first_name=first_name,
                last_name=last_name,
                patronymic=patronymic)
    try:
        user.save()
    except IntegrityError:
        return HttpResponseBadRequest(content=json.dumps({"message": "User already exists"}))
    return HttpResponse()


def auth(request):
    body = json.loads(request.body)
    login = body.get("login")
    password = body.get("password")
    if not login or not password:
        return HttpResponseBadRequest(content=json.dumps({"message": "no login or password"}))
    password = hashlib.sha256((password + os.getenv("SALT")).encode()).hexdigest()
    user = User.objects.get(login=login)
    if user.password != password:
        return HttpResponseForbidden(content=json.dumps({"message": "wrong password"}))
    return HttpResponse()
