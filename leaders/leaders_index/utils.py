import requests
import time
import pandas as pd
from .choices import *
import geog
import shapely.geometry
import numpy as np
from yandex_geocoder import Client
import json
import folium
from leaders.leaders.settings import DEBUG, SREDA_DOMAIN, API_STORAGE, \
    ADS_USER, ADS_TOKEN

DIR = 'coefs_dir/'
area_corr = pd.read_csv(f'{DIR}/area_corr.csv', index_col='index')
balk_corr = pd.read_csv(f'{DIR}/balk_corr.csv', index_col='index')
floor_corr = pd.read_csv(f'{DIR}/floor_coor.csv', index_col='index')
kit_area_corr = pd.read_csv(f'{DIR}/kit_area_corr.csv', index_col='index')
metro_corr = pd.read_csv(f'{DIR}/metro_corr.csv', index_col='index')
rep_corr = pd.read_csv(f'{DIR}/rep_corr.csv', index_col='index')


def get_ads(date1, city='Москва'):
    # date1 = datetime.strptime(date1, d_format)
    g_p = {'user': ADS_USER, 'token': ADS_TOKEN, 'city': city, 'date1': date1,
           'category_id': '2', 'nedvigimost_type': '1', 'source': '4', 'sort': 'asc', 'withcoords': '1'}
    res = requests.get('https://ads-api.ru/main/api', g_p).json()
    return res


def get_ads_data():
    last_date = '2022-7-1'
    concated_df = pd.DataFrame()
    for i in range(10):
        res = get_ads(last_date)
        df, last_date = get_data_from_res(res)
        concated_df = pd.concat([concated_df, df])
        time.sleep(5)
    data = concated_df.groupby(['idk'], as_index=False).last()
    data = data.drop_duplicates(['idk', 'updated'], 'last', ignore_index=True)
    return data


def get_data_from_res(res, cord_delta=1):
    lat_mean, lng_mean = [55.75, 37.62]
    df = pd.DataFrame.from_records(res['data'], columns=ads_cols).rename(columns=ren_cols)
    last_date = df.updated.iloc[-1]
    df.source = df.source.replace('cian.ru', 'ci')
    df.idk = df.source + '-' + df.idk.astype(int).astype(str)
    df[['lat', 'lng']] = df.coords.apply(pd.Series).astype(float).round(6)
    df = df[~((df.lat < lat_mean - cord_delta) | (df.lat > lat_mean + cord_delta) |
              (df.lng < lng_mean - cord_delta) | (df.lng > lng_mean + cord_delta))]
    df[['lat', 'lng']] = df[['lat', 'lng']].astype(str)
    new_params = df.params.apply(pd.Series).rename(columns=par_cols)
    for col in ['is_new', 'area_live', 'area_kitchen']:
        if col not in new_params.columns:
            new_params = new_params.assign(**{col: 0})
    df[list(par_cols.values())] = new_params[par_cols.values()]
    df = df.drop(columns=['params'])
    df = df[~df.rooms.isnull()]
    df.rooms = df.rooms.replace('Студия', 0).replace('> 9', 9).astype(int)
    df.is_rent = (df.is_rent == 'Сдам').astype(int)
    df.is_new = (df.is_new == 'Новостройка').astype(int)
    as_int = ['price', 'rooms', 'is_rent', 'is_new', 'floor', 'floors']
    df[as_int] = df[as_int].astype(int)
    as_float = ['area', 'area_live', 'area_kitchen']
    df[as_float] = df[as_float].round(1)
    df.area_live = df.area_live.fillna(0)
    df.area_kitchen = df.area_kitchen.fillna(0)
    tod_cols = god_cols.copy()
    for v in ['price_m', 'rooms_g', 'region', 'city']:
        tod_cols.remove(v)
    df = df[tod_cols]
    return df, last_date


def obj_in_circle_check(standart, row):
    #     print(standart, row)
    n_points, d = 20, 5000
    p = shapely.geometry.Point(standart)
    angles = np.linspace(0, 360, n_points)
    polygon = shapely.geometry.Polygon(geog.propagate(p, angles, d))
    return polygon.contains(shapely.geometry.Point(float(row[0]), float(row[1])))


def obj_in_ao_check(ao_standart, row):
    with open('geo_data/ao_parsed.json', encoding='utf-8') as file:
        js = json.load(file)
    get_json = js[ao_standart]
    polygon = shapely.geometry.Polygon(get_json[0])
    return polygon.contains(shapely.geometry.Point(float(row[0]), float(row[1])))


def obj_in_mo_check(mo_standart, row):
    with open('geo_data/mo_parsed.json', encoding='utf-8') as file:
        js = json.load(file)
    get_json = js[mo_standart][1]
    polygon = shapely.geometry.Polygon(get_json[0])
    return polygon.contains(shapely.geometry.Point(float(row[0]), float(row[1])))


def get_filtered_by_zone_df(standart, df, filter_nuction):
    df['in_polygon'] = df.apply(lambda x: filter_nuction(standart, row=[x.lng, x.lat]), axis=1)
    ans_df = df[df.in_polygon]
    ans_df.index = range(ans_df.shape[0])
    return ans_df.drop(columns=['in_polygon'])


def add_to_map(new_df, m):
    for i, j, z, k in zip(new_df.lat, new_df.lng, new_df.price, new_df.address):
        folium.Marker(
            [i, j], popup=f"<i>{z}   {k}</i>",
        ).add_to(m)
    return m


# def get_inpars(date1, polygon=None):
#     token = 'RswqInPUVZhuUyoF6iQCoSSJNO1yutZI'
#     data = {
#         'access-token': token,
#         'limit': '50',
#         'sourceId': '2',
#         'typeAd': '2',
#         'categoryId': '28,29,30,31,48',
#         'cityId': '1'
#     }
#
#     if polygon:
#         polygon_arr = []
#         for i in polygon:
#             polygon_arr.extend(i)
#         data['&polygon'] = ''.join(polygon_arr)
#
#     res = requests.get('https://inpars.ru/api/v2/estate?', data).json()
#     return res

def rank_standatrt_object(data_to_rank, data):
    api_k = '67fcc2d7-58bb-4206-a881-8317d76b22b5'
    client = Client(api_k)
    data_to_rank.columns = ren_cols
    data_to_rank['lng'], data_to_rank['lat'] = client.coordinates(data_to_rank['address'])
    filtered_data = get_filtered_by_zone_df([data_to_rank.lng, data_to_rank.lat], data, obj_in_circle_check)


def find_nearest_objects(standart, data):
    data = data[data['rooms'] == standart['rooms']]
    dataframe = pd.DataFrame()
    dataframe['idk'] = data['idk']
    dataframe['compare'] = 3 * (abs(standart['area_kitchen'] - data['area_kitchen'].astype(float))) + \
                           5 * (abs(standart['area'] - data['area'].astype(float))) + \
                           0.7 * (abs(abs(standart['floors'] - standart['floor']) - abs(
        data['floors'] - data['floor']).astype(float)))
    return dataframe.sort_values('compare').merge(data, how='inner', on='idk')


def prepare_data_to_rank(get_filter_nearest):
    torg_corr = -4.5
    data_compare = get_filter_nearest
    data_compare['balk'] = 1
    data_compare['metro'] = 10
    data_compare['repair'] = 1
    data_compare['seg'] = 1
    data_compare['per_meter'] = round(data_compare['price'].astype(float) / data_compare['area'].astype(float))
    data_compare['main_corr'] = torg_corr
    data_compare = data_compare.drop(columns=['description', 'images', 'owner', 'is_rent'])
    data_compare['floor_from_floors'] = data_compare.apply(lambda x: return_floor_from_floors([x.floor, x.floors]),
                                                           axis=1)


def rank_standart_object(data_compare):
    data_compare['new_per_meter'] = data_compare['per_meter'] + (
            (data_compare['main_corr'] / 100) * data_compare['per_meter'])
    data_compare['new_per_meter'] = data_compare['new_per_meter'] + (
            (data_compare['balk_coef'] / 100) * data_compare['per_meter'])
    data_compare['new_per_meter'] = data_compare['new_per_meter'] + (
            (data_compare['kit_coef'] / 100) * data_compare['new_per_meter'])
    data_compare['new_per_meter'] = data_compare['new_per_meter'] + (
            (data_compare['floor_coef'] / 100) * data_compare['new_per_meter'])
    data_compare['new_per_meter'] = data_compare['new_per_meter'] + (
            (data_compare['area_coef'] / 100) * data_compare['new_per_meter'])
    data_compare['new_per_meter'] = data_compare['new_per_meter'] + (
            (data_compare['metro_coef'] / 100) * data_compare['new_per_meter'])
    data_compare['new_per_meter'] = data_compare['new_per_meter'] + data_compare['rep_coef']
    data_compare['new_per_meter'] = round(data_compare['new_per_meter'])
    data_compare['new_price'] = (data_compare['area'] * data_compare['new_per_meter'])

def return_floor_from_floors(row):
    if row[1] - row[0] == 0:
        return 3
    if row[0] == 1:
        return 1
    if (row[1] - row[0]) > 0:
        return 2


def get_balk_coef(standart, row, coef_table):
    if row['balk'] == standart['balk'][0]:
        return coef_table.iloc[0, 0]
    elif row['balk'] > standart['balk'][0]:
        return coef_table.iloc[1, 0]
    else:
        return coef_table.iloc[0, 1]


