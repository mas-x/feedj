import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Row,
  Button,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postMessage } from "./../store/actions/messageActions";
import { getProfile } from "./../store/actions/profileActions";
import SmallLoader from "../components/SmallLoader";
import Loader from "../components/Loader";
const ProfileScreen = ({ match }) => {
  const [message, setMessage] = useState("");
  const { messagePosted, messagePostError } = useSelector(
    (state) => state.messages
  );
  const { userInfo } = useSelector((state) => state.auth);
  const { userProfile, isFetching } = useSelector((state) => state.profile);
  const isFetchingForMessages = useSelector(
    (state) => state.messages.isFetching
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(match.params.username));
  }, [dispatch, match.params.username]);
  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(postMessage(match.params.username, message));
    setMessage("");
  };

  return (
    <Container className="m-2">
      <Row>
        <Col lg={{ span: 6, offset: 5 }}>
          {isFetching ? (
            <Loader />
          ) : (
            <>
              {userProfile ? (
                <>
                  <Row className="align-items-center text-center text-md-left p-2">
                    <Col sm={4}>
                      {userProfile.imageUrl ? (
                        <img
                          src={`/uploads/${userProfile.imageUrl}`}
                          alt="Profile"
                          className="circle-image"
                        />
                      ) : (
                        <i className="fas fa-user-circle fa-7x"></i>
                      )}
                    </Col>
                    <Col className="flex-grow-1">
                      <h1>@{userProfile.username}</h1>
                    </Col>
                  </Row>
                  {messagePosted && (
                    <Alert variant="success">
                      <small>Message Posted</small>
                    </Alert>
                  )}
                  {messagePostError && (
                    <Alert variant="danger">An error occurred</Alert>
                  )}
                  <Card>
                    <Card.Header>
                      Send an anonymouse message to @{userProfile.username}
                    </Card.Header>
                    <Card.Body>
                      {userInfo &&
                      userInfo.username === match.params.username ? (
                        <div className="text-align-center">
                          Sorry, you cannot message yourself.
                        </div>
                      ) : (
                        <>
                          <Form onSubmit={sendMessage}>
                            <Form.Group controlId="message">
                              <Form.Control
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                }}
                                value={message}
                                as="textarea"
                                placeholder="Say what you wanna say ;)  "
                              ></Form.Control>
                            </Form.Group>
                            <div className="d-flex justify-content-end">
                              <Button type="submit" disabled={isFetchingForMessages}>
                                {isFetchingForMessages && <SmallLoader />}
                                <i className="fas fa-paper-plane"></i> Send
                              </Button>
                            </div>
                          </Form>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </>
              ) : (
                <div className="text-center">
                  <h1>User not found</h1>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
