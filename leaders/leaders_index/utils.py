import requests
import time
import pandas as pd
from .choices import *
import geog
import shapely.geometry
import numpy as np
from yandex_geocoder import Client
from geopy.distance import geodesic
import json
from leaders.settings import DEBUG, SREDA_DOMAIN, API_STORAGE, \
    ADS_USER, ADS_TOKEN


YANDEX_TOKEN = 'd45640fd-f1ea-4f0c-87de-29dd559c9543'

DIR = 'coefs_dir'
area_corr = pd.read_csv(f'leaders_index/{DIR}/area_corr.csv', index_col='index')
balk_corr = pd.read_csv(f'leaders_index/{DIR}/balk_corr.csv', index_col='index')
floor_corr = pd.read_csv(f'leaders_index/{DIR}/floor_corr.csv', index_col='index')
kit_area_corr = pd.read_csv(f'leaders_index/{DIR}/kit_area_corr.csv', index_col='index')
metro_corr = pd.read_csv(f'leaders_index/{DIR}/metro_corr.csv', index_col='index')
rep_corr = pd.read_csv(f'leaders_index/{DIR}/rep_corr.csv', index_col='index')
metro_stations = pd.read_csv('leaders_index/geo_data/metro_coords.csv')


def get_ads(date1, city='Москва'):
    # date1 = datetime.strptime(date1, d_format)
    g_p = {'user': ADS_USER, 'token': ADS_TOKEN, 'city': city, 'date1': date1,
           'category_id': '2', 'nedvigimost_type': '1', 'source': '4', 'sort': 'asc', 'withcoords': '1',
           'params': '1957,2009'
           }
    res = requests.get('https://ads-api.ru/main/api', g_p).json()
    return res


def get_ads_data(mode='csv'):
    if mode == 'api':
        last_date = '2022-5-1'
        concated_df = pd.DataFrame()
        for i in range(1):
            res = get_ads(last_date)
            df, last_date = get_data_from_res(res)
            concated_df = pd.concat([concated_df, df])
            time.sleep(5)
        data = concated_df.groupby(['idk'], as_index=False).last()
        data = data.drop_duplicates(['idk', 'updated'], 'last', ignore_index=True)
        # data.to_csv('leaders_index/sreda_expert_data/ads_data.csv')
    else:
        data = pd.read_csv('leaders_index/sreda_expert_data/ads_data.csv').drop(columns=['Unnamed: 0'])
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

    n_points, d = 20, 1500
    p = shapely.geometry.Point(standart)
    angles = np.linspace(0, 360, n_points)
    polygon = shapely.geometry.Polygon(geog.propagate(p, angles, d))
    return polygon.contains(shapely.geometry.Point(float(row[0]), float(row[1])))


def obj_in_ao_check(ao_standart, row):
    with open('ao_parsed.json', encoding='utf-8') as file:
        js = json.load(file)
    get_json = js[ao_standart]
    polygon = shapely.geometry.Polygon(get_json[0])
    return polygon.contains(shapely.geometry.Point(float(row[0]), float(row[1])))


def obj_in_mo_check(mo_standart, row):
    with open('mo_parsed.json', encoding='utf-8') as file:
        js = json.load(file)
    get_json = js[mo_standart][1]
    polygon = shapely.geometry.Polygon(get_json[0])
    return polygon.contains(shapely.geometry.Point(float(row[0]), float(row[1])))


def get_filtered_by_zone_df(standart, df, filter_nuction):
    df['in_polygon'] = df.apply(lambda x: filter_nuction(standart, row=[x.lng, x.lat]), axis=1)
    ans_df = df[df.in_polygon]
    ans_df.index = range(ans_df.shape[0])
    return ans_df.drop(columns=['in_polygon'])


def return_floor_from_floors(row):
    if row[1] - row[0] == 0:
        return 3
    if row[0] == 1:
        return 1
    if (row[1] - row[0]) > 0:
        return 2


