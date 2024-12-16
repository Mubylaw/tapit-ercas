import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

export function configureStoreFn() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
  });

  return store;
}
