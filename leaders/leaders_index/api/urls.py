from django.urls import path, include
from leaders_index.api import register

urlpatterns = [
    path('users', register.get_users),
    path('add_user', register.add_user),
    path('auth', register.auth)
]
