import React from "react";
import Spinner from "react-bootstrap/Spinner";
const Loader = () => {
  return (
    <div className="loader d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status" className="d-flex">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
