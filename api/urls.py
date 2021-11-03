from django.urls import path, re_path
from api.views import RoleList, RoleDetail, UserList, UserDetail, Login, UserRoleAssignment
from api.views import PermissionList, PermissionDetail


urlpatterns = [
    re_path(r'^roles/?$', RoleList.as_view(), name='role-list'),
    path('roles/<str:pk>/', RoleDetail.as_view(), name='role-detail'),

    re_path(r'^users/?$', UserList.as_view(), name='user-list'),
    path('users/<str:pk>/', UserDetail.as_view(), name='user-detail'),
    path(
        'users/<str:pk>/assign-role/', 
        UserRoleAssignment.as_view(), 
        name='user-role-assignment'),

    re_path(r'^permissions/?$', PermissionList.as_view(), name='permission-list'),
    path('permissions/<str:pk>/', PermissionDetail.as_view(), name='permission-detail'),

    re_path(r'^login/?$', Login.as_view(), name='login')
]