def get_pool_segmentation_and_standart_objs(data):
    data = prepare_to_rate_pool(data)
    rooms_pool_seg = data.rooms.unique()
    rooms_pool_seg_low_4 = [i for i in rooms_pool_seg if int(i) < 4]
    rooms_pool_seg_gt_4 = [i for i in rooms_pool_seg if int(i) >= 4]
    pool_dict_lw_4 = dict()
    for i in rooms_pool_seg_low_4:
        pool_dict_lw_4[i] = data[data['rooms'] == i]

    pool_dict_gt_4 = dict()
    for i in rooms_pool_seg_gt_4:
        pool_dict_gt_4[i] = data[data['rooms'] == i]

    standart_dict = dict()
    for i in pool_dict_lw_4:
        df = pool_dict_lw_4[i]
        df.index = range(len(df))
        df.sort_values(['floor_in_house', 'area', 'area_kitchen', 'balk'])
        stand_ind = len(df) // 2
        standart_el = df.iloc[stand_ind].copy()
        standart_dict[i] = standart_el
        pool_dict_lw_4[i] = df.drop(labels=[stand_ind], axis=0)
    dfs_dict = pool_dict_lw_4.copy()
    if len(rooms_pool_seg_gt_4) > 0:
        plus_4 = pd.DataFrame()
        for i in pool_dict_gt_4:
            plus_4 = pd.concat([pool_dict_gt_4[i], plus_4])
        standart_plus_4_ind = len(plus_4) // 2
        standart_plus_4 = plus_4.iloc[standart_plus_4_ind].copy()
        standart_dict['4+'] = standart_plus_4
        dfs_dict['4+'] = plus_4.drop(labels=[standart_plus_4], axis=0)
    return standart_dict, dfs_dict


def prepare_to_rate_pool(data):
    torg_corr = -4.5
    df = data.copy()
    df['floor_in_house'] = df['floors'] - df['floor']
    df['balk'] = 1
    df['floor_from_floors'] = df.apply(lambda x: return_floor_from_floors([x.floor, x.floors]), axis=1)
    df['main_corr'] = torg_corr
    #     df = df.drop(columns=['description', 'images', 'owner', 'is_rent', 'in_polygon'])
    return df


def prepare_raw_exl(data):
    client = Client(YANDEX_TOKEN)
    ren_cols = ['address', 'rooms', 'seg', 'floors', 'mat', 'floor', 'area', 'area_kitchen', 'balk', 'metro', 'repair']

    def rename_seg(row):
        if row == 'Новостройка' or row == 'новостройка':
            return 1
        if row == 'современное жилье' or row == 'Современное жилье':
            return 2
        if row == 'старый жилой фонд' or row == 'Старый жилой фонд':
            return 3
        return 0

    def rename_walls(row):
        if row == 'Кирпич' or row == 'кирпич':
            return 1
        if row == 'Панель' or row == 'панель':
            return 2
        if row == 'Монолит' or row == 'монолит':
            return 3
        return 0

    def rename_rep(row):
        if row == 'Без отделки' or row == 'без отделки':
            return 1
        if row == 'муниципальный ремонт' or row == 'Муниципальный ремонт':
            return 2
        if row == 'современная отделка' or row == 'Современная отделка':
            return 3
        return 0

    data = data.copy()
    data['Количество комнат'] = data['Количество комнат'].apply(lambda x: 0 if x == 'студия' or x == 'Студия' else x)
    data['Сегмент (Новостройка, современное жилье, старый жилой фонд)'] = data[
        'Сегмент (Новостройка, современное жилье, старый жилой фонд)'].apply(lambda x: rename_seg(x))
    data['Материал стен (Кипич, панель, монолит)'] = data['Материал стен (Кипич, панель, монолит)'].apply(
        lambda x: rename_walls(x))
    data['Наличие балкона/лоджии'] = data['Наличие балкона/лоджии'].apply(lambda x: 1 if x == 'Да' else 0)
    data['Состояние (без отделки, муниципальный ремонт, с современная отделка)'] = data[
        'Состояние (без отделки, муниципальный ремонт, с современная отделка)'].apply(lambda x: rename_rep(x))
    data.columns = ren_cols
    address_list = data['address'].tolist()
    lng_list, lat_list = [], []
    for i in address_list:
        try:
            lng, lat = client.coordinates(i)
        except:
            try:
                client = Client('478245df-abcf-414a-8105-22a09c0b54b6')
                lng, lat = client.coordinates(i)
            except:
                client = Client('67fcc2d7-58bb-4206-a881-8317d76b22b5')
                lng, lat = client.coordinates(i)
        lng_list.append(lng)
        lat_list.append(lat)
    data['lat'] = lat_list
    data['lng'] = lng_list
    return data


