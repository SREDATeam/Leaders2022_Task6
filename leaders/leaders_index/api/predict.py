import json
import pandas as pd
from django.http import JsonResponse
from leaders_index.transformer import *
import matplotlib
matplotlib.use('Agg')


def make_predict(request):
    body = json.loads(request.body)
    etalon = body.get("etalon")
    # print(etalon)
    pogodite_eto_realno_Moscow = pd.read_csv('leaders_index/sreda_expert_data/Moscow2020-2021.csv').drop(
        columns=['Unnamed: 0'])
    pogodite_eto_realno_Moscow['month'] = pd.DatetimeIndex(pogodite_eto_realno_Moscow.date).month
    pogodite_eto_realno_Moscow['year'] = pd.DatetimeIndex(pogodite_eto_realno_Moscow.date).year
    pogodite_eto_realno_Moscow['price'] = pogodite_eto_realno_Moscow['price'].astype(int)
    tft = TFT(pd.DataFrame(etalon, index=[0]).T[0], pogodite_eto_realno_Moscow)
    # tft.get_predictions(pogodite_eto_realno_Moscow)
    return JsonResponse(list(map(int, list(tft.predict[0]))), safe=False)
