from rest_framework import serializers
from rest_framework import exceptions
from api.models import Role, Permission, User


class PermissionSerializer(serializers.ModelSerializer):
    """
    Permission model serializer
    """
    class Meta:
        model = Permission
        fields = ('id', 'name', 'description')
        read_only_fields = ('id',)
        extra_kwargs = {
            'description': {'required': False}
        }


class RoleSerializer(serializers.ModelSerializer):
    """
    Role model serializer
    """
    permissions = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Permission.objects,
        required=False
    )

    class Meta:
        model = Role
        fields = ('id', 'name', 'description', 'permissions')
        read_only_fields = ('id',)
        extra_kwargs = {
            'description': {'required': False}
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        roles = data['permissions']
        role_objects = Permission.objects.filter(id__in=roles) 
        serializer = PermissionSerializer(role_objects, many=True)
        data['permissions'] = serializer.data
        return data

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.descritption = validated_data.get('description', instance.description)
        instance.save()
        if not validated_data.get('permissions'):
            return instance
        else:
            instance.permissions.set(validated_data['permissions'])
            return instance


class UserSerializer(serializers.ModelSerializer):
    """
    User model serializer
    """

    roles = serializers.PrimaryKeyRelatedField(many=True, queryset=Role.objects)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'other_names', 'roles', 'password')
        read_only_fields = ('id',)
        extra_kwargs = {
            'other_names': {'required': False},
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """
        Creates and saves a user object
        """
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            other_names=validated_data.get('other_names', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        roles = validated_data['roles']
        user.roles.add(*roles)
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.other_names = validated_data.get('other_names', instance.other_names)
        instance.save()
        if not validated_data.get('roles'):
            return instance
        else:
            instance.roles.set(validated_data['roles'])
            return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        roles = data['roles']
        role_objects = Role.objects.filter(id__in=roles) 
        serializer = RoleSerializer(role_objects, many=True)
        data['roles'] = serializer.data
        return data
