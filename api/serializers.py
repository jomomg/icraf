from rest_framework import serializers
from api.models import Role, Permission, User


class PermissionSerializer(serializers.ModelSerializer):
    """
    Permission model serializer
    """
    class Meta:
        model = Permission
        fields = ('id', 'name', 'description')
        read_only_fields = ('id',)


class RoleSerializer(serializers.ModelSerializer):
    """
    Role model serializer
    """
    class Meta:
        model = Role
        fields = ('id', 'name', 'description')
        read_only_fields = ('id',)


class UserSerializer(serializers.ModelSerializer):
    """
    User model serializer
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'other_names')
        read_only_fields = ('id',)
        extra_kwargs = {
            'email': {'required': True}
        }
