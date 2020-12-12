import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaRegCopyright } from 'react-icons/fa'
import { HiCursorClick } from 'react-icons/hi';
import logo from '../assets/aleksov-logo.svg';

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer style={{'marginTop': 'auto'}}>
    <Container className='border-top'>
      <Row>
        <Col className="text-center py-2">
          <FaRegCopyright className="copy-icon"/> 2019-{currentYear} All rights reserved
          <strong style={{'margin': '0 0 0 0.5em', 'fontWeight': '700', 'fontSize': '1.2em'}}><HiCursorClick /> e-Shop</strong> | developed by
          <a className="developer" href="https://alekshristov.com/" target="_blank">
            <img title="aleksov-logo" src={logo} style={{'height': '1.55em', 'margin': '-0.2em 0 0 0.4em', 'opacity': '0.9'}}></img>
          </a>
        </Col>
      </Row>
    </Container>
    </footer>
  )
}

export default Footer
