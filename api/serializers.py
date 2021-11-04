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
        extra_kwargs = {
            'description': {'required': False}
        }


class RoleSerializer(serializers.ModelSerializer):
    """
    Role model serializer
    """
    class Meta:
        model = Role
        fields = ('id', 'name', 'description')
        read_only_fields = ('id',)
        extra_kwargs = {
            'description': {'required': False}
        }


class UserSerializer(serializers.ModelSerializer):
    """
    User model serializer
    """

    roles = RoleSerializer(many=True, read_only=True)

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
        return user


class UserRoleAssignmentSerializer(serializers.ModelSerializer):
    """
    Role assignment serializer
    """
    role = serializers.UUIDField(write_only=True)
    roles = RoleSerializer(many=True, read_only=True)

    def create(self, validated_data):
        role_id = validated_data['role']
        role = Role.objects.get(pk=role_id)
        if not role:
            raise serializers.ValidationError('specified role was not found')
        else:
            user = self.context.get('user')
            user.roles.add(role)
            return user

    class Meta:
        model = User
        exclude = ['password']
        read_only_fields = ['id', 'email', 'first_name', 'last_name', 'other_names', 'roles']
