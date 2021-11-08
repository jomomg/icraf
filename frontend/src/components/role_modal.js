import { Component } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import Select from 'react-select';


class AddRoleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRole: this.props.activeRole
        };
    };

    handleChange = (e) => {
        let { name, value } = e.target;
    
        const activeRole = { ...this.state.activeRole, [name]: value };
    
        this.setState({ activeRole });
    };

    handleSelectChange = (options) => {
        const activeRole = { ...this.state.activeRole, permissions: options.map(perm => perm.value) };
        this.setState({ activeRole });
    }


    render() {
        const {toggle, isOpen, handleSubmitRole} = this.props;
        const rolePermissions = this.state.activeRole.permissions ? this.state.activeRole.permissions : []
        const defaultPermissionOptions = rolePermissions.map(
            perm => ({ value: perm.id, label: perm.name} ));
        const availablePermissions = this.props.permissions.filter(
            perm => !rolePermissions.includes(perm));
        const availablePermissionsOptions = availablePermissions.map(
            perm => ({ value: perm.id, label: perm.name} ));

        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader 
                    toggle={toggle}
                > 
                    Add Role 
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">
                            Role Name
                            </Label>
                            <Input
                            id="name"
                            name="name"
                            value={this.state.activeRole.name}
                            onChange={this.handleChange}
                            placeholder="Name of the role"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">
                            Role Description
                            </Label>
                            <Input
                            id="description"
                            name="description"
                            value={this.state.activeRole.description}
                            onChange={this.handleChange}
                            placeholder="Description of the role"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="permissions">
                                Permissions
                            </Label>
                            <Select
                                defaultValue={defaultPermissionOptions}
                                isMulti
                                name="roles"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                options={availablePermissionsOptions}
                                onChange={this.handleSelectChange}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={()=>handleSubmitRole(this.state.activeRole)}
                >
                    Save
                </Button>
                {' '}
                </ModalFooter>
            </Modal>   
        )
    };
    
};


export default AddRoleModal;