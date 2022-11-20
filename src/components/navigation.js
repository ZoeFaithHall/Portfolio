import React from "react";
import { 
    Navbar, 
    Container, 
    Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
    return (
        <Navbar>
        <Container fluid className="justify-content-start">
        <LinkContainer to="/">
             <Navbar.Brand>Z</Navbar.Brand>
        </LinkContainer>
        <Nav>
        <LinkContainer to="../views/projects">
            <Nav.Link>Projects</Nav.Link>
        </LinkContainer>
        <LinkContainer to="../views/contact">
            <Nav.Link>Contact</Nav.Link>
        </LinkContainer>
            
        </Nav>
        </Container>
        </Navbar>
    );
};

export default Navigation;