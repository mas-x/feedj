import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../store/actions/profileActions";
import ErrorAlert from "./ErrorAlert";
import SmallLoader from "../components/SmallLoader";
const AccountDeleteCard = ({ history }) => {
  const { isAccountDeleted, deleteAccountError, isFetching } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAccountDeleted) {
      history.push("/");
    }
  }, [history, dispatch, isAccountDeleted]);
  const handleDelete = () => {
    dispatch(deleteAccount());
  };
  return (
    <Card>
      <Card.Header>
        <i className="fas fa-trash-alt mr-2"></i> Delete Account
      </Card.Header>
      <Card.Body>
        {deleteAccountError && <ErrorAlert errors={deleteAccountError} />}
        <p>Please keep in mind you won't be able to undo this action.</p>
        {/*  <p>All your messages will be deleted too.</p> */}
        <Button variant="danger" onClick={handleDelete} disabled={isFetching}>
          {isFetching && <SmallLoader />} Delete Account
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AccountDeleteCard;
