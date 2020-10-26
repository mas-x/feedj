import React, { useEffect, useState } from "react";
import { Card, Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";

import SmallLoader from "../components/SmallLoader";
import SuccessAlert from "../components/SuccessAlert";
import { login } from "./../store/actions/authActions";
const LoginScreen = ({ history, location }) => {
  //todo validations on front end
  const { userLoginError, userInfo, isFetching } = useSelector(
    (state) => state.auth
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFromRegistration } = location;
  const dispatch = useDispatch();
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  useEffect(() => {
    if (userInfo) history.push("/");
  }, [userInfo, history]);
  return (
    <Container className="p-2">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {isFromRegistration && (
            <SuccessAlert
              message={
                "Registration Successful. Please login with your account!"
              }
            />
          )}
          <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <ErrorAlert errors={userLoginError} />
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={onUsernameChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={onPasswordChange}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" disabled={isFetching}>
                  {isFetching && <SmallLoader />}
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
