from django.urls import path, include
from leaders_index.api import register
from leaders_index.api import excel_input
from leaders_index.api import calculation
urlpatterns = [
    path('users', register.get_users),
    path('add_user', register.add_user),
    path('auth', register.auth),

    path('input/excel', excel_input.exel_input),
    path('calculate', calculation.analyse)
]
