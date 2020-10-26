import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const SignedOutLinks = () => {
  return (
    <>
      <Nav.Link as={NavLink} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={NavLink} to="/register">
        Register
      </Nav.Link>
    </>
  );
};

export default SignedOutLinks;
