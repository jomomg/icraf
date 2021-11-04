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

function AddRoleForm(props) {
    return (
        <Form>
            <FormGroup>
                <Label for="name">
                First Name
                </Label>
                <Input
                id="name"
                name="name"
                value={props.activeRole.name}
                onChange={props.handleChange}
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
                value={props.activeRole.description}
                onChange={props.handleChange}
                placeholder="Description of the role"
                />
            </FormGroup>
        </Form>
    )
};

class AddRoleModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRole: this.props.activeRole,
        };
    };

    handleChange = (e) => {
        let { name, value } = e.target;
    
        const activeRole = { ...this.state.activeRole, [name]: value };
    
        this.setState({ activeRole });
    };

    handleCancel = () => {
        this.setState({ activeRole: this.props.activeRole });
        this.props.toggle();
    };

    render() {
        const {toggle, isOpen, handleSubmitRole} = this.props
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader 
                    toggle={toggle}
                > 
                    Add Role 
                </ModalHeader>
                <ModalBody>
                    <AddRoleForm 
                        activeRole={this.state.activeRole}
                        handleChange={this.handleChange}
                    />
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={()=>handleSubmitRole(this.state.activeRole)}
                >
                    Add Role
                </Button>
                {' '}
                <Button color='danger' onClick={this.handleCancel}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
            
        )
    };
    
};


export default AddRoleModal;