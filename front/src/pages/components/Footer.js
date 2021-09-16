import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="footer">
      <Container className="text-center">
        <Row>
          <Col>&copy; Warriors, Inc.</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
