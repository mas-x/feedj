import React, { useEffect, useState } from "react";
import { Alert, Container, Button, Modal, Form, Col } from "react-bootstrap";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessage, listMessages } from "./../store/actions/messageActions";
import Loader from "./../components/Loader";

const MessagesScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { messagesList, messagesListError, isFetching } = useSelector(
    (state) => state.messages
  );

  const [showProfileLink, setShowProfileLink] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(listMessages());
  }, [dispatch]);

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id));
  };

  return (
    <Container className="p-2">
      {userInfo ? (
        <>
          <div className="title-container mb-2 mt-2 d-flex flex-row justify-content-between">
            <h1>My Messages</h1>

            <Button
              variant="info"
              className="align-self-center"
              onClick={() => setShowProfileLink(true)}
            >
              <i class="fas fa-share"></i>
            </Button>
          </div>
          <Modal
            show={showProfileLink}
            onHide={() => setShowProfileLink(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Share your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Share following link with others and have them post your message
                on your profile anonymously.
              </p>
              <Form>
                <Form.Group>
                  <Form.Row>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        value={`https://${window.location.hostname}/profile/${userInfo.username}`}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Button
                        as="span"
                        variant="secondary"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${window.location.hostname}/profile/${userInfo.username}`
                          )
                        }
                      >
                        <i class="fas fa-copy"></i>
                      </Button>
                    </Col>
                  </Form.Row>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={() => setShowProfileLink(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <hr />
          {isFetching ? (
            <Loader />
          ) : (
            <>
              {messagesListError && (
                <Alert variant="danger">
                  <Alert.Heading>Oh snap!, An error occurred </Alert.Heading>
                  <p>{messagesListError.errorMessage}</p>
                </Alert>
              )}
              {messagesList && messagesList.length > 0 ? (
                messagesList.map((message) => (
                  <Message
                    key={message._id}
                    message={message}
                    onDelete={handleDeleteMessage}
                  />
                ))
              ) : (
                <div>You do not have any messages yet!</div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <p>Not logged in!</p>
        </>
      )}
    </Container>
  );
};

export default MessagesScreen;
