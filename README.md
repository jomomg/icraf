# Icraf App

## How to set up the backend api

- Clone this repository
- Set up a virtual environment and install dependencies `pip install -r requirements.txt`
- Run migrations with `python manage.py migrate`
- Start the development server with `python manage.py runserver`

### Notes on the backend
- The API endpoints are as follows:

- Login: *POST /api/login/*

- Create a user: *POST /api/users/*
- Retrieve all users *GET /api/users/*
- Retrieve a specific user *GET /api/users/<id>*
- Edit a user's details *PATCH /api/users/<id>*
- Assign a role to a user *POST /api/users/<user_id>/assign-role*

- Create a role: *POST /api/roles/*
- Retrieve all roles *GET /api/roles/*
- Edit role details *PATCH /api/roles/<id>*
- Retrieve a specific role *GET /api/roles/<id>*

- Create a permission: *POST /api/permissions/*
- Retrieve all permissions *GET /api/permissions/*
- Edit permission details *PATCH /api/permissions/<id>*
- Retrieve a specific permission *GET /api/permissions/<id>*

- I have implemented JWT token authentication for authenticating users, but it is temporarily 
disabled for ease of testing. To enable it uncomment the following line in *settings.py*:
```python
'DEFAULT_PERMISSION_CLASSES': (
    'rest_framework.permissions.IsAuthenticated',
),
```
The format for the *Authorization* header is `Bearer {token}` 

## How to run the frontend

- Run `npm install`to install dependencies
- Run `npm start` in the *icraf/frontend* folder

## Extra Notes

Due to time constraints, I was not able to finish implementing all the features.
Here are some of the yet to be implemented features:

### frontend
- Assigning roles to users
- Protecting/restricing routes

### backend
- Assigning permissions to roles
- Creating a permission class to check whether a user has the right role to access a resource