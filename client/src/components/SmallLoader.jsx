import React from "react";
import { Spinner } from "react-bootstrap";

const SmallLoader = () => {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
      className="mr-2"
    />
  );
};

export default SmallLoader;
