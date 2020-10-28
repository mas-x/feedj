import React, { useState, useEffect } from "react";
import { Card, Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";
import { register } from "../store/actions/authActions";
import SmallLoader from "../components/SmallLoader";
const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userRegister, userRegisterError, userInfo, isFetching } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, confirmPassword));
  };

  useEffect(() => {
    if (userRegister) {
      console.log("Registration successfull", userRegister);

      history.push({
        pathname: "/login",
        isFromRegistration: true,
      });
    }
  }, [history, userRegister]);

  return (
    <Container className="p-2">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>Registration</Card.Header>
            <Card.Body>
              <ErrorAlert errors={userRegisterError} />
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formEmailAddres">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={onEmailChange}
                    type="email"
                    placeholder="Enter email address"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={username}
                    onChange={onUsernameChange}
                    type="text"
                    placeholder="Enter username"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    onChange={onPasswordChange}
                    value={password}
                    type="password"
                    placeholder="Enter password"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    onChange={onConfirmPasswordChange}
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirm password"
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" disabled={isFetching}>
                  {isFetching && <SmallLoader />}
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
