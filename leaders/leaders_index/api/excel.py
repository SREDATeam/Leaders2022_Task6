import hashlib
import json
import os

from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden,FileResponse
from django.http import HttpResponseBadRequest
from leaders_index.models import User
import dotenv
import pandas


def analyse(request):
    print("=" * 100)

    file = request.FILES.get("data")
    if not file:
        return HttpResponseBadRequest(content=json.dumps({"message": "no file"}))

    data = pandas.read_excel(file)
    # todo

    writer = pandas.ExcelWriter('res.xlsx')
    data.to_excel(writer)
    writer.save()
    with open('res.xlsx', 'rb') as f:
        response = HttpResponse(FileResponse(file))
    os.remove('res.xlsx')
    return response
