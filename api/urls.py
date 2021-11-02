from django.urls import path, re_path
from api.views import RoleList, RoleDetail
from api.views import PermissionList, PermissionDetail


urlpatterns = [
    re_path(r'^roles/?$', RoleList.as_view(), name='role-list'),
    path('roles/<str:pk>/', RoleDetail.as_view(), name='role-detail'),

    re_path(r'^permissions/?$', PermissionList.as_view(), name='permission-list'),
    path('permissions/<str:pk>/', PermissionDetail.as_view(), name='permission-detail')
]