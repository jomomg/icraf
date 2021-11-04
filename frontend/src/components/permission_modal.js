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

function AddPermissionForm(props) {
    return (
        <Form>
            <FormGroup>
                <Label for="name">
                First Name
                </Label>
                <Input
                id="name"
                name="name"
                value={props.activePermission.name}
                onChange={props.handleChange}
                placeholder="Name of the permission"
                />
            </FormGroup>
            <FormGroup>
                <Label for="description">
                Permission Description
                </Label>
                <Input
                id="description"
                name="description"
                value={props.activePermission.description}
                onChange={props.handleChange}
                placeholder="Description of the permission"
                />
            </FormGroup>
        </Form>
    )
};

class AddPermissionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePermission: this.props.activePermission,
        };
    };

    handleChange = (e) => {
        let { name, value } = e.target;
    
        const activePermission = { ...this.state.activePermission, [name]: value };
    
        this.setState({ activePermission });
    };

    handleCancel = () => {
        this.setState({ activePermission: this.props.activePermission });
        this.props.toggle();
    };

    render() {
        const {toggle, isOpen, handleSubmitPermission} = this.props
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader 
                    toggle={toggle}
                > 
                    Add Permission 
                </ModalHeader>
                <ModalBody>
                    <AddPermissionForm 
                        activePermission={this.state.activePermission}
                        handleChange={this.handleChange}
                    />
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={()=>handleSubmitPermission(this.state.activePermission)}
                >
                    Add Permission
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


export default AddPermissionModal;