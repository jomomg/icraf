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

function AddUserForm(props) {
    return (
        <Form>
            <FormGroup>
                <Label for="firstName">
                First Name
                </Label>
                <Input
                id="firstName"
                name="first_name"
                value={props.activeUser.first_name}
                onChange={props.handleChange}
                placeholder="First Name"
                />
            </FormGroup>
            <FormGroup>
                <Label for="lastName">
                Last Name
                </Label>
                <Input
                id="lastName"
                name="last_name"
                value={props.activeUser.last_name}
                onChange={props.handleChange}
                placeholder="Last Name"
                />
            </FormGroup>
            <FormGroup>
                <Label for="otherName">
                Other Name(s)
                </Label>
                <Input
                id="otherName"
                name="other_names"
                value={props.activeUser.other_names}
                onChange={props.handleChange}
                placeholder="Other Name(s)"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">
                Email
                </Label>
                <Input
                id="userEmail"
                name="email"
                value={props.activeUser.email}
                onChange={props.handleChange}
                placeholder="User's email"
                type="email"
                />
            </FormGroup>
            <FormGroup>
                <Label for="userPassword">
                Password
                </Label>
                <Input
                id="userPassword"
                name="password"
                value={props.activeUser.password}
                onChange={props.handleChange}
                placeholder="Give the user a password"
                type="password"
                />
            </FormGroup>
        </Form>
    )
};

class AddUserModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeUser: this.props.activeUser,
        };
    };

    handleChange = (e) => {
        let { name, value } = e.target;
    
        const activeUser = { ...this.state.activeUser, [name]: value };
    
        this.setState({ activeUser });
    };

    handleCancel = () => {
        this.setState({ activeUser: this.props.activeUser });
        this.props.toggle();
    };

    render() {
        const {toggle, isOpen, handleSubmitUser} = this.props
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader 
                    toggle={toggle}
                > 
                    Add User 
                </ModalHeader>
                <ModalBody>
                    <AddUserForm 
                        activeUser={this.state.activeUser}
                        handleChange={this.handleChange}
                    />
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={()=>handleSubmitUser(this.state.activeUser)}
                >
                    Add User
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


export default AddUserModal;