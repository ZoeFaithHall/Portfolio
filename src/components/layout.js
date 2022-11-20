import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
// import { Link, animateScroll as scroll } from "react-scroll";
import Banner from '../views/banner'
import Animation from './animation'

const Layout = () => {
    return (
        <header>
        <section className="layout">
            <Container fluid>
                <Row>
                    <Col>
                    { <Banner/> }
                    </Col> 
                    <Col md={6} className="banner-right">
                        { <Animation/> }
                    </Col>
                </Row>
            </Container>
            </section>
        </header>
    );
};

export default Layout;
