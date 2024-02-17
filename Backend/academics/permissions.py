# academics/permissions.py
from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == 'admin'
class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == 'student'

class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == 'lecturer'
