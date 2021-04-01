import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import researchReducer from './research.reducer';

export default combineReducers({
  loginReducer,
  researchReducer,
});
