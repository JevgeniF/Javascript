import React from 'react';
import {Col, Container, Row} from 'react-bootstrap'

interface Props {
    children: React.ReactNode;
}

const ContentContainer = ({children}: Props) => {
    return (
        <Container className="py-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default ContentContainer;
