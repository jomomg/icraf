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
    ListInlineItem,
    List,
    Button,
} from 'reactstrap';



class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            roles: [],
            error: '',
            modal: false,
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

    render(){
        const { first_name, last_name, other_names, email} = this.state.userData;
        const roles = this.state.roles;
    
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
                                <List>
                                {roles.map((role) =>
                                    <ListInlineItem key={role.id}>
                                        <Badge color='danger'>{role.name}</Badge>
                                    </ListInlineItem>
                                )}
                                <br/>
                                <Button 
                                    color='success'
                                    size='sm' 
                                    outline> 
                                    + Assign role 
                                </Button>
                                </List>   
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