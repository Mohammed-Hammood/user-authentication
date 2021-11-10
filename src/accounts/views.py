from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
import json
context = {}


def home_view(request):
    if request.user.is_authenticated:
        user = User.objects.get(username=request.user.username)
        context['user'] = user
    return render(request, 'index.html', context)


def login_view(request):
    if request.method == 'GET':
        return render(request, 'login.html', context)

    username = json.loads(request.body)['username']
    password = json.loads(request.body)['password']
    user = authenticate(request, username=username, password=password)
    if user is not None and user.is_active:
        login(request, user)
        return HttpResponse("true")
    return HttpResponse("false")


def logout_view(request):
    logout(request)
    return redirect('/')

