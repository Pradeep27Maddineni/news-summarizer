from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("summarize/", views.summarize_text, name="summarize"),
]
