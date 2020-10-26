import React, { useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "./../store/actions/profileActions";
import ErrorAlert from "./ErrorAlert";
import SmallLoader from "../components/SmallLoader";
const AccountUpdatePasswordCard = () => {
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { updatePasswordError, isPasswordUpdated, isFetching } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(password, currentPassword));
  };

  return (
    <Card>
      <Card.Header>
        <i className="fas fa-key mr-2"></i>Update Password
      </Card.Header>
      <Card.Body>
        {updatePasswordError && <ErrorAlert errors={updatePasswordError} />}
        {isPasswordUpdated && (
          <Alert variant="success">Password updated successfully!</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              value={currentPassword}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" disabled={isFetching}>
            {isFetching && <SmallLoader />}Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AccountUpdatePasswordCard;
