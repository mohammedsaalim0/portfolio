from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.index, name='index'),
    path('contact/submit/', views.contact_submit, name='contact_submit'),
    path('api/world-data/', views.api_world_data, name='api_world_data'),
]
