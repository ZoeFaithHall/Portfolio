import React from "react";
import { Container, Row, Col } from 'react-bootstrap';


const Banner = () => {
    return (
        <Container>
            <Row>
                <Col className="banner-left">
                    <h1>Don't Settle for Uncertainty.</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Banner;