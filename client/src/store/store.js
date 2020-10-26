import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { messageReducer } from "./reducers/messageReducer";
import profileReducer from "./reducers/profileReducer";
const { combineReducers, createStore, applyMiddleware } = require("redux");

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
  profile: profileReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  auth: {
    userInfo: userInfoFromStorage,
  },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
