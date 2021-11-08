import React, { Component } from 'react';
import Header from './header';
import toast, { Toaster } from 'react-hot-toast';
import { Redirect } from "react-router-dom";
import { getUserInfo } from '../utils/authentication';
import axios from 'axios';
import './css/login.css';

import {
    Form,
    FormGroup,
    Col,
    Label,
    Input,
    Button,
    Row,
} from 'reactstrap';
import api from '../utils/requests';
import { BASE_URL } from '../constants';

const LOGIN_URL = '/login/';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            redirect: false,
        };
    };

    notify = () => toast.error('Invalid login details');

    login = () => {
        const { email, password } = this.state
        api.post(LOGIN_URL, {email: email, password: password})
            .then(res => {
                localStorage.setItem('accessToken', res.data.data.token);
                this.setState({redirect: true});
                localStorage.setItem('isAuthenticated', true);
            })
            .catch(res => this.notify())
    };

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target
        this.setState({[name]: value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.login();
        
    };

    render() {
        const userId = getUserInfo().id;
        const { from } = this.props.location.state || { from : {pathname: `/users/${userId}`}};
        if (this.state.redirect) {
            return <Redirect to={ from } />;
        };

        return (
            <div className='parent'>
                <Toaster/>
                <div>
                    <Header/>
                </div>
                <div className='main-body'>
                    <div className='login-content'>
                        <h2>Login</h2>
                        <br></br>
                        <Form>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="loginEmail"> Email </Label>
                                        <Input
                                            id="loginEmail"
                                            name="email"
                                            placeholder="email address"
                                            type="email"
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="loginPassword"> Password </Label>
                                        <Input
                                            id="loginPassword"
                                            name="password"
                                            placeholder="password"
                                            type="password"
                                            onChange={this.handleChange}
                                            />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button onClick={this.handleSubmit}>
                                Sign in
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className='footer'></div>
            </div>
        )
    };
}

export default Login;