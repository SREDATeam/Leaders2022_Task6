from django.urls import path, include
from leaders_index.api import register
from leaders_index.api import excel_input
from leaders_index.api import calculation
from leaders_index.api import predict
from leaders_index.api import get_excel
from leaders_index.api import insert_koeff
from leaders_index.api import get_solutions_data


urlpatterns = [
    path('users', register.get_users),
    path('add_user', register.add_user),
    path('auth', register.auth),
    path('input/excel', excel_input.exel_input),
    path('calculate', calculation.analyse),
    path('predict', predict.make_predict),
    path('get_excel', get_excel.get_exel),
    path('update_coeff', insert_koeff.update_coeff),
    path('get_all_solutions_data', get_solutions_data.get_all_solutions_data)
]
