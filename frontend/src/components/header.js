import React, { Component } from "react";
import { 
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    NavbarText,
    Nav,
    Collapse,
    Button,
} from 'reactstrap';
import { useHistory } from "react-router-dom";
import { logout } from "../utils/authentication";
import { isAuthenticated } from "../utils/authentication";

function Header(){
    let history = useHistory();
    return (
        <Navbar
            color="primary"
            expand="md"
            light
            dark
        >
            <NavbarBrand style={{marginLeft: '40px', marginRight: '20px'}}>
                icraf
            </NavbarBrand>
            <Collapse navbar>
            <Nav
                className="me-auto"
                navbar
            >
                <NavItem>
                { isAuthenticated() ? (<NavLink href="/admin/"> admin section </NavLink>) : '' }
                </NavItem>
                <NavItem>
                </NavItem>
            </Nav>
            { isAuthenticated() ? (
                <Button color='primary' onClick={() => {logout(); history.push('/')}}>
                    logout
                </Button> ) : ''
            }
            
            </Collapse>
        </Navbar>
    )
}

export default Header;