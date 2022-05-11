import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './styles/NavBar_styles.css';

const NavBar = ({
  navMatrix,
  navFormat,
  navDropTitle,
  navDropEn,
  navDropFi,
  selectedLang,
  value,
}) => {
  const handleSelect = (e) => {
    selectedLang(e);
  };

  useEffect(() => {
    selectedLang(value);
  }, [value]);

  return (
    <Navbar className="color-nav" expand="sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav defaultActiveKey="ServiceMatrix" className="me-auto">
            <Nav.Link as={Link} to="ServiceMatrix" eventKey="ServiceMatrix">
              {navMatrix}
            </Nav.Link>
            <Nav.Link as={Link} to="FileFormats" eventKey="FileFormats">
              {navFormat}
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={navDropTitle} id="basic-nav-dropdown" onSelect={handleSelect}>
              <NavDropdown.Item eventKey="en">{navDropEn}</NavDropdown.Item>
              <NavDropdown.Item eventKey="fi">{navDropFi}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
