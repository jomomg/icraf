import React, { Component } from 'react';
import Header from './header';

import './css/login.css';

import {
    Form,
    FormGroup,
    Col,
    Label,
    Input,
    Button,
    Row
} from 'reactstrap';


class Login extends Component {
    render() {
        return (
            <div className='grid-container'>
                <div className='grid-header'>
                    <Header/>
                </div>
                <div className='grid-main'>
                    <div className='content'>
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
                                            />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button>
                                Sign in
                            </Button>
                        </Form>
                    </div>
                </div>
                <div className='grid-footer'></div>
            </div>
        )
    };
}

export default Login;