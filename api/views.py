from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import exceptions

from api.models import Permission, Role, User
from api.serializers import PermissionSerializer, UserSerializer, RoleSerializer
from api.utils import success_, error_


class DetailViewMixin:
    serializer_class = None
    model = None

    def get_object(self, pk):
        """
        Helper method for retrieving saved objects
        """
        try:
            instance = self.model.objects.get(pk=pk)
        except self.model.DoesNotExist:
            raise exceptions.NotFound('not found')
        except ValidationError:
            raise exceptions.ParseError('invalid primary key')
        else:
            return instance

    def get(self, request, pk):
        obj = self.get_object(pk)
        serializer = self.serializer_class(obj)
        response = success_(f'{self.model.__name__} retrieved', data=serializer.data)
        return Response(response, status.HTTP_200_OK)


class PermissionList(APIView):
    """
    Handler for requests on the url '/api/permissions/'
    For a POST request, a new permission is created
    For a GET request, returns a list of all permissions 
    """

    def post(self, request):
        serializer = PermissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            resp = success_('permission successfully created', data=serializer.data)
            return Response(resp, status=status.HTTP_201_CREATED)
        else:
            resp = error_('an error occurred', data=serializer.errors)
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

    
    def get(self, request):
        permissions = Permission.objects.all()
        serializer = PermissionSerializer(permissions, many=True)
        resp = success_('retrieved all permissions', data=serializer.data)
        return Response(resp, status=status.HTTP_200_OK)

    
class PermissionDetail(APIView, DetailViewMixin):
    serializer_class = PermissionSerializer
    model = Permission


class RoleList(APIView):
    """
    Handler for requests on the url '/api/roles/'
    For a POST request, a new role is created
    For a GET request, returns a list of all roles 
    """

    def post(self, request):
        serializer = RoleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            resp = success_('role successfully created', data=serializer.data)
            return Response(resp, status=status.HTTP_201_CREATED)
        else:
            resp = error_('an error occurred', data=serializer.errors)
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

    
    def get(self, request):
        permissions = Role.objects.all()
        serializer = RoleSerializer(permissions, many=True)
        resp = success_('retrieved all permissions', data=serializer.data)
        return Response(resp, status=status.HTTP_200_OK)


class RoleDetail(APIView, DetailViewMixin):
    serializer_class = RoleSerializer
    model = Role
