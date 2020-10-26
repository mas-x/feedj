import React from "react";
import Alert from "react-bootstrap/Alert";

const SuccessAlert = ({ message, onClose }) => {
  return (
    <Alert variant="success" onClose={onClose} dismissible={onClose}>
      {message}
    </Alert>
  );
};

export default SuccessAlert;
