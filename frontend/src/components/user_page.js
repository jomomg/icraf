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
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

const renderRoles = (roles) => {
    return roles.map((role) => (
        <FormGroup check key={role.id}>
            <Label check>
                {role.name}
            </Label>
            <Input type="checkbox" />
        </FormGroup>
    ))
};

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            role: {},
            error: '',
        }
    };

    
    getUserData = (userId) => {
        api.get(`${USERS_URL}${userId}/`)
            .then(res => this.setState({ userData: res.data.data, role: res.data.data.role}))
            .catch(err => this.setState({ error: `${err.response.data.message}`, }));
    };


    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.getUserData(userId);
    };

    render(){
        const { first_name, last_name, other_names, email, role} = this.state.userData;
    
        return (
            <div className='grid-container'>
                <div className='grid-header'>
                    <Header/>
                </div>
                <div className='grid-main'>
                    <div style={{marginLeft: '3%', marginRight: '3%'}}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h4">
                                    User Info
                                </CardTitle>
                                <br/>
                                <Badge color='primary'> First Name: </Badge>
                                <h4>{first_name}</h4>
                                <Badge color='primary'> Last Name: </Badge>
                                <h4>{last_name}</h4>
                                <Badge color='primary'> Other Name(s): </Badge>
                                <h4>{other_names ? other_names : '--'}</h4>
                                <Badge color='primary'> Email: </Badge>
                                <h4>{email}</h4>
                                <Badge color='primary'> Roles: </Badge>
                                <br/> 
                                <Badge color='danger'>{role.name}</Badge>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className='grid-footer'></div>
            </div>
        );
    }
};

export default UserPage;