def get_area_coef(standart, row, coef_table):
    if row['area'] == standart['area'][0]:
        return 0
    if standart['area'][0] <= 30:
        if row['area'] > 30 and row['area'] <= 50:
            return coef_table.iloc[0, 1]
        if row['area'] > 50 and row['area'] <= 65:
            return coef_table.iloc[0, 2]
        if row['area'] > 65 and row['area'] <= 90:
            return coef_table.iloc[0, 3]
        if row['area'] > 90 and row['area'] <= 120:
            return coef_table.iloc[0, 4]
        if row['area'] > 120:
            return coef_table.iloc[0, 5]
    if standart['area'][0] > 30 and standart['area'][0] <= 50:
        if row['area'] <= 30:
            return coef_table.iloc[1, 0]
        if row['area'] > 50 and row['area'] <= 65:
            return coef_table.iloc[1, 2]
        if row['area'] > 65 and row['area'] <= 90:
            return coef_table.iloc[1, 3]
        if row['area'] > 90 and row['area'] <= 120:
            return coef_table.iloc[1, 4]
        if row['area'] > 120:
            return coef_table.iloc[1, 5]
    if standart['area'][0] > 50 and standart['area'][0] <= 65:
        if row['area'] <= 30:
            return coef_table.iloc[2, 0]
        if row['area'] > 30 and row['area'] <= 50:
            return coef_table.iloc[2, 1]
        if row['area'] > 65 and row['area'] <= 90:
            return coef_table.iloc[2, 3]
        if row['area'] > 90 and row['area'] <= 120:
            return coef_table.iloc[2, 4]
        if row['area'] > 120:
            return coef_table.iloc[2, 5]
    if standart['area'][0] > 65 and standart['area'][0] <= 90:
        if row['area'] <= 30:
            return coef_table.iloc[3, 0]
        if row['area'] > 30 and row['area'] <= 50:
            return coef_table.iloc[3, 1]
        if row['area'] > 50 and row['area'] <= 65:
            return coef_table.iloc[3, 2]
        if row['area'] > 90 and row['area'] <= 120:
            return coef_table.iloc[3, 4]
        if row['area'] > 120:
            return coef_table.iloc[3, 5]
    if standart['area'][0] > 90 and standart['area'][0] <= 120:
        if row['area'] <= 30:
            return coef_table.iloc[4, 0]
        if row['area'] > 30 and row['area'] <= 50:
            return coef_table.iloc[4, 1]
        if row['area'] > 50 and row['area'] <= 65:
            return coef_table.iloc[4, 2]
        if row['area'] > 65 and row['area'] <= 90:
            return coef_table.iloc[4, 3]
        if row['area'] > 120:
            return coef_table.iloc[4, 5]
    if standart['area'][0] > 120:
        if row['area'] <= 30:
            return coef_table.iloc[5, 0]
        if row['area'] > 30 and row['area'] <= 50:
            return coef_table.iloc[5, 1]
        if row['area'] > 50 and row['area'] <= 65:
            return coef_table.iloc[5, 2]
        if row['area'] > 65 and row['area'] <= 90:
            return coef_table.iloc[5, 3]
        if row['area'] > 90 and row['area'] <= 120:
            return coef_table.iloc[5, 4]
    return 0


def get_kit_area_coef(standart, row, coef_table):
    if row['area_kitchen'] == standart['area_kitchen'][0]:
        return 0
    if standart['area_kitchen'][0] <= 7:
        if row['area_kitchen'] > 7 and row['area_kitchen'] <= 10:
            return coef_table.iloc[0, 1]
        if row['area_kitchen'] > 10 and row['area_kitchen'] <= 15:
            return coef_table.iloc[0, 2]
    if standart['area_kitchen'][0] > 7 and standart['area_kitchen'][0] <= 10:
        if row['area_kitchen'] <= 7:
            return coef_table.iloc[1, 0]
        if row['area_kitchen'] > 10 and row['area_kitchen'] <= 15:
            return coef_table.iloc[1, 2]
    if standart['area_kitchen'][0] > 10 and standart['area_kitchen'][0] <= 15:
        if row['area_kitchen'] <= 7:
            return coef_table.iloc[2, 0]
        if row['area_kitchen'] > 7 and row['area_kitchen'] <= 10:
            return coef_table.iloc[2, 1]
    return 0


def get_rep_coef(standart, row, coef_table):
    if row['repair'] == standart['repair'][0]:
        return 0
    if standart['repair'][0] == 1:
        if row['repair'] == 2:
            return coef_table.iloc[0, 1]
        if row['repair'] == 3:
            return coef_table.iloc[0, 2]
    if standart['repair'][0] == 2:
        if row['repair'] == 1:
            return coef_table.iloc[1, 0]
        if row['repair'] == 3:
            return coef_table.iloc[1, 2]
    if standart['repair'][0] == 3:
        if row['repair'] == 1:
            return coef_table.iloc[2, 0]
        if row['repair'] == 2:
            return coef_table.iloc[2, 1]
    return 0


