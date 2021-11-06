import { Component } from 'react';
import api from '../utils/requests';
import { PERMISSIONS_URL } from '../constants';
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



class AddPermissionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePermission: this.props.activePermission
        };
        
    }
    

    handleChange = (e) => {
        let { name, value } = e.target;
    
        const activePermission = { ...this.state.activePermission, [name]: value };
    
        this.setState({ activePermission });
    };


    render() {
        const {toggle, isOpen, handleSubmitPermission} = this.props
        return (
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader 
                    toggle={toggle}
                > 
                    Permission Details
                </ModalHeader>
                <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="name">
                        Permission Name
                        </Label>
                        <Input
                        id="name"
                        name="name"
                        value={this.state.activePermission.name}
                        onChange={this.handleChange}
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
                        value={this.state.activePermission.description}
                        onChange={this.handleChange}
                        placeholder="Description of the permission"
                        />
                    </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                <Button
                    color="primary"
                    onClick={()=>handleSubmitPermission(this.state.activePermission)}
                >
                    Save
                </Button>
                {' '}
                </ModalFooter>
            </Modal>
            
        )
    };
    
};


export default AddPermissionModal;