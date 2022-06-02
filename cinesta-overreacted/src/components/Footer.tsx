import React from 'react';
import {Col, Container, Row} from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3 mt-auto">&copy; Cinesta 2022</Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
