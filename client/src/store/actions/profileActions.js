import Axios from "axios";
import {
  USER_PROFILE_FAILED,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_REQUEST,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_FAILED,
  DELETE_ACCOUNT_SUCCESS,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_FAILED,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  CLEAR_PROFILE_ALERTS,
} from "../constants/Constants";
export const getProfile = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await Axios.get(`/api/users/${username}`, config);
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_PROFILE_FAILED,
      payload: err.response ? err.response.data : err.message,
    });
  }
};

export const updateProfile = (username, email) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
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
    const { data } = await Axios.put(
      "/api/users/update",
      {
        username,
        email,
      },
      config
    );

    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        token: userInfo.token,
        username,
        email,
      })
    );
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: UPDATE_PROFILE_FAILED,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const updatePassword = (newPassword, currentPassword) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
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
    const { data } = await Axios.put(
      "/api/users/password",
      {
        newPassword,
        currentPassword,
      },
      config
    );
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILED,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const deleteAccount = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ACCOUNT_REQUEST,
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
    const { data } = await Axios.delete("api/users/", config);
    localStorage.clear();
    dispatch({
      type: DELETE_ACCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("Error", error);
    dispatch({
      type: DELETE_ACCOUNT_FAILED,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const updateProfilePicture = (file) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE_PICTURE_REQUEST });
    const {
      auth: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: userInfo.token,
      },
    };
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await Axios.post("/api/users/upload", formData, config);
    dispatch({
      type: UPDATE_PROFILE_PICTURE_SUCCESS,
      payload: data,
    });
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...userInfo,
        imageUrl: data.imageUrl,
      })
    );
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_PICTURE_FAILED,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const ClearProfileAlert = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE_ALERTS,
  });
};
