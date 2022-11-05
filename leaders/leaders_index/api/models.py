from datetime import datetime
from pydantic import BaseModel


class Flat(BaseModel):
    address: str
    area: float
    area_kitchen: float
    balk: int
    floor: int
    floor_from_floors: int
    floor_in_house: int
    floors: int
    lat: float
    lng: float
    main_corr: float
    mat: int
    metro: float
    repair: int
    rooms: int
    seg: int


class Analog(BaseModel):
    address: str
    analog_w: float
    area: float
    area_kitchen: float
    area_live: float
    balk: int
    area_coef: float
    balk_coef: float
    compare: float
    floor: int
    floor_coef: float
    floor_from_floors: int
    floors: int
    idk: str
    is_new: bool
    kit_coef: float
    lat: float
    lng: float
    main_corr: float
    metro: float
    metro_coef: float
    new_per_meter: int
    new_price: int
    per_meter: int
    price: int
    rep_coef: float
    repair: int
    rooms: int
    seg: int
    to_weight_calculation: float
    updated: datetime
    sum_coef: float
    to_analog_rate: float
