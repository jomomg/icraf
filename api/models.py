import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser


class Permission(models.Model):
    """
    Permissions model
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True)


class Role(models.Model):
    """
    Roles model
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True)
    permissions = models.ManyToManyField(Permission)


class User(AbstractBaseUser):
    """
    User model
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    other_names = models.CharField(max_length=150, blank=True)
    roles = models.ManyToManyField(Role)
    
    @property
    def is_admin(self):
        if 'admin' in (role.name for role in self.roles.all()):
            return True
        return False
