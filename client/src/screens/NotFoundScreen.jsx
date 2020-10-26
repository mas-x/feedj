import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
const NotFoundScreen = () => {
  return (
    <Jumbotron>
      <Container className="d-flex align-items-center justify-content-center">
        <h1>Page not found!</h1>
      </Container>{" "}
    </Jumbotron>
  );
};

export default NotFoundScreen;
