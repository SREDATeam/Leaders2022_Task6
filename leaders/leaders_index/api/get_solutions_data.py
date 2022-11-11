import json
from django.http import JsonResponse
from leaders_index.models import Solution


def get_all_solutions_data(request):
    all_data = list(Solution.objects.all().values())
    return JsonResponse(all_data, safe=False)
