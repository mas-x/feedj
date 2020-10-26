import React, { useState } from "react";
import { Form, Card, Button, Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearProfileAlert,
  updateProfile,
} from "../store/actions/profileActions";
import ErrorAlert from "./ErrorAlert";
import SmallLoader from "../components/SmallLoader";
import { updateProfilePicture } from "./../store/actions/profileActions";
import SuccessAlert from "./SuccessAlert";
const AccountGeneralCard = ({ userInfo }) => {
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const {
    updateProfileError,
    isProfileUpdated,
    updateProfilePictureError,
    updateProfilePictureSuccess,
    isFetching,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(username, email));
  };

  const handleFileChange = (e) => {
    dispatch(updateProfilePicture(e.target.files[0]));
    e.target.value = "";
  };
  return (
    <Card>
      <Card.Header>
        {" "}
        <i className="fas fa-home mr-2"></i> General
      </Card.Header>
      <Card.Body>
        <ErrorAlert errors={updateProfilePictureError} />
        {updateProfilePictureSuccess && (
          <SuccessAlert
            message="Profile picture updated successfully"
            onClose={() => dispatch(ClearProfileAlert())}
          />
        )}
        <Row className="mb-2 align-items-center text-center text-lg-left">
          <Col lg={3} className="p-2">
            {userInfo.imageUrl ? (
              <img
                src={`/uploads/${userInfo.imageUrl}`}
                alt="Profile"
                className="circle-image"
              />
            ) : (
              <i className="fas fa-user-circle fa-7x"></i>
            )}
          </Col>
          <Col>
            <Form>
              <Form.Group>
                <Form.File id="image" onChange={handleFileChange} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {<ErrorAlert errors={updateProfileError} />}
        {isProfileUpdated && (
          <SuccessAlert
            message="Successfully updated"
            onClose={() => dispatch(ClearProfileAlert())}
          />
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              value={email}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              value={username}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" disabled={isFetching}>
            {isFetching && <SmallLoader />}Save
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AccountGeneralCard;
