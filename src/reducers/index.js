/*import {combineReducers} from 'redux';

import user from "./userReducer";
import test from "./testReducer";

export default ({
  user,
  test
})
*/

import { combineReducers } from 'redux';

const userReducer = (state = "john", action) =>{
  if(action.type === "CHANGE_USERNAME"){
    state = {...state, name: action.val};
  }
  return state;
};
const idReducer = (state = {name: "johe"}, action) =>{
  if(action.type === "CHANGE_ID"){
    state = {...state, id : action.val};
  }
  return state;
};

const rootReducer = combineReducers({
  state: (state = {userName: userReducer, userId : idReducer}) => state
});


export default rootReducer;
