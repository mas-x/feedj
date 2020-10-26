import {
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAILED,
  MESSAGE_DELETE_FAILED,
  MESSAGE_DELETE_REQUEST,
  MESSAGE_DELETE_SUCCESS,
  MESSAGE_POST_REQUEST,
  MESSAGE_POST_SUCCESS,
  MESSAGE_POST_FAILED,
} from "./../constants/Constants";
export const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case MESSAGE_LIST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        messagesList: action.payload,
      };
    }
    case MESSAGE_LIST_FAILED: {
      return {
        ...state,
        isFetching: false,
        messagesListError: action.payload,
      };
    }

    case MESSAGE_DELETE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case MESSAGE_DELETE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        messagesList: state.messagesList.filter(
          (msg) => msg._id !== action.payload.id
        ),
      };
    }
    case MESSAGE_DELETE_FAILED: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case MESSAGE_POST_REQUEST: {
      return {
        ...state,
        isFetching: true,
        messagePostError: null,
        messagePosted: false
      };
    }
    case MESSAGE_POST_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        messagePosted: true,
      };
    }
    case MESSAGE_POST_FAILED: {
      return {
        ...state,
        isFetching: false,
        messagePostError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