def get_floor_coef(standart, row, coef_table):
    if row['floor_from_floors'] == standart['floor_from_floors'][0]:
        return 0
    if standart['floor_from_floors'][0] == 1:
        if row['floor_from_floors'] == 2:
            return coef_table.iloc[0, 1]
        if row['floor_from_floors'] == 3:
            return coef_table.iloc[0, 2]
    if standart['floor_from_floors'][0] == 2:
        if row['floor_from_floors'] == 1:
            return coef_table.iloc[1, 0]
        if row['floor_from_floors'] == 3:
            return coef_table.iloc[1, 2]
    if standart['floor_from_floors'][0] == 3:
        if row['floor_from_floors'] == 1:
            return coef_table.iloc[2, 0]
        if row['floor_from_floors'] == 2:
            return coef_table.iloc[2, 1]
    return 0


def get_metro_coef(standart, row, coef_table):
    if row['metro'] == standart['metro'][0]:
        return 0
    if standart['metro'][0] <= 5:
        if row['metro'] > 5 and row['metro'] <= 10:
            return coef_table.iloc[0, 1]
        if row['metro'] > 10 and row['metro'] <= 15:
            return coef_table.iloc[0, 2]
        if row['metro'] > 15 and row['metro'] <= 30:
            return coef_table.iloc[0, 3]
        if row['metro'] > 30 and row['metro'] <= 60:
            return coef_table.iloc[0, 4]
        if row['metro'] > 60 and row['metro'] <= 90:
            return coef_table.iloc[0, 5]
    if standart['metro'][0] > 5 and standart['metro'][0] <= 10:
        if row['metro'] <= 5:
            return coef_table.iloc[1, 0]
        if row['metro'] > 10 and row['metro'] <= 15:
            return coef_table.iloc[1, 2]
        if row['metro'] > 15 and row['metro'] <= 30:
            return coef_table.iloc[1, 3]
        if row['metro'] > 30 and row['metro'] <= 60:
            return coef_table.iloc[1, 4]
        if row['metro'] > 60 and row['metro'] <= 90:
            return coef_table.iloc[1, 5]
    if standart['metro'][0] > 10 and standart['metro'][0] <= 15:
        if row['metro'] <= 5:
            return coef_table.iloc[2, 0]
        if row['metro'] > 5 and row['metro'] <= 10:
            return coef_table.iloc[2, 1]
        if row['metro'] > 15 and row['metro'] <= 30:
            return coef_table.iloc[2, 3]
        if row['metro'] > 30 and row['metro'] <= 60:
            return coef_table.iloc[2, 4]
        if row['metro'] > 60 and row['metro'] <= 90:
            return coef_table.iloc[2, 5]
    if standart['metro'][0] > 15 and standart['metro'][0] <= 30:
        if row['metro'] <= 5:
            return coef_table.iloc[3, 0]
        if row['metro'] > 5 and row['metro'] <= 10:
            return coef_table.iloc[3, 1]
        if row['metro'] > 10 and row['metro'] <= 15:
            return coef_table.iloc[3, 2]
        if row['metro'] > 30 and row['metro'] <= 60:
            return coef_table.iloc[3, 4]
        if row['metro'] > 60 and row['metro'] <= 90:
            return coef_table.iloc[3, 5]
    if standart['metro'][0] > 30 and standart['metro'][0] <= 60:
        if row['metro'] <= 5:
            return coef_table.iloc[4, 0]
        if row['metro'] > 5 and row['metro'] <= 10:
            return coef_table.iloc[4, 1]
        if row['metro'] > 10 and row['metro'] <= 15:
            return coef_table.iloc[4, 2]
        if row['metro'] > 15 and row['metro'] <= 30:
            return coef_table.iloc[4, 3]
        if row['metro'] > 60 and row['metro'] <= 90:
            return coef_table.iloc[4, 5]
    if standart['metro'][0] > 60 and standart['metro'][0] <= 90:
        if row['metro'] <= 5:
            return coef_table.iloc[5, 0]
        if row['metro'] > 5 and row['metro'] <= 10:
            return coef_table.iloc[5, 1]
        if row['metro'] > 10 and row['metro'] <= 15:
            return coef_table.iloc[5, 2]
        if row['metro'] > 15 and row['metro'] <= 30:
            return coef_table.iloc[5, 3]
        if row['metro'] > 30 and row['metro'] <= 60:
            return coef_table.iloc[5, 4]
    return 0
