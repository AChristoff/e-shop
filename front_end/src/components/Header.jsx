import React from 'react'
import { Container, Navbar, Nav} from 'react-bootstrap'
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">e-shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/cart"><FaShoppingCart className="mr-1 mb-1"/>Cart</Nav.Link>
            <Nav.Link href="/login"><FaUserAlt className="mr-1 mb-1"/>Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
