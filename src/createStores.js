import { createStore } from "redux";

const reducer = function(state, action){
    if (action.type === "login"){
      return  state.user = action.payload;
    }
    return state;
}
const store = createStore(reducer, {user : '', id : ''}});

store.subscribe(() =>{
  console.log(`store changed ${store.getState()}`);
})

store.dispatch({type: "login", payload: 1})
store.dispatch({type: "login", payload: 10})
store.dispatch({type: "login", payload: 12})
store.dispatch({type: "login", payload: 11})
