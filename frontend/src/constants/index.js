export const BASE_URL = 'http://localhost:8000/api'
export const USERS_URL = '/users/'
export const ROLES_URL = '/roles/'
export const PERMISSIONS_URL = '/permissions/'

export const NEW_USER = {
    'first_name': '',
    'last_name': '',
    'other_names': '',
    'email': '',
    'password': '',
    'roles': [],
};

export const NEW_ROLE = {
    'name': '',
    'description': '',
    'permissions': [],
};

export const NEW_PERMISSION = {
    'name': '',
    'description': '',
};

export const ITEM_TYPES = {
    user: { modal: 'userModal', prop: 'activeUser', url: USERS_URL},
    role: { modal: 'roleModal', prop: 'activeRole', url: ROLES_URL},
    permission: { modal: 'permModal', prop: 'activePerm', url: PERMISSIONS_URL }
};