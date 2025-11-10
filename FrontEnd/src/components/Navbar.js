import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const CustomNavbar = () => {
  const location = useLocation();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/">
          VitaGestão
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active fw-bold' : ''}
            >
              Início
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/consultas" 
              className={location.pathname === '/consultas' ? 'active fw-bold' : ''}
            >
              Consultas
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/pacientes" 
              className={location.pathname === '/pacientes' ? 'active fw-bold' : ''}
            >
              Pacientes
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/medicos" 
              className={location.pathname === '/medicos' ? 'active fw-bold' : ''}
            >
              Médicos
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/atendentes" 
              className={location.pathname === '/atendentes' ? 'active fw-bold' : ''}
            >
              Atendentes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;