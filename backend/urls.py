from django.contrib import admin
from django.urls import path
from . import views 
from .views import LoginApi,SignupApi,LogoutApi,StudentsApi,StudentDetailApi

urlpatterns = [
    path('students/',StudentsApi.as_view(),name='students'),
    path('students/<int:pk>/',StudentDetailApi.as_view(),name='students'),
    path('login/',LoginApi.as_view(),name="login"),
    path('logout/',LogoutApi.as_view(),name='logout'),
    path('signup/',SignupApi.as_view(),name='signup')
]
