from rest_framework import serializers
from .models import StudentInfo
from django.contrib.auth.models import User

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentInfo
        fields='__all__'

class SignupSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()
    email=serializers.EmailField()

    def validate(request,data):
        if data['username']:
            if User.objects.filter(username=data['username']).exists():
                raise serializers.ValidationError("Username already exists")
        if data["password"]:
            if User.objects.filter(email=data["password"]).exists():
                raise serializers.ValidationError("Email already exists")
        return data

    def create(self, validated_data):
        user=User.objects.create(username=validated_data['username'],password=validated_data['username'])
        user.set_password(validated_data["password"])
        user.save()
        return validated_data

class LoginSerilaizer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()

