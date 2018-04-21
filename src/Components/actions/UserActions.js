import Dispatcher from "../Dispatcher";

export function login(userName, userId){
  Dispatcher.dispatch({
    type: "LOGIN",
    userName : userName,
    userId : userId
  })
}

export function logout(){
  Dispatcher.dispatch({
    type: "LOGOUT"
  })
}
