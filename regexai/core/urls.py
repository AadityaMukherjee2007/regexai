from django.urls import path

from . import views

from django.views.generic import TemplateView
path("robots.txt", TemplateView.as_view(template_name="robots.txt", content_type="text/plain"))

urlpatterns = [
    path("", views.index, name="index"),
    path("generate/", views.generate_regex, name="generate"),
    path("support/", views.support, name="support")
]