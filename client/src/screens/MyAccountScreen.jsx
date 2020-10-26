import React, { useState, useEffect } from "react";
import { ListGroup, Container, Col, Row } from "react-bootstrap";
import AccountGeneralCard from "./../components/AccountGeneralCard";
import AccountUpdatePasswordCard from "./../components/AccountUpdatePasswordCard";
import AccountDeleteCard from "./../components/AccountDeleteCard";
import { useSelector } from "react-redux";

const MyAccountScreen = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) history.push("/login");
  }, [history, userInfo]);
  const onGeneral = (e) => {
    setCurrentPage(0);
  };
  const onUpdatePassword = (e) => {
    setCurrentPage(1);
  };
  const onDeleteAccount = (e) => {
    setCurrentPage(2);
  };
  return (
    <Container>
      <Row className="mt-2">
        <Col md={4}>
          <ListGroup as="ul" className="menu-item">
            <ListGroup.Item
              as="li"
              onClick={onGeneral}
              className={currentPage === 0 && "active"}
            >
              <i className="fas fa-home mr-2"></i>General
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              onClick={onUpdatePassword}
              className={currentPage === 1 && "active"}
            >
              <i className="fas fa-key mr-2"></i>
              Update Password
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className={currentPage === 2 && "active"}
              onClick={onDeleteAccount}
            >
              <i className="fas fa-trash-alt mr-2"></i>
              Delete Account
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          {currentPage === 0 && userInfo && (
            <AccountGeneralCard userInfo={userInfo} />
          )}
          {currentPage === 1 && userInfo && <AccountUpdatePasswordCard />}
          {currentPage === 2 && userInfo && <AccountDeleteCard />}
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccountScreen;
