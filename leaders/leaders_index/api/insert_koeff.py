import json
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, FileResponse
from django.http import HttpResponseBadRequest
import pandas
import os

from leaders_index.api.models import Flat, Analog


def update_coeff(request):
    area_corr = request.FILES.get("area_corr")
    balk_corr = request.FILES.get("balk_corr")
    floor_corr = request.FILES.get("floor_corr")
    kit_area_corr = request.FILES.get("kit_area_corr")
    metro_corr = request.FILES.get("metro_corr")
    rep_corr = request.FILES.get("rep_corr")

    # todo
    path = ""

    if area_corr:
        with open(os.path.join(path, "area_corr.csv")) as f:
            f.write(area_corr)
    if balk_corr:
        with open(os.path.join(path, "balk_corr.csv")) as f:
            f.write(balk_corr)

    if floor_corr:
        with open(os.path.join(path, "floor_corr.csv")) as f:
            f.write(floor_corr)
    if kit_area_corr:
        with open(os.path.join(path, "kit_area_corr.csv")) as f:
            f.write(kit_area_corr)
    if metro_corr:
        with open(os.path.join(path, "metro_corr.csv")) as f:
            f.write(metro_corr)
    if rep_corr:
        with open(os.path.join(path, "rep_corr.csv")) as f:
            f.write(rep_corr)

    return HttpResponse()