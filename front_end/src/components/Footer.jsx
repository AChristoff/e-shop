import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer style={{'margin-top': 'auto'}}>
    <Container>
      <Row>
        <Col className="text-center py-3">
          Copyright &copy; e-Shop
        </Col>
      </Row>
    </Container>
    </footer>
  )
}

export default Footer
