import jwt
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import check_password
from rest_framework import serializers, status
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Permission, Role, User
from api.serializers import (PermissionSerializer, UserSerializer, RoleSerializer, 
UserRoleAssignmentSerializer)
from api.utils import success_, error_


SECRET_KEY = '1324bdb£$)*&^adfnad33&&$$£3fl234'  # temporary

class DetailViewBase:
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
            raise exceptions.ParseError('specified resource was not found')
        else:
            return instance


class DetailViewMixin(DetailViewBase):
    def get(self, request, pk):
        obj = self.get_object(pk)
        serializer = self.serializer_class(obj)
        response = success_(f'{self.model.__name__} retrieved', data=serializer.data)
        return Response(response, status.HTTP_200_OK)

    def patch(self, request, pk):
        obj = self.get_object(pk)
        serializer = self.serializer_class(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            resp = success_(f'{self.model.__name__} updated', data=serializer.data)
            return Response(resp, status.HTTP_200_OK)
        resp = error_('an error_ occurred', serializer.errors)
        return Response(resp, status=status.HTTP_400_BAD_REQUEST)


class ListViewMixin:
    serializer_class = None
    model = None

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            resp = success_(f'{self.model.__name__} created', data=serializer.data)
            return Response(resp, status=status.HTTP_201_CREATED)
        else:
            resp = error_('an error occurred', data=serializer.errors)
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)

    
    def get(self, request):
        items = self.model.objects.all()
        serializer = self.serializer_class(items, many=True)
        resp = success_(f'retrieved all {self.model.__name__.lower()}s', data=serializer.data)
        return Response(resp, status=status.HTTP_200_OK)


class PermissionList(APIView, ListViewMixin):
    """
    Handler for requests on the url '/api/permissions/'
    For a POST request, a new permission is created
    For a GET request, returns a list of all permissions 
    """
    serializer_class = PermissionSerializer
    model = Permission

    
class PermissionDetail(APIView, DetailViewMixin):
    serializer_class = PermissionSerializer
    model = Permission


class RoleList(APIView, ListViewMixin):
    """
    Handler for requests on the url '/api/roles/'
    For a POST request, a new role is created
    For a GET request, returns a list of all roles 
    """
    serializer_class = RoleSerializer
    model = Role

class RoleDetail(APIView, DetailViewMixin):
    serializer_class = RoleSerializer
    model = Role


class UserList(APIView, ListViewMixin):
    """
    Handler for requests on the url '/api/users/'
    For a POST request, a new user is created
    For a GET request, returns a list of all users
    """
    serializer_class = UserSerializer
    model = User


class UserDetail(APIView, DetailViewMixin):
    serializer_class = UserSerializer
    model = User


class UserRoleAssignment(APIView, DetailViewBase):
    serializer_class = UserRoleAssignmentSerializer
    model = User

    def patch(self, request, pk):
        user = self.get_object(pk)
        serializer = self.serializer_class(data=request.data, context={'user': user})
        if serializer.is_valid():
            serializer.save()
            resp = success_('role successfully assigned', data=serializer.data)
            return Response(resp, status=status.HTTP_200_OK)
        else:
            resp = error_('an error occurred', data=serializer.errors)
            return Response(resp, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    def post(self, request):
        login_credentials = self.validate_login_data(request.data)
        user = self.authenticate(**login_credentials)
        if not user:
            return Response(error_('invalid login credentials'), status.HTTP_401_UNAUTHORIZED)
        else:
            payload = {
                'email': user.email
            }
            secret = SECRET_KEY
            token = jwt.encode(payload, secret, algorithm='HS256')
            return Response(success_('login successful', {'token': token}), status.HTTP_200_OK)

    @staticmethod
    def validate_login_data(request_data):
        if not request_data:
            raise exceptions.ParseError('you must provide login credentials')
        required_fields = ('email', 'password')
        for field in required_fields:
            if field not in request_data:
                raise exceptions.ParseError(f'{field} is required')
            if not request_data[field]:
                raise exceptions.ParseError(f'{field} cannot be left blank')
        return request_data

    @staticmethod
    def authenticate(email=None, password=None):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        password_is_valid = check_password(password, user.password)
        if password_is_valid:
            return user
