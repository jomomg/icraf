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

    createNewUser = () => {
        const newUser = {
            'first_name': '',
            'last_name': '',
            'other_names': '',
            'email': '',
            'password': '',
        };
        this.setState({ activeUser: newUser });
        this.toggleModal('userModal');
    };

    createNewRole = () => {
        const newRole = {
            'name': '',
            'description': '',
        };
        this.setState({ activeRole: newRole});
        this.toggleModal('roleModal');
    };

    createNewPermission = () => {
        const newPerm = {
            'name': '',
            'description': '',
        };
        this.setState({ activePerm: newPerm});
        this.toggleModal('permModal');
    };

    getData = (dataUrl, dataType) => {
        api.get(dataUrl)
            .then(res => this.setState({ [dataType]: res.data.data, }))
            .catch(err => this.setState({ error: `${err.response.data.message}`, }));
    };

    handleSubmitUser = (newUser) => {
        this.toggleModal('userModal');
        api.post(USERS_URL, newUser)
            .then(res => this.getData(USERS_URL, 'users'));
    };

    handleSubmitRole = (newRole) => {
        this.toggleModal('roleModal');
        api.post(ROLES_URL, newRole)
            .then(res => this.getData(ROLES_URL, 'roles'));

    };

    handleSubmitPermission = (newPerm) => {
        this.toggleModal('permModal');
        api.post(PERMISSIONS_URL, newPerm)
            .then(res => this.getData(PERMISSIONS_URL, 'permissions'));
    };

    componentDidMount() {
        this.getData(USERS_URL, 'users');
        this.getData(ROLES_URL, 'roles');
        this.getData(PERMISSIONS_URL, 'permissions');
    };

    
    render () {
        return (
            <div className='grid-container'>
                <div className='grid-header'>
                    <Header/>
                </div>
                <div className='grid-main'>
                    <div className='content'>
                        <div>
                            <h2>Admin Page</h2><br/>
                        </div>
                        <div>
                            <Badge color="primary">
                                Users
                            </Badge>
                        </div>
                        <UsersTable users={this.state.users}/>
                        <div>
                            <Button
                                color="primary"
                                size="sm"
                                style={{marginLeft: '45%'}}
                                onClick={this.createNewUser}
                            >
                                + Add User
                            </Button>
                        </div>
                        <AddUserModal 
                            toggle={()=>this.toggleModal('userModal')}
                            isOpen={this.state.userModal}
                            activeUser={this.state.activeUser}
                            handleSubmitUser={this.handleSubmitUser}
                        />
                        <br/>
                        <div>
                            <Badge color="primary">
                                Roles
                            </Badge>
                        </div>
                        <RolesTable roles={this.state.roles}/>
                        <div>
                            <Button
                                color="primary"
                                onClick={this.createNewRole}
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
                        />
                        <br/>
                        <div>
                            <Badge color="primary">
                                Permissions
                            </Badge>
                        </div>
                        <PermissionsTable permissions={this.state.permissions}/>
                        <div>
                            <Button
                                color="primary"
                                onClick={this.createNewPermission}
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
                            handleSubmitPermission={this.handleSubmitPermission}
                        />
                    </div>
                </div>
                <div className='grid-footer'></div>
            </div>

        );
    };
}

export default Admin;