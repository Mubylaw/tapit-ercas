import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import payment from "./payment";

const rootReducer = combineReducers({
  currentUser,
  errors,
  payment,
});

export default rootReducer;
