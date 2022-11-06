import json
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, FileResponse
from django.http import HttpResponseBadRequest
import pandas
from leaders_index.api.models import Flat, Analog


def get_exel(request):
    file_id = request.GET.get("id")
    if not file_id or not file_id.isnumeric():
        return HttpResponseBadRequest(content=json.dumps({"message": "no or invalid id"}))

    with open(f'leaders_index/rank_log_dir/res_{file_id}.xlsx', 'rb') as f:
        response = HttpResponse(FileResponse(f))

    return response