def rank_standart_object(data_compare, data_to_rank):
    #     print(data_compare)
    data_to_rank = data_to_rank.copy()
    data_compare['balk_coef'] = data_compare.apply(
        lambda x: get_balk_coef(data_to_rank, x, balk_corr), axis=1)
    data_compare.area_kitchen = data_compare.area_kitchen.astype(float)
    data_compare['kit_coef'] = data_compare.apply(
        lambda x: get_kit_area_coef(data_to_rank, x, kit_area_corr), axis=1)
    data_compare['floor_coef'] = data_compare.apply(
        lambda x: get_floor_coef(data_to_rank, x, floor_corr), axis=1)
    data_compare.area = data_compare.area.astype(float)
    data_compare['area_coef'] = data_compare.apply(
        lambda x: get_area_coef(data_to_rank, x, area_corr), axis=1)
    data_compare['metro_coef'] = data_compare.apply(
        lambda x: get_metro_coef(data_to_rank, x, area_corr), axis=1)
    data_compare['rep_coef'] = data_compare.apply(
        lambda x: get_rep_coef(data_to_rank, x, area_corr), axis=1)
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
    data_compare['new_per_meter'] = round(data_compare['new_per_meter'])
    data_compare['new_price'] = (data_compare['area'] * data_compare['new_per_meter'])
    data_compare['sum_coef'] = abs(data_compare['balk_coef']) + abs(
        data_compare['kit_coef']) + abs(data_compare['floor_coef']) + abs(
        data_compare['area_coef']) + abs(data_compare['metro_coef'])
    data_compare['to_weight_calculation'] = data_compare.apply(
        lambda x: get_weight_calculation(x.sum_coef), axis=1)
    data_compare['analog_w'] = data_compare['to_weight_calculation'] / data_compare['to_weight_calculation'].sum()
    data_compare['to_analog_rate'] = round(data_compare['analog_w'] * data_compare['new_per_meter'])
    data_compare['new_per_meter'] = round(data_compare['new_per_meter'])
    data_compare['new_price'] = (data_compare['area'] * data_compare['new_per_meter'])
    data_to_rank['per_meter'] = data_compare['to_analog_rate'].sum()
    data_to_rank['price'] = data_to_rank['per_meter'] * data_to_rank['area']
    return data_to_rank


def find_nearest_objects(standart, data):
    data = data[data['rooms'] == standart['rooms']]
    dataframe = pd.DataFrame()
    dataframe['idk'] = data['idk']
    dataframe['compare'] = 3 * (abs(standart['area_kitchen'] - data['area_kitchen'].astype(float))) + \
                           5 * (abs(standart['area'] - data['area'].astype(float))) + \
                           0.7 * (abs(abs(standart['floors'] - standart['floor']) - abs(
        data['floors'] - data['floor']).astype(float)))
    return dataframe.sort_values('compare').merge(data, how='inner', on='idk')


def prepare_compare_data(get_filter_nearest):
    torg_corr = -4.5
    # TODO seg and rep
    data_compare = get_filter_nearest.copy()
    data_compare['balk'] = 1
    data_compare['metro'] = data_compare.apply(lambda x: find_dist_from_nearest_metro(x, metro_stations), axis=1)
    data_compare['repair'] = 1
    data_compare['seg'] = 1
    data_compare['per_meter'] = round(data_compare['price'].astype(float) / data_compare['area'].astype(float))
    data_compare['main_corr'] = torg_corr
    data_compare = data_compare.drop(columns=['description', 'images', 'owner', 'is_rent'])
    data_compare['floor_from_floors'] = data_compare.apply(lambda x: return_floor_from_floors([x.floor, x.floors]),
                                                           axis=1)
    return data_compare


def get_compare_data(standart, ads_data):
    filtered_data = get_filtered_by_zone_df([standart.lng, standart.lat], ads_data, obj_in_circle_check)
    get_filter_nearest = find_nearest_objects(standart.to_dict(), filtered_data).head(10)
    compare_data = prepare_compare_data(get_filter_nearest)
    return compare_data


def get_balk_coef(standart, row, coef_table):
    if row['balk'] == standart['balk']:
        return coef_table.iloc[0, 0]
    elif row['balk'] > standart['balk']:
        return coef_table.iloc[1, 0]
    else:
        return coef_table.iloc[0, 1]


