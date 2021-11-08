import React, { Component } from 'react';
import Header from './header';
import api from '../utils/requests';
import { PERMISSIONS_URL, ROLES_URL, USERS_URL } from '../constants';
import './css/admin.css';
import UsersTable from './users_table';
import { 
    Badge,
    Button,
} from 'reactstrap';
import RolesTable from './roles_table';
import PermissionsTable from './permissions_table';
import AddUserModal from './user_modal';
import AddRoleModal from './role_modal';
import AddPermissionModal from './permission_modal';
import { NEW_USER, NEW_PERMISSION, NEW_ROLE, ITEM_TYPES } from '../constants';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            permissions: [],
            error: '',
            userModal: false,
            roleModal: false,
            permModal: false,
            activeUser: {},
            activeRole: {},
            activePerm: {},
        };
    };


    toggleModal = (modalType) => {
        this.setState({[modalType]: !this.state[`${modalType}`]})
    };

    editItem = (itemType, value) => {
        const relevant = ITEM_TYPES[itemType];
        this.setState({ [relevant.prop]: value });
        this.toggleModal(relevant.modal);
    };
    
    getData = (dataUrl, dataType) => {
        api.get(dataUrl)
            .then(res => this.setState({ [dataType]: res.data.data, }))
            .catch(err => console.log('error>>>', err) );
            // .catch(err => this.setState({ error: `${err.response.data.message}`, }));
    };

    handleDelete = (itemType, itemId) => {
        const relevant = ITEM_TYPES[itemType];
        api.delete(`${relevant.url}${itemId}/`)
            .then(res => this.getData(relevant.url, `${itemType}s`));
    };

    handleSubmitItem = (itemType, newItem) => {
        const relevant = ITEM_TYPES[itemType];
        this.toggleModal(relevant.modal);
        if (newItem.id) {
            api.patch(`${relevant.url}${newItem.id}/`, newItem)
                .then(res => this.getData(relevant.url, `${itemType}s`));
            return;
        };  
        api.post(relevant.url, newItem)
            .then(res => this.getData(relevant.url, `${itemType}s`));
    };


    handleSubmitUser = (newUser) => {
        this.handleSubmitItem('user', newUser)
    };

    handleSubmitRole = (newRole) => {
        this.handleSubmitItem('role', newRole)

    };

    handleSubmitPermission = (newPerm) => {
        this.handleSubmitItem('permission', newPerm)
    };

    componentDidMount() {
        this.getData(USERS_URL, 'users');
        this.getData(ROLES_URL, 'roles');
        this.getData(PERMISSIONS_URL, 'permissions');
    };

    
    render () {
        return (
            <div className='parent'>
                <div className='header'>
                    <Header/>
                </div>
                <div className='admin-main-body'>
                    <div className='admin-content'>
                        <div>
                            <h2>Admin Page</h2><br/>
                        </div>
                        <div>
                            <Badge color="primary">
                                Users
                            </Badge>
                        </div>
                        <UsersTable 
                            users={this.state.users}
                            handleEdit={this.editItem}
                            handleDelete={this.handleDelete}
                        />
                        <div>
                            <Button
                                color="primary"
                                size="sm"
                                style={{marginLeft: '45%'}}
                                onClick={()=>this.editItem('user', NEW_USER)}
                            >
                                + Add User
                            </Button>
                        </div>
                        <AddUserModal 
                            toggle={()=>this.toggleModal('userModal')}
                            isOpen={this.state.userModal}
                            roles={this.state.roles}
                            activeUser={this.state.activeUser}
                            key={this.state.activeUser.id}
                            handleSubmitUser={this.handleSubmitUser}
                        />
                        <br/>
                        <div>
                            <Badge color="primary">
                                Roles
                            </Badge>
                        </div>
                        <RolesTable 
                            roles={this.state.roles}
                            handleEdit={this.editItem}
                            handleDelete={this.handleDelete}
                        />
                        <div>
                            <Button
                                color="primary"
                                onClick={()=>this.editItem('role', NEW_ROLE)}
                                size="sm"
                                style={{marginLeft: '45%'}}
                            >
                                + Add Role
                            </Button>
                        </div>
                        <AddRoleModal
                            toggle={()=>this.toggleModal('roleModal')}
                            isOpen={this.state.roleModal}
                            activeRole={this.state.activeRole}
                            handleSubmitRole={this.handleSubmitRole}
                            key={this.state.activeRole.id}
                            permissions={this.state.permissions}
                        />
                        <br/>
                        <div>
                            <Badge color="primary">
                                Permissions
                            </Badge>
                        </div>
                        <PermissionsTable 
                            permissions={this.state.permissions}
                            handleEdit={this.editItem}
                            handleDelete={this.handleDelete}
                        />
                        <div>
                            <Button
                                color="primary"
                                onClick={()=>this.editItem('permission', NEW_PERMISSION)}
                                size="sm"
                                style={{marginLeft: '45%'}}
                            >
                                + Add Permission
                            </Button>
                        </div>
                        <AddPermissionModal
                            toggle={()=>this.toggleModal('permModal')}
                            isOpen={this.state.permModal}
                            activePermission={this.state.activePerm}
                            key={this.state.activePerm.id}
                            handleSubmitPermission={this.handleSubmitPermission}
                        />
                    </div>
                </div>
                <div className='admin-footer'></div>
            </div>

        );
    };
}

export default Admin;