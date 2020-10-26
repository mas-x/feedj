import React from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="home-cover d-flex justify-content-center align-items-center align-items-md-stretch">
        <Container className="m-5 p-5 text-center text-lg-left">
          <h1 id="shadowed" className="display-4 text-light">
            Welcome to feedj
          </h1>
          <p id="shadowed" className="text-light">
            Know what others think about you!{" "}
          </p>
          {userInfo ? (
            <>
              <Button variant="dark" size="lg" as={Link} to="/messages">
                My Messages
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" as={Link} to="/register">
                Join Now
              </Button>
              <Button
                size="lg"
                as={Link}
                to="/login"
                variant="secondary"
                className="ml-2"
              >
                Log In
              </Button>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default HomeScreen;
