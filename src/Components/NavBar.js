import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button, NavLink } from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
import { useAuth0 } from '@auth0/auth0-react'
import { LinkContainer } from "react-router-bootstrap";


function NavBarComponent() {
    const { loginWithRedirect } = useAuth0();
    const { isAuthenticated } = useAuth0();
    const { logout } = useAuth0();
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <div id='loading_div'>Loading ...</div>;
      }
    

    return(
    <>
    <Navbar bg="primary" expand="lg" id='navbar_top' style={{paddingBottom:0}}>
    <Container>
        <LinkContainer to="/">
        <Navbar.Brand to="/">Popular News</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <LinkContainer to="/">
            <NavLink to="/">Home</NavLink>
            </LinkContainer>
            <LinkContainer to="/about">
            <NavLink to="/about">About</NavLink>
            </LinkContainer>

            <NavDropdown title="My Account" id="basic-nav-dropdown">
                {isAuthenticated ?     
            <>
            <LinkContainer to='/authcallback'>
                <NavDropdown.Item to="/authcallback">My Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item to="#action/3.4" onClick={()=> logout()} >Logout</NavDropdown.Item></>
            : 
            <>
            <NavDropdown.Item to="#action/3.1" onClick={()=> loginWithRedirect()}>Login</NavDropdown.Item>
            <NavDropdown.Item to="#action/3.1" onClick={()=> loginWithRedirect()}>Create An Account</NavDropdown.Item></>}
            
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    </>
    )
}

export default NavBarComponent