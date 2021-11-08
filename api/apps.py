from django.apps import AppConfig
from django.conf import settings
from django.db.models.signals import post_migrate

EMAIL = 'admin@test.com'
PASSWORD = 'admin'
FIRST_NAME = 'admin'
LAST_NAME = 'admin'

def create_test_admin(sender, **kwargs):
    if not settings.DEBUG:
        return
    from api.models import User
    
    try:
        User.objects.get(email=EMAIL)
    except User.DoesNotExist:
        user = User(email=EMAIL, 
                    first_name=FIRST_NAME,
                    last_name=LAST_NAME
                )
        user.set_password(PASSWORD)
        user.save()

def create_admin_role(sender, **kwargs):
    from api.models import Role
    if not Role.objects.filter(name='admin').exists():
        role = Role(name='admin', description='admin')
        role.save()

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        super().ready()
        post_migrate.connect(create_admin_role)
        post_migrate.connect(create_test_admin)