def get_area_coef(standart, row, coef_table):
    if row['area'] == standart['area']:
        return 0
    if standart['area'] <= 30:
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
    if standart['area'] > 30 and standart['area'] <= 50:
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
    if standart['area'] > 50 and standart['area'] <= 65:
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
    if standart['area'] > 65 and standart['area'] <= 90:
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
    if standart['area'] > 90 and standart['area'] <= 120:
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
    if standart['area'] > 120:
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
    if row['area_kitchen'] == standart['area_kitchen']:
        return 0
    if standart['area_kitchen'] <= 7:
        if row['area_kitchen'] > 7 and row['area_kitchen'] <= 10:
            return coef_table.iloc[0, 1]
        if row['area_kitchen'] > 10 and row['area_kitchen'] <= 15:
            return coef_table.iloc[0, 2]
    if standart['area_kitchen'] > 7 and standart['area_kitchen'] <= 10:
        if row['area_kitchen'] <= 7:
            return coef_table.iloc[1, 0]
        if row['area_kitchen'] > 10 and row['area_kitchen'] <= 15:
            return coef_table.iloc[1, 2]
    if standart['area_kitchen'] > 10 and standart['area_kitchen'] <= 15:
        if row['area_kitchen'] <= 7:
            return coef_table.iloc[2, 0]
        if row['area_kitchen'] > 7 and row['area_kitchen'] <= 10:
            return coef_table.iloc[2, 1]
    return 0


def get_weight_calculation(sum_coef):
    return 1 if sum_coef == 0 else 1 / sum_coef


def get_rep_coef(standart, row, coef_table):
    if row['repair'] == standart['repair']:
        return 0
    if standart['repair'] == 1:
        if row['repair'] == 2:
            return coef_table.iloc[0, 1]
        if row['repair'] == 3:
            return coef_table.iloc[0, 2]
    if standart['repair'] == 2:
        if row['repair'] == 1:
            return coef_table.iloc[1, 0]
        if row['repair'] == 3:
            return coef_table.iloc[1, 2]
    if standart['repair'] == 3:
        if row['repair'] == 1:
            return coef_table.iloc[2, 0]
        if row['repair'] == 2:
            return coef_table.iloc[2, 1]
    return 0


def get_floor_coef(standart, row, coef_table):
    if row['floor_from_floors'] == standart['floor_from_floors']:
        return 0
    if standart['floor_from_floors'] == 1:
        if row['floor_from_floors'] == 2:
            return coef_table.iloc[0, 1]
        if row['floor_from_floors'] == 3:
            return coef_table.iloc[0, 2]
    if standart['floor_from_floors'] == 2:
        if row['floor_from_floors'] == 1:
            return coef_table.iloc[1, 0]
        if row['floor_from_floors'] == 3:
            return coef_table.iloc[1, 2]
    if standart['floor_from_floors'] == 3:
        if row['floor_from_floors'] == 1:
            return coef_table.iloc[2, 0]
        if row['floor_from_floors'] == 2:
            return coef_table.iloc[2, 1]
    return 0


def get_metro_coef(standart, row, coef_table):
    if row['metro'] == standart['metro']:
        return 0
    if standart['metro'] <= 5:
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
    if standart['metro'] > 5 and standart['metro'] <= 10:
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
    if standart['metro'] > 10 and standart['metro'] <= 15:
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
    if standart['metro'] > 15 and standart['metro'] <= 30:
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
    if standart['metro'] > 30 and standart['metro'] <= 60:
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
    if standart['metro'] > 60 and standart['metro'] <= 90:
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


def find_dist_from_nearest_metro(obj, metro_stations):
    df = metro_stations.copy()
    df['dist_from_point'] = df.apply(lambda x: get_geo_dist_for_obj((obj.lat, obj.lng), (x.lat, x.lng)), axis=1)
    #     return df[df['dist_from_point'] == df.dist_from_point.min()]
    df = df.sort_values('dist_from_point').head(1)
    df.index = [0]
    return round((df.dist_from_point / 4) * 60)


def get_geo_dist_for_obj(obj, metro_station):
    return geodesic((obj[0], obj[1]), (metro_station[0], metro_station[1])).kilometers


def get_analogs(standart_dict):
    analogs_dict = dict()
    ads_data = get_ads_data('csv')
    for i in standart_dict:
        analogs_dict[i] = get_compare_data(standart_dict[i], ads_data)
    return analogs_dict


def get_analogs_pool_standart_objects(test_data):
    test_data = test_data.dropna()
    prepared_data = prepare_raw_exl(test_data)
    prepared_data.index = range(len(prepared_data))
    standart_dict, pool = get_pool_segmentation_and_standart_objs(prepared_data)
    analogs = get_analogs(standart_dict)
    for i in standart_dict:
        standart_dict[i]['lat'] = float(standart_dict[i]['lat'])
        standart_dict[i]['lng'] = float(standart_dict[i]['lng'])
    standart_dict
    return analogs, pool, standart_dict
    # на данном шаге отправляем на фронт analogs и standart_dict


# получаем аналоги и оцениваем эталонные квартиру
def rank_standart_objects(analogs, pool, standart_dict):
    ranked_objects = []
    for i in standart_dict:
        ranked_object = rank_standart_object(analogs[i], standart_dict[i])
        ranked_objects.append([ranked_object, pool[i]])
    return ranked_objects


