import json
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, FileResponse
from django.http import HttpResponseBadRequest
import pandas
from leaders_index.utils import *
import os
from os import walk

save_path = "/app/leaders_index/rank_log_dir"


def analyse(request):
    global num
    body = json.loads(request.body)
    etalons = {i: pandas.DataFrame(body.get("etalon")[i]).loc[0] for i in body.get("etalon")}
    analogs = {i: pandas.DataFrame(body.get("analogs")[i]) for i in body.get("analogs")}
    pool = pandas.read_csv('/app/leaders_index/rank_session/pool.csv')
    pool_dict = {str(i): pool[pool['rooms'] == i] for i in pool.rooms.unique()}
    ranked_objects_dict = rank_standart_objects(analogs, pool_dict, etalons)
    res = get_fully_ranked_pool(ranked_objects_dict)
    dir = os.listdir(save_path)
    if len(dir) == 0:
        res.to_excel(f'{save_path}/res_1.xlsx')
    else:
        f = []
        for (dirpath, dirnames, filenames) in walk(save_path):
            f.extend(filenames)
            break
        num = int([list(map(lambda x: x.replace(".xlsx", ""), i.split('_'))) for i in f][-1][1])
        res.to_excel(f'{save_path}/res_{num + 1}.xlsx')
    return JsonResponse(res.to_dict("records"), safe=False)
