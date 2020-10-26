import {
  USER_PROFILE_FAILED,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PASSWORD_FAILED,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  DELETE_ACCOUNT_FAILED,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  UPDATE_PROFILE_PICTURE_REQUEST,
  UPDATE_PROFILE_PICTURE_FAILED,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  CLEAR_PROFILE_ALERTS,
} from "../constants/Constants";
const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case USER_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userProfile: action.payload,
      };
    }
    case USER_PROFILE_FAILED: {
      return {
        ...state,
        isFetching: false,
        userProfileError: action.payload,
      };
    }

    case UPDATE_PROFILE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        updateProfileError: null,
        isProfileUpdated: null,
      };
    }
    case UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isProfileUpdated: true,
      };
    }
    case UPDATE_PROFILE_FAILED: {
      return {
        ...state,
        isFetching: false,
        updateProfileError: action.payload,
      };
    }
    case UPDATE_PASSWORD_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isPasswordUpdated: false,
        updatePasswordError: null,
      };
    }
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        isPasswordUpdated: true,
      };
    }
    case UPDATE_PASSWORD_FAILED: {
      return {
        ...state,
        isFetching: false,
        updatePasswordError: action.payload,
      };
    }
    case DELETE_ACCOUNT_REQUEST: {
      return {
        ...state,
        isFetching: false,
        deleteAccountError: null,
      };
    }
    case DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        isAccountDeleted: true,
      };
    }
    case DELETE_ACCOUNT_FAILED: {
      return {
        ...state,
        deleteAccountError: action.payload,
      };
    }

    case UPDATE_PROFILE_PICTURE_REQUEST: {
      return {
        isFetching: true,
      };
    }
    case UPDATE_PROFILE_PICTURE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        updateProfilePictureSuccess: true,
      };
    }
    case UPDATE_PROFILE_PICTURE_FAILED: {
      return {
        ...state,
        isFetching: false,
        updateProfilePictureError: action.payload,
      };
    }
    case CLEAR_PROFILE_ALERTS: {
      return {}; //no states to store only alerts
    }

    default: {
      return state;
    }
  }
};
export default profileReducer;
