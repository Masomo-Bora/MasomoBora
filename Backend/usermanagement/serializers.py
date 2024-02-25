# userManagement/serializers.py
from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Add this line for the password field

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'user_type', 'email', 'password')  # Include 'password' in the fields

    def create(self, validated_data):
        # Use create_user method from your CustomUser model to create a user with hashed password
        user = CustomUser.objects.create_user(**validated_data)
        return user