# ranked_objects_dict
def rank_aparts_pool(standart, pool):
    ans = ['address', 'rooms', 'seg', 'floors', 'mat', 'floor', 'area', 'area_kitchen', 'balk', 'metro', 'repair',
           'price', 'per_meter']
    pool = pool.copy()
    pool['balk_coef'] = pool.apply(lambda x: get_balk_coef(standart, x, balk_corr), axis=1)
    pool.area_kitchen = pool.area_kitchen.astype(float)
    pool['kit_coef'] = pool.apply(lambda x: get_kit_area_coef(standart, x, kit_area_corr), axis=1)
    pool['floor_coef'] = pool.apply(lambda x: get_floor_coef(standart, x, floor_corr), axis=1)
    pool.area = pool.area.astype(float)
    pool['area_coef'] = pool.apply(lambda x: get_area_coef(standart, x, area_corr), axis=1)
    pool['metro_coef'] = pool.apply(lambda x: get_metro_coef(standart, x, metro_corr), axis=1)
    pool['rep_coef'] = pool.apply(lambda x: get_rep_coef(standart, x, rep_corr), axis=1)
    pool['per_meter'] = standart['per_meter']
    pool['per_meter'] = pool['per_meter'] + ((pool['balk_coef'] / 100) * pool['per_meter'])
    pool['per_meter'] = pool['per_meter'] + ((pool['kit_coef'] / 100) * pool['per_meter'])
    pool['per_meter'] = pool['per_meter'] + ((pool['floor_coef'] / 100) * pool['per_meter'])
    pool['per_meter'] = pool['per_meter'] + ((pool['area_coef'] / 100) * pool['per_meter'])
    pool['per_meter'] = pool['per_meter'] + ((pool['metro_coef'] / 100) * pool['per_meter'])
    pool['per_meter'] = pool['per_meter'] + pool['rep_coef']
    pool['price'] = pool['per_meter'] * pool['area']
    answer_pool = pool[ans]
    answer_standart = standart[ans]
    answer = pd.concat([answer_pool, answer_standart.to_frame().T])
    #     print(answer_standart.to_frame().T)
    return answer


# возвращение всего оцененного пула
def get_fully_ranked_pool(ranked_objects_dict):
    answer = pd.DataFrame()
    for i in ranked_objects_dict:
        pool = rank_aparts_pool(i[0], i[1])
        answer = pd.concat([answer, pool])
    answer['price'] = round(answer['price'].astype(float))
    answer['per_meter'] = round(answer['per_meter'].astype(float))
    answer.index = range(len(answer))
    return answer


def get_data_to_indexses(data, seg, rooms):
    data_index = data.copy()
    if seg == 'Новостройки':
        data_index = data_index[data_index.is_new == 1]
    elif seg == 'Вторичка':
        data_index = data_index[data_index.is_new == 0]
    if rooms == 'Весь рынок':
        return data_index
    elif rooms == 'Студия':
        return data_index[data_index.rooms == 0]
    elif rooms == '1К':
        return data_index[data_index.rooms == 1]
    elif rooms == '2К':
        return data_index[data_index.rooms == 2]
    elif rooms == '3К':
        return data_index[data_index.rooms == 3]
    elif rooms == '4К':
        return data_index[data_index.rooms == '4+']


def get_indexes(data):
    data_12_m = data.groupby(['year', 'month']).aggregate({'price_m': 'mean'}).tail(13)
    #     per_meter_gain = round(data_12_m.iloc[-2, -1] - data_12_m.iloc[-1, -1])
    data_12_m_price_arr = np.array(data_12_m.price_m)
    percent_arr = []
    for i in range(1, len(data_12_m_price_arr)):
        percent = round(100 * ((data_12_m_price_arr[i - 1] / data_12_m_price_arr[i]) - 1), 1)
        percent_arr.append(percent)
    return data_12_m_price_arr[:12], percent_arr


def index_all_data(seg, rooms):
    data = pd.read_csv('leaders_index/sreda_expert_data/Moscow2020-2021.csv')
    return get_indexes(get_data_to_indexses(data, seg, rooms))

# test_data = pd.read_excel('Пул_Новостройки_Тест.xlsx')
# analogs, pool, standart_dict = get_analogs_pool_standart_objects(test_data)
# ranked_objects_dict = rank_standart_objects(analogs, pool, standart_dict)
# f_ranked_pool = get_fully_ranked_pool(ranked_objects_dict)
