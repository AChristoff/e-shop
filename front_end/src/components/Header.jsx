import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav} from 'react-bootstrap'
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';


const Header = () => {
  return (
    <header>
      <Navbar className='py-2 mb-4' bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <HiCursorClick style={{margin: '0 0.4em -0.1em 0', 'font-size': '1.5em' }}/>
              <span style={{'text-transform': 'none', 'font-size': '1.4em'}}>e-Shop</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart className='mr-1 mb-1' />
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link>
                  <FaUserAlt className='mr-1 mb-1' />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
