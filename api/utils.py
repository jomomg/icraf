from rest_framework.views import exception_handler


def success_(message, data):
    """
    Generates a standard template message for success responses
    """
    response = {
        'status': 'success',
        'message': message,
        'data': data
    }
    return response


def error_(message, data=None):
    """
    Generates a standard template message for error responses
    """
    response = {
        'status': 'error',
        'message': message,
    }
    if data:
        response['errors'] = data
    return response


def custom_exception_handler(exc, context):
    """
    Transforms the default exception handler message format into the 
    standard format used by other views 
    """
    response = exception_handler(exc, context)
    if response is not None:
        detail = response.data['detail']
        response.data = error_(detail)
    return response