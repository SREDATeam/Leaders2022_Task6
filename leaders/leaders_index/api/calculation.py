import json
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, FileResponse
from django.http import HttpResponseBadRequest
import pandas
from leaders_index.utils import *
import os
from os import walk
from leaders_index.models import Solution

save_path = "/app/leaders_index/rank_log_dir"


def analyse(request):
    global num
    body = json.loads(request.body)
    etalons = {i: pandas.DataFrame(body.get("etalon")[i]).loc[0] for i in body.get("etalon")}
    analogs = {i: pandas.DataFrame(body.get("analogs")[i]) for i in body.get("analogs")}
    pool = pandas.read_csv('/app/leaders_index/rank_session/pool.csv')
    pool['rooms'] = list(map(str, pool['rooms']))
    pool_dict = {i: pool[pool['rooms'] == i] for i in pool.rooms.unique()}
    ranked_objects_dict, analogs, ranked_etalons = rank_standart_objects(analogs, pool_dict, etalons)
    res = get_fully_ranked_pool(ranked_objects_dict)
    dir = os.listdir(save_path)

    # if len(dir) == 0:
    #     res.to_excel(f'{save_path}/res_0.xlsx')
    # else:
    #     f = []
    #     for (dirpath, dirnames, filenames) in walk(save_path):
    #         f.extend(filenames)
    #         break
    #     num = max(list(map(int, [i[1] for i in [list(map(lambda x: x.replace(".xlsx", ""), i.split('_'))) for i in f]])))
    #     res.to_excel(f'{save_path}/res_{num + 1}.xlsx')

    ranked_etalons = [i.to_dict() for i in ranked_etalons]
    solution = Solution.objects.create()
    res.to_excel(f'{save_path}/res_{solution.pk}.xlsx')
    solution.solution_path = f'{save_path}/res_{solution.pk}.xlsx'
    solution.address = ranked_etalons[0]["address"]
    solution.save()
    return JsonResponse({"pool": res.to_dict("records"), "analogs": [analogs[i].to_dict("records") for i in analogs], "ranked_etalons": ranked_etalons}, safe=False)
