import Dispatcher from "../Dispatcher";

export function login(userName, userId){
  Dispatcher.dispatch({
    type: "LOGIN",
    userName : userName,
    userId : userId
  })
}

export function startGame(game){
  Dispatcher.dispatch({
    type: "STARTGAME",
    game : game
  })
}

export function logout(){
  Dispatcher.dispatch({
    type: "LOGOUT"
  })
}
