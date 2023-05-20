import { legacy_createStore, combineReducers } from "redux";
import dataReducer from "./reducer";

const myStore = legacy_createStore(
  combineReducers({
    dataReducer
  })
);

export default myStore;
