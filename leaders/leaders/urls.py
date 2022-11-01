from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('adminochka/', admin.site.urls),
    path('api/', include('leaders_index.api.urls')),
]
