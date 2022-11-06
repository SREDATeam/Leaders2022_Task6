import json
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, FileResponse
from django.http import HttpResponseBadRequest
import pandas


def analyse(request):
    body = json.loads(request.body)
    etalons = body.get("etalon")
    analogs = body.get("etalon")

    # todo
    res = pandas.read_csv("/app/pool.csv")
    return JsonResponse(res.to_dict("records"), safe=False)

