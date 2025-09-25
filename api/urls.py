# api/urls.py
from django.urls import path
from .views import health ##1

from .views import health, summarize_news ##2



urlpatterns = [
    path('health/', health), ##1
    path('summarize/', summarize_news),##2
]
