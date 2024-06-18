# userManagement/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import CustomUser
from .serializers import CustomUserSerializer
import logging
from django.contrib.auth.hashers import make_password


logger = logging.getLogger(__name__)

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            # Allow creating a new user only if the requesting user is an admin
            if self.request.user.user_type == 'admin':
                return [AllowAny()]
            else:
                return [IsAuthenticated()]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password', None)  # Set password to None if not provided

        if not email:
            return Response({"detail": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not password:
            # Set the password to the username if it is not provided
            username = request.data.get('username')
            if username:
                password = username
            else:
                return Response({"detail": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)


        hashed_password = make_password(password)
        request.data['password'] = hashed_password

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        logger.info(f"User {serializer.validated_data['username']} created successfully by admin.")

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AllUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user  # Retrieve the logged-in user

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial', False)  # Check if partial update is allowed
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@method_decorator(csrf_exempt, name='dispatch')
class TokenObtainPairView(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            logger.info(f"User {username} logged in successfully.")
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user_id": user.id,
                    "username": user.username,
                    "user_type": user.user_type,
                },
                status=status.HTTP_200_OK,
            )
        else:
            logger.warning(f"Login attempt failed for user {username}.")
            return Response({"detail": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
