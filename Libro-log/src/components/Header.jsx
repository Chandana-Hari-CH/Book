import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <div>
        <Navbar expand="lg" className="bg-warning">
      <Container>
      <Navbar.Brand href="#home">
  <i className="fa-solid fa-book fa-beat" style={{ color: '#9d38c2',paddingRight:'10px',fontSize:'20px'}}></i>
  <span style={{fontFamily: '"Stylish", serif ',fontWeight:'800',fontSize:'30px'}}>Libro Log</span>
</Navbar.Brand>        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header