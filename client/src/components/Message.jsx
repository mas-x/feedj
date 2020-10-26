import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, Button } from "react-bootstrap";

dayjs.extend(relativeTime);
const Message = ({ message, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <p>{message.message}</p>
          <small className="align-self">
            {dayjs(message.createdAt).fromNow()}
          </small>
        </div>

        <Button
          variant="danger"
          className="align-self-start"
          onClick={(e) => onDelete(message._id)}
        >
          <i className="fas fa-trash-alt"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Message;
