import Axios from "axios";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  LOG_OUT,
} from "../constants/Constants";
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await Axios.post(
      "https://feedj.herokuapp.com/api/auth",
      {
        username,
        password,
      },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: err.response ? err.response.data : err.message,
    });
  }
};

export const register = (username, email, password, confirmPassword) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await Axios.post(
      "https://feedj.herokuapp.com//api/users",
      {
        username,
        email,
        password,
        confirmPassword,
      },
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const logOut = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: LOG_OUT,
  });
};
