import "./Navbar.css";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { NavLink } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <h4 className="nav-brand">Location Data</h4>

        <Nav>
          <NavLink to="/" className="nav-link">
            Add Location
          </NavLink>
          <NavLink to="/locationPage" className="nav-link">
            Locations
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
