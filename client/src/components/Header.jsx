import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <>
      <Navbar
        fixed={location.pathname === "/" && "top"}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            feedj
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {userInfo ? <SignedInLinks /> : <SignedOutLinks />}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
