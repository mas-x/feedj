import React from "react";
import Alert from "react-bootstrap/Alert";
const ErrorAlert = ({ errors }) => {
  return (
    <>
      {errors &&
        errors.length &&
        errors.map &&
        errors.map((err, index) => {
          return (
            <Alert key={index} variant="danger">
              <small>{err.msg}</small>
            </Alert>
          );
        })}

      {errors && errors.errorMessage && (
        <Alert variant="danger">
          <small>{errors.errorMessage}</small>
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
