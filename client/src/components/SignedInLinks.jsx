import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "./../store/actions/authActions";
const SignedInLinks = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Nav.Link as={NavLink} to="/messages">
        Messages
      </Nav.Link>
      <Nav.Link as={NavLink} to="/account">
        My Account
      </Nav.Link>
      <Nav.Link
        as={Link}
        onClick={() => {
          dispatch(logOut());
        }}
        to="/"
      >
        Sign Out
      </Nav.Link>
    </>
  );
};

export default SignedInLinks;
