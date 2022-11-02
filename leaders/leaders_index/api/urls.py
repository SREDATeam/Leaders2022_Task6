from django.urls import path, include
from leaders_index.api import register
from leaders_index.api import excel
urlpatterns = [
    path('users', register.get_users),
    path('add_user', register.add_user),
    path('auth', register.auth),
    path('excel_analysis', excel.analyse)
]
