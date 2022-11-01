god_cols = ['idk', 'updated', 'price', 'price_m', 'is_rent', 'is_new', 'rooms', 'rooms_g', 'owner', 'area',
            'area_live', 'area_kitchen', 'floor', 'floors', 'lat', 'lng', 'address', 'region', 'city',
            'images', 'description']

ads_cols = ['price', 'time', 'person_type', 'address', 'coords', 'nedvigimost_type',
            'avitoid', 'source', 'params', 'images', 'description']

ren_cols = {'time': 'updated', 'person_type': 'owner', 'nedvigimost_type': 'is_rent', 'avitoid': 'idk'}

par_cols = {'Количество комнат': 'rooms', 'Площадь': 'area', 'Этаж': 'floor', 'Этажей в доме': 'floors',
            'Вид объекта': 'is_new', 'Жилая площадь': 'area_live', 'Площадь кухни': 'area_kitchen'}

ren_cols_rank = ['address', 'rooms', 'seg', 'floors', 'mat', 'floor', 'area', 'area_kitchen', 'balk', 'metro', 'repair']

seg_dict = {
    'Новостройка': 1,
    'современное жилье': 2,
    'старый жилой фонд': 3
}

mat_dict = {
    'Кипич': 1,
    'панель': 2,
    'монолит': 3
}

rep_dict = {
    'без отделки': 1,
    'муниципальный ремонт': 2,
    'с современная отделка': 3
}
