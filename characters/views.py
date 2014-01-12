from django.shortcuts import render
from models import Character
from rest_framework import viewsets
from serializers import CharacterSerializer

# Create your views here.

class CharacterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows characters to be viewed or edited.
    """
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
