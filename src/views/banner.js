import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Slide, Fade } from 'react-awesome-reveal';


const Banner = () => {
    return (
        <Container fluid>
            <Row>
                <Col className="banner-left">
                
                <Slide cascade damping={0.1} direction="down">
                      <Fade>
                        <h1>
                            Creative Developer
                            <span>Portfolio.</span>
                        </h1>
                        </Fade>
                </Slide>
                    <Slide cascade damping={1} direction="up" delay={2}>
                        <h2>
                        <Fade>
                            <span>Don't Settle For</span> 
                        </Fade>
                        <Slide cascade damping={2} direction="up">
                        <Fade>
                            <span>Uncertainty.</span>
                        </Fade>
                        </Slide>
                        </h2>
                    </Slide>
                </Col>
            </Row>
        </Container>
    );
};

export default Banner;