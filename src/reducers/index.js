import { combineReducers } from "redux";
import DataReducer from "./stockData-reducer";

const reducers = {
  dataReducer: DataReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
