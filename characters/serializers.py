from models import Character
from rest_framework import serializers

class CharacterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Character
        fields = ('id', 'name', 'hp')
