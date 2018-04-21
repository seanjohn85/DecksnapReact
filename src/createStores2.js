import {applyMiddleware, createStore } from "redux";

//import logger from 'redux-logger';

/*const reducer = function(state, action){
    if (action.type === "login"){
      return  state.user = action.payload;
    }
    return state;
}*/


const logger = (store) => (next) => (action){
  console.log("action", action);
  next(action);
}
const middleware = applyMiddleware(logger);

const userReducer = (state = '', action) =>{
  if(action.type === "CHANGE_USERNAME"){
    state = {..state, action.newValue};
  }
  return state;
};
const idReducer = (state = '', action) =>{
  if(action.type === "CHANGE_ID"){
    state = {..state, action.newValue};
  }
  return state;
};

const reducers = combineReducers({user : userReducer, id : idReducer});
const store = createStore(reducers, middleware);


store.subscribe(() =>{
  console.log(`store changed ${store.getState()}`);
})


//store.dispatch({type: "CHANGE_USERNAME", newValue: "joe"})
//store.dispatch({type: "CHANGE_ID", newValue: 1})

/*store.dispatch({type: "login", payload: 1})
store.dispatch({type: "login", payload: 10})
store.dispatch({type: "login", payload: 12})
store.dispatch({type: "login", payload: 11})*/

export default createStore (reducers, middleware);
