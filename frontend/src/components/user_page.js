import { Component, Fragment } from "react";
import './css/user_page.css';
import Header from "./header";
import api from "../utils/requests";
import { USERS_URL } from "../constants";
import { 
    Card,
    CardBody,
    CardTitle,
    Badge,
    CardText,
    ListInlineItem,
    List,
    Button,
    Form,
    FormGroup,
    ButtonGroup,
    Input,
    InputGroup,
    InputGroupText,
    CardHeader,
} from 'reactstrap';
import { isAuthenticated } from "../utils/authentication";
import { Redirect } from "react-router-dom";



class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            roles: [],
            error: '',
            edit: false,
            disableInput: true,
            editedUserData: {}
        }
    };
    
    getUserData = (userId) => {
        api.get(`${USERS_URL}${userId}/`)
            .then(res => this.setState({ userData: res.data.data, 
                roles: res.data.data.roles}))
            .catch(err => this.setState({ error: `${err.response.data.message}`, }));
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.getUserData(userId);
    };

    toggleEdit = (e) => {
        this.setState({edit: !this.state.edit, disableInput: !this.state.disableInput});
    }; 

    handleEdit = (e) => {
        e.preventDefault();
        this.toggleEdit();
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.toggleEdit();
    }

    handleOnChange = (e) => {
        const { name,  value } = e.target;
        const editedUserData = {...this.state.editedUserData, [name]: value};
        this.setState({ editedUserData: editedUserData });
    };

    handleSave = (e) => {
        const userId = this.state.userData.id
        e.preventDefault();
        this.toggleEdit();
        api.patch(`${USERS_URL}${userId}/`, this.state.editedUserData)
            .then(res => this.getUserData(userId));
    };



    render(){
    
        return (
            <div className='parent'>
                <div className='header' style={{ marginBottom: '10px'}}>
                    <Header/>
                </div>
                <div className='main-body' style={{paddingLeft: '15%', paddingRight: '15%', paddingTop: '5%'}}>
                    <div style={{marginLeft: '3%', marginRight: '3%'}}>
                        <h4 style={{marginLeft: '40%'}}>User Details</h4>
                        <Card color='primary' outline className='text-center'>
                            <CardBody>
                                <CardHeader>
                                User: {'  '}
                                    <Badge tag='h4'>
                                     {this.state.userData.first_name} {' '}  {this.state.userData.last_name}
                                    </Badge>
                                {' '}{' '}
                                Role(s): 
                                    {
                                        this.state.roles.map(role => (
                                            <Badge 
                                                color='success' 
                                                key={role.id}
                                                style={{marginRight: '5px', marginLeft: '2px'}}
                                            >
                                                    {role.name}
                                            </Badge>
                                        ))
                                    }
                                </CardHeader>
                                <CardTitle tag="h4">
                                    
                                </CardTitle>
                                <Form>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{backgroundColor: 'blue', color: 'white'}}>
                                            Email
                                            </InputGroupText>
                                            <Input
                                            id="userEmail"
                                            name="email"
                                            defaultValue={this.state.userData.email}
                                            disabled={this.state.disableInput}
                                            onChange={this.handleOnChange}
                                            />
                                             
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{backgroundColor: 'blue', color: 'white'}}>
                                            First Name
                                            </InputGroupText>
                                            <Input
                                            id="userFirstName"
                                            name="first_name"
                                            defaultValue={this.state.userData.first_name}
                                            disabled={this.state.disableInput}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{backgroundColor: 'blue', color: 'white'}}>
                                            Last Name
                                            </InputGroupText>
                                            <Input
                                            id="userLastName"
                                            name="last_name"
                                            defaultValue={this.state.userData.last_name}
                                            disabled={this.state.disableInput}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{backgroundColor: 'blue', color: 'white'}}>
                                            Other Name(s)
                                            </InputGroupText>
                                            <Input
                                            id="userOtherName"
                                            name="other_names"
                                            defaultValue={this.state.userData.other_names}
                                            disabled={this.state.disableInput}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                                {
                                    this.state.edit ? 
                                    (
                                        <ButtonGroup>
                                            <Button onClick={this.handleSave} color="success"> save </Button>
                                            <Button onClick={this.handleCancel} color="danger"> cancel </Button>
                                        </ButtonGroup>
                                    ) : 
                                    (<Button onClick={this.handleEdit} color="secondary"> edit user details</Button>)
                                }
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className='footer'></div>
            </div>
        );
    }
};

export default UserPage;