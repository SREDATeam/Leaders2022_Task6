import json
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden, FileResponse
from django.http import HttpResponseBadRequest
import pandas
from leaders_index.api.models import Flat, Analog


def exel_input(request):
    print("=" * 100)

    file = request.FILES.get("data")
    if not file:
        return HttpResponseBadRequest(content=json.dumps({"message": "no file"}))

    data = pandas.read_excel(file)


    # todo
    etalon = {"0": [{"address": "Москва, НАО (Новомосковский), Сосенское поселение, проспект Магеллана, 2", "rooms": 0, "seg": 0, "floors": 16.0, "mat": 3, "floor": 9.0, "area": 25.34, "area_kitchen": 7.1, "balk": 1, "metro": 15.0, "repair": 2, "lat": 55.591559, "lng": 37.44647, "floor_in_house": 7.0, "floor_from_floors": 2, "main_corr": -4.5}], "1": [{"address": "Москва, НАО (Новомосковский), Сосенское поселение, бул. Веласкеса, 2", "rooms": 1, "seg": 2, "floors": 13.0, "mat": 3, "floor": 5.0, "area": 35.3, "area_kitchen": 6.4, "balk": 1, "metro": 15.0, "repair": 2, "lat": 55.591538, "lng": 37.455714, "floor_in_house": 8.0, "floor_from_floors": 2, "main_corr": -4.5}], "2": [{"address": "Москва, НАО (Новомосковский), Сосенское поселение, бул. Веласкеса, 2", "rooms": 2, "seg": 0, "floors": 13.0, "mat": 3, "floor": 9.0, "area": 39.76, "area_kitchen": 6.2, "balk": 1, "metro": 15.0, "repair": 1, "lat": 55.591538, "lng": 37.455714, "floor_in_house": 4.0, "floor_from_floors": 2, "main_corr": -4.5}], "3": [{"address": "Москва, НАО (Новомосковский), Сосенское поселение, проспект Магеллана, 3", "rooms": 3, "seg": 2, "floors": 15.0, "mat": 1, "floor": 10.0, "area": 82.3, "area_kitchen": 16.2, "balk": 1, "metro": 15.0, "repair": 1, "lat": 55.590287, "lng": 37.445734, "floor_in_house": 5.0, "floor_from_floors": 2, "main_corr": -4.5}]}
    analogs = {"0": [{"idk": "ci-247982326", "compare": 6.5000000000000036, "updated": "2021-03-07 03:31:52", "price": 6313833, "is_new": 1, "rooms": 0, "area": 24.7, "area_live": 7.8, "area_kitchen": 7.5, "floor": 4, "floors": 14, "lat": 55.591142, "lng": 37.444274, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0418\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0435 \u041a\u0432\u0430\u0440\u0442\u0430\u043b\u044b 2 \u0416\u041a, ", "balk": 1, "metro": 17.0, "repair": 1, "seg": 1, "per_meter": 255621.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 0, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": -6, "new_per_meter": 258765.0, "new_price": 6391495.5, "sum_coef": 6.0, "to_weight_calculation": 0.16666666666666666, "analog_w": 0.23076923076923073, "to_analog_rate": 59715.0}, {"idk": "ci-249589906", "compare": 10.100000000000001, "updated": "2021-03-09 00:31:19", "price": 6766897, "is_new": 1, "rooms": 0, "area": 26.5, "area_live": 11.6, "area_kitchen": 6.6, "floor": 12, "floors": 15, "lat": 55.589919, "lng": 37.444125, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0418\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0435 \u041a\u0432\u0430\u0440\u0442\u0430\u043b\u044b 2 \u0416\u041a, ", "balk": 1, "metro": 14.0, "repair": 1, "seg": 1, "per_meter": 255355.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 3, "floor_coef": 0, "area_coef": 0, "metro_coef": 0, "rep_coef": -6, "new_per_meter": 251180.0, "new_price": 6656270.0, "sum_coef": 3.0, "to_weight_calculation": 0.3333333333333333, "analog_w": 0.46153846153846145, "to_analog_rate": 115929.0}, {"idk": "ci-247057387", "compare": 11.600000000000001, "updated": "2021-03-01 01:32:26", "price": 6235374, "is_new": 1, "rooms": 0, "area": 24.7, "area_live": 10.8, "area_kitchen": 4.3, "floor": 8, "floors": 15, "lat": 55.592128, "lng": 37.443729, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0418\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0435 \u041a\u0432\u0430\u0440\u0442\u0430\u043b\u044b 2 \u0416\u041a, ", "balk": 1, "metro": 18.0, "repair": 1, "seg": 1, "per_meter": 252444.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 3, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": -6, "new_per_meter": 263216.0, "new_price": 6501435.2, "sum_coef": 9.0, "to_weight_calculation": 0.1111111111111111, "analog_w": 0.15384615384615383, "to_analog_rate": 40495.0}, {"idk": "ci-247731995", "compare": 12.3, "updated": "2021-03-01 01:32:26", "price": 6202685, "is_new": 1, "rooms": 0, "area": 24.7, "area_live": 10.8, "area_kitchen": 4.3, "floor": 7, "floors": 15, "lat": 55.592128, "lng": 37.443729, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0418\u0441\u043f\u0430\u043d\u0441\u043a\u0438\u0435 \u041a\u0432\u0430\u0440\u0442\u0430\u043b\u044b 2 \u0416\u041a, ", "balk": 1, "metro": 18.0, "repair": 1, "seg": 1, "per_meter": 251121.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 3, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": -6, "new_per_meter": 261836.0, "new_price": 6467349.2, "sum_coef": 9.0, "to_weight_calculation": 0.1111111111111111, "analog_w": 0.15384615384615383, "to_analog_rate": 40282.0}], "1": [{"idk": "ci-252006645", "compare": 13.20000000000003, "updated": "2021-03-08 18:32:37", "price": 7800000, "is_new": 0, "rooms": 1, "area": 36.2, "area_live": 14.0, "area_kitchen": 9.3, "floor": 4, "floors": 12, "lat": 55.591803, "lng": 37.454825, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0431\u0443\u043b. \u0412\u0435\u043b\u0430\u0441\u043a\u0435\u0441\u0430, 1\u043a1", "balk": 1, "metro": 21.0, "repair": 1, "seg": 1, "per_meter": 215470.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": -2.9, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": -6, "new_per_meter": 211795.0, "new_price": 7666979.000000001, "sum_coef": 8.9, "to_weight_calculation": 0.11235955056179775, "analog_w": 0.27606177606177607, "to_analog_rate": 58469.0}, {"idk": "ci-252299672", "compare": 15.199999999999982, "updated": "2021-03-08 11:32:17", "price": 8200000, "is_new": 0, "rooms": 1, "area": 34.5, "area_live": 17.0, "area_kitchen": 9.2, "floor": 3, "floors": 15, "lat": 55.592637, "lng": 37.461122, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0431\u0443\u043b. \u0412\u0435\u043b\u0430\u0441\u043a\u0435\u0441\u0430, 8", "balk": 1, "metro": 26.0, "repair": 1, "seg": 1, "per_meter": 237681.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": -2.9, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": -6, "new_per_meter": 233627.0, "new_price": 8060131.5, "sum_coef": 8.9, "to_weight_calculation": 0.11235955056179775, "analog_w": 0.27606177606177607, "to_analog_rate": 64495.0}, {"idk": "ci-251349443", "compare": 16.599999999999977, "updated": "2021-03-08 17:32:06", "price": 7200000, "is_new": 0, "rooms": 1, "area": 33.1, "area_live": 15.0, "area_kitchen": 7.1, "floor": 3, "floors": 16, "lat": 55.591559, "lng": 37.44647, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u043f\u0440\u043e\u0441\u043f. \u041c\u0430\u0433\u0435\u043b\u043b\u0430\u043d\u0430, 2", "balk": 1, "metro": 18.0, "repair": 1, "seg": 1, "per_meter": 217523.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": -2.9, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": -6, "new_per_meter": 213813.0, "new_price": 7077210.300000001, "sum_coef": 8.9, "to_weight_calculation": 0.11235955056179775, "analog_w": 0.27606177606177607, "to_analog_rate": 59026.0}, {"idk": "ci-247054197", "compare": 17.899999999999984, "updated": "2021-03-01 21:34:13", "price": 8547739, "is_new": 1, "rooms": 1, "area": 35.0, "area_live": 15.2, "area_kitchen": 10.7, "floor": 13, "floors": 16, "lat": 55.591979, "lng": 37.428872, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u041f\u0440\u043e\u043a\u0448\u0438\u043d\u043e \u0416\u041a, ", "balk": 1, "metro": 22.0, "repair": 1, "seg": 1, "per_meter": 244221.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": -8.3, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": -6, "new_per_meter": 226705.0, "new_price": 7934675.0, "sum_coef": 14.3, "to_weight_calculation": 0.06993006993006992, "analog_w": 0.17181467181467178, "to_analog_rate": 38951.0}], "2": [{"idk": "ci-251463937", "compare": 7.800000000000025, "updated": "2021-03-03 08:33:45", "price": 7600000, "is_new": 1, "rooms": 2, "area": 40.2, "area_live": 22.9, "area_kitchen": 6.9, "floor": 9, "floors": 18, "lat": 55.593166, "lng": 37.431126, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0434. \u041f\u0440\u043e\u043a\u0448\u0438\u043d\u043e, ", "balk": 1, "metro": 23.0, "repair": 1, "seg": 1, "per_meter": 189055.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 0.0, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": 0, "new_per_meter": 191380.0, "new_price": 7693476.000000001, "sum_coef": 6.0, "to_weight_calculation": 0.16666666666666666, "analog_w": 0.27217125382262997, "to_analog_rate": 52088.0}, {"idk": "ci-250444373", "compare": 13.500000000000023, "updated": "2021-03-08 05:31:34", "price": 9400000, "is_new": 0, "rooms": 2, "area": 40.2, "area_live": 0.0, "area_kitchen": 9.5, "floor": 4, "floors": 6, "lat": 55.590923, "lng": 37.452911, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0443\u043b. \u0421\u0435\u0440\u0432\u0430\u043d\u0442\u0435\u0441\u0430, 3\u043a1", "balk": 1, "metro": 19.0, "repair": 1, "seg": 1, "per_meter": 233831.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": -2.9, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": 0, "new_per_meter": 229843.0, "new_price": 9239688.600000001, "sum_coef": 8.9, "to_weight_calculation": 0.11235955056179775, "analog_w": 0.1834862385321101, "to_analog_rate": 42173.0}, {"idk": "ci-250123363", "compare": 21.00000000000002, "updated": "2021-03-06 03:31:20", "price": 8200000, "is_new": 0, "rooms": 2, "area": 41.7, "area_live": 23.4, "area_kitchen": 6.7, "floor": 6, "floors": 24, "lat": 55.582009, "lng": 37.478289, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u043f\u043e\u0441. \u0413\u0430\u0437\u043e\u043f\u0440\u043e\u0432\u043e\u0434, 8", "balk": 1, "metro": 28.0, "repair": 1, "seg": 1, "per_meter": 196643.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 0.0, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": 0, "new_per_meter": 199062.0, "new_price": 8300885.4, "sum_coef": 6.0, "to_weight_calculation": 0.16666666666666666, "analog_w": 0.27217125382262997, "to_analog_rate": 54179.0}, {"idk": "ci-247054493", "compare": 36.2, "updated": "2021-03-01 21:33:51", "price": 9146888, "is_new": 1, "rooms": 2, "area": 38.4, "area_live": 12.8, "area_kitchen": 15.3, "floor": 11, "floors": 18, "lat": 55.591079, "lng": 37.429162, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u041f\u0440\u043e\u043a\u0448\u0438\u043d\u043e \u0416\u041a, ", "balk": 1, "metro": 21.0, "repair": 1, "seg": 1, "per_meter": 238200.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 0.0, "floor_coef": 0, "area_coef": 0, "metro_coef": 6, "rep_coef": 0, "new_per_meter": 241130.0, "new_price": 9259392.0, "sum_coef": 6.0, "to_weight_calculation": 0.16666666666666666, "analog_w": 0.27217125382262997, "to_analog_rate": 65629.0}], "3": [{"idk": "ci-250717583", "compare": 13.599999999999984, "updated": "2021-03-08 16:32:29", "price": 15800000, "is_new": 0, "rooms": 3, "area": 81.0, "area_live": 56.0, "area_kitchen": 15.0, "floor": 4, "floors": 4, "lat": 55.586217, "lng": 37.470105, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u043f\u043e\u0441. \u0413\u0430\u0437\u043e\u043f\u0440\u043e\u0432\u043e\u0434, \u0443\u043b. 1-\u044f \u041b\u0435\u0441\u043d\u044b\u0435 \u041f\u043e\u043b\u044f\u043d\u044b, 8\u043a9", "balk": 1, "metro": 27.0, "repair": 1, "seg": 1, "per_meter": 195062.0, "main_corr": -4.5, "floor_from_floors": 3, "balk_coef": 0.0, "kit_coef": 0, "floor_coef": 4.2, "area_coef": 0, "metro_coef": 6, "rep_coef": 0, "new_per_meter": 205755.0, "new_price": 16666155.0, "sum_coef": 10.2, "to_weight_calculation": 0.09803921568627452, "analog_w": 0.06227758007117438, "to_analog_rate": 12814.0}, {"idk": "ci-247056008", "compare": 23.40000000000002, "updated": "2021-03-01 20:33:36", "price": 14129139, "is_new": 1, "rooms": 3, "area": 83.0, "area_live": 37.2, "area_kitchen": 22.6, "floor": 10, "floors": 16, "lat": 55.589284, "lng": 37.443304, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0443\u043b. \u0413\u0430\u0443\u0434\u0438", "balk": 1, "metro": 13.0, "repair": 1, "seg": 1, "per_meter": 170231.0, "main_corr": -4.5, "floor_from_floors": 2, "balk_coef": 0.0, "kit_coef": 0, "floor_coef": 0.0, "area_coef": 0, "metro_coef": 0, "rep_coef": 0, "new_per_meter": 162571.0, "new_price": 13493393.0, "sum_coef": 0.0, "to_weight_calculation": 1.0, "analog_w": 0.6352313167259785, "to_analog_rate": 103270.0}, {"idk": "ci-247056086", "compare": 25.70000000000005, "updated": "2021-03-01 20:33:33", "price": 14431463, "is_new": 1, "rooms": 3, "area": 82.9, "area_live": 37.2, "area_kitchen": 22.6, "floor": 16, "floors": 16, "lat": 55.589284, "lng": 37.443304, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0443\u043b. \u0413\u0430\u0443\u0434\u0438", "balk": 1, "metro": 13.0, "repair": 1, "seg": 1, "per_meter": 174083.0, "main_corr": -4.5, "floor_from_floors": 3, "balk_coef": 0.0, "kit_coef": 0, "floor_coef": 4.2, "area_coef": 0, "metro_coef": 0, "rep_coef": 0, "new_per_meter": 173232.0, "new_price": 14360932.8, "sum_coef": 4.2, "to_weight_calculation": 0.23809523809523808, "analog_w": 0.15124555160142347, "to_analog_rate": 26201.0}, {"idk": "ci-247056234", "compare": 25.70000000000005, "updated": "2021-03-01 20:33:50", "price": 12990791, "is_new": 1, "rooms": 3, "area": 82.9, "area_live": 37.2, "area_kitchen": 22.6, "floor": 16, "floors": 16, "lat": 55.588812, "lng": 37.443473, "address": "\u0421\u043e\u0441\u0435\u043d\u0441\u043a\u043e\u0435 \u043f\u043e\u0441\u0435\u043b\u0435\u043d\u0438\u0435, \u0443\u043b. \u0413\u0430\u0443\u0434\u0438", "balk": 1, "metro": 13.0, "repair": 1, "seg": 1, "per_meter": 156704.0, "main_corr": -4.5, "floor_from_floors": 3, "balk_coef": 0.0, "kit_coef": 0, "floor_coef": 4.2, "area_coef": 0, "metro_coef": 0, "rep_coef": 0, "new_per_meter": 155938.0, "new_price": 12927260.200000001, "sum_coef": 4.2, "to_weight_calculation": 0.23809523809523808, "analog_w": 0.15124555160142347, "to_analog_rate": 23585.0}]}


    return JsonResponse({"etalon": {name: [json.loads(Flat(**etalon).json()) for etalon in value] for name, value in etalon.items()},
                         "analogs": {name: [json.loads(Analog(**analog).json()) for analog in value] for name, value in analogs.items()}},
                        safe=False)
