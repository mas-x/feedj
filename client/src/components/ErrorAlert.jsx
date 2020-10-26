import React from "react";
import Alert from "react-bootstrap/Alert";
const ErrorAlert = ({ errors }) => {
  return (
    <>
      {errors && errors.length && errors.map && (
        <Alert variant="danger">
          {errors.map((err, index) => {
            return (
              <>
                <small key={index}>{err.msg}</small>
                <br />
              </>
            );
          })}
        </Alert>
      )}
      {errors && errors.errorMessage && (
        <Alert variant="danger">
          <small>{errors.errorMessage}</small>
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
