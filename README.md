# Icraf App

## How to set up the backend api

- Clone this repository
- Set up a virtual environment and install dependencies `pip install -r requirements.txt`
- Run migrations with `python manage.py migrate`
- Start the development server with `python manage.py runserver`
- A test admin will be automatically created with the credentials: email: **admin@test.com** password: **admin** 

### Notes on the backend
#### The API endpoints are as follows:

- Login: *POST /api/login/*
```javascript
{
    "email": "<email>",
    "password": "<password>",
}
```

- Create a user: *POST /api/users/*
```javascript
{
    "email": "<email>",
    "first_name": "<first name>",
    "last_name": "<last name>",
    "password": "<password>",
	"roles": ["<role_id>", ...]
}
```
- Retrieve all users *GET /api/users/*
- Retrieve a specific user *GET /api/users/<id>*
- Edit a user's details *PATCH /api/users/<id>*

- Create a role: *POST /api/roles/*
```javascript
{
    "name": "<name>",
    "description": "<description>",
    "permissions": ["<permission_id>", ...]
}
```
- Retrieve all roles *GET /api/roles/*
- Edit role details *PATCH /api/roles/<id>*
- Retrieve a specific role *GET /api/roles/<id>*

- Create a permission: *POST /api/permissions/*
```javascript
{
    "name": "<name>",
    "description": "<description>",
}
```
- Retrieve all permissions *GET /api/permissions/*
- Edit permission details *PATCH /api/permissions/<id>*
- Retrieve a specific permission *GET /api/permissions/<id>*


The format for the *Authorization* header is `Bearer {token}` 

## How to run the frontend

- Run `npm install`to install dependencies
- Run `npm start` in the *icraf/frontend* folder
