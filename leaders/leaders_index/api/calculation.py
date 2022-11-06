import json
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, FileResponse
from django.http import HttpResponseBadRequest
import pandas
from leaders_index.utils import *


def analyse(request):
    body = json.loads(request.body)
    etalons = {i: pandas.DataFrame(body.get("etalon")[i]).loc[0] for i in body.get("etalon")}
    analogs = {i: pandas.DataFrame(body.get("analogs")[i]) for i in body.get("analogs")}
    pool = pandas.read_csv('leaders_index/rank_session/pool.csv')
    pool_dict = {str(i): pool[pool['rooms'] == i] for i in pool.rooms.unique()}
    ranked_objects_dict = rank_standart_objects(analogs, pool_dict, etalons)
    res = get_fully_ranked_pool(ranked_objects_dict)

    res = pandas.read_csv("/app/pool.csv")
    return JsonResponse(res.to_dict("records"), safe=False)

