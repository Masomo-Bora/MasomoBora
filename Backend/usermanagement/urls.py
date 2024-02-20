# userManagement/urls.py
from django.urls import path
from .views import UserList, UserDetail, TokenObtainPairView,AllUserDetail
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('create_user/', UserList.as_view(), name='create-user'),
    path('user/<int:pk>/', AllUserDetail.as_view(), name='user'),
    path('users/detail/', UserDetail.as_view(), name='user-detail-current'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
