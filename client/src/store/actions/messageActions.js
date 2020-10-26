import Axios from "axios";
import {
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAILED,
  MESSAGE_DELETE_FAILED,
  MESSAGE_DELETE_REQUEST,
  MESSAGE_DELETE_SUCCESS,
  MESSAGE_POST_REQUEST,
  MESSAGE_POST_FAILED,
  MESSAGE_POST_SUCCESS,
} from "../constants/Constants";

export const listMessages = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_LIST_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };

    const { data } = await Axios.get("/api/messages", config);
    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: MESSAGE_LIST_FAILED,
      payload: err.response ? err.data : err.message,
    });
  }
};

export const deleteMessage = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MESSAGE_DELETE_REQUEST,
    });
    const {
      auth: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };
    const { data } = await Axios.delete(`/api/messages/${id}`, config);
    dispatch({
      type: MESSAGE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: MESSAGE_DELETE_FAILED,
    });
  }
};

export const postMessage = (username, message) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGE_POST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await Axios.post(
      `/api/messages/${username}`,
      {
        message,
      },
      config
    );
    dispatch({ type: MESSAGE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MESSAGE_POST_FAILED,
      payload: error.response ? error.response.data : error.message,
    });
  }
};
