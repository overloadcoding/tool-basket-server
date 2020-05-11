from django.urls import re_path

from . import views

urlpatterns = [
    re_path('code', views.get_ver_code, name='code'),
]
