import Dispatcher from "../Dispatcher";

///user funtions more to be added so the user class isnt accessed directly
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
