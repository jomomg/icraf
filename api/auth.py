import jwt
from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication

from api.models import User


SECRET_KEY = '1324bdb£$)*&^adfnad33&&$$£3fl234'  # temporary


class JWTAuthentication(TokenAuthentication):
    keyword = 'Bearer'
    model = User

    def authenticate_credentials(self, token):
        secret = SECRET_KEY
        try:
            decoded = jwt.decode(token, secret, algorithms='HS256')
        except jwt.exceptions.DecodeError:
            raise exceptions.AuthenticationFailed('invalid token')
        except jwt.exceptions.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('expired token')
        except jwt.exceptions.InvalidTokenError:
            raise exceptions.AuthenticationFailed('invalid token')
        try:
            user = User.objects.get(email=decoded['email'])
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed('invalid token')
        else:
            return user, token
