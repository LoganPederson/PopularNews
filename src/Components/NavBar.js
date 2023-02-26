import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
import { useAuth0 } from '@auth0/auth0-react'



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
    <Navbar bg="primary" expand="lg" id='navbar_top'>
    <Container>
        <Navbar.Brand href="/">Popular News</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="My Account" id="basic-nav-dropdown">
                {isAuthenticated ?     
            <><NavDropdown.Item href="/authcallback">My Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4" onClick={()=> logout()} >Logout</NavDropdown.Item></>
            : 
            <>
            <NavDropdown.Item href="#action/3.1" onClick={()=> loginWithRedirect()}>Login</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Create An Account</NavDropdown.Item></>}
            
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    </>
    )
}

export default NavBarComponent