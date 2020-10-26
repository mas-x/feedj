import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  UPDATE_PROFILE_SUCCESS,
  DELETE_ACCOUNT_SUCCESS,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  LOG_OUT,
} from "../constants/Constants";
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        isFetching: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userInfo: action.payload,
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        isFetching: false,
        userLoginError: action.payload,
      };
    }
    case USER_REGISTER_REQUEST: {
      return {
        isFetching: true,
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userRegister: action.payload,
      };
    }
    case USER_REGISTER_FAILED: {
      return {
        ...state,
        isFetching: false,
        userRegisterError: action.payload,
      };
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          username: action.payload.username,
          email: action.payload.username,
        },
      };
    }
    case DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        userInfo: null,
      };
    }
    case UPDATE_PROFILE_PICTURE_SUCCESS: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          imageUrl: action.payload.imageUrl,
        },
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        userInfo: null,
      };
    }
    default: {
      return state;
    }
  }
};
