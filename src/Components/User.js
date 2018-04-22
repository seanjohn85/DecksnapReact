import {EventEmitter} from "events";
import Dispatcher from "./Dispatcher";


class User extends EventEmitter{
  constructor(){
    super()
    this.user ={
      userName : "",
      userId : "",
      game: {},
      gameMode : false
    }
  }

  login(userName, userId){
    this.user.userName = userName;
    this.user.userId = userId;
    this.emit("loggedIn");
  }

  logout(){
    this.user.userName = "";
    this.user.userId = "";
    this.emit("loggedout");
  }
  playGame(){
    this.user.gameMode = true;
    this.emit("gameOn");
  }

  quitGame(){
    this.user.gameMode = false;
    this.emit("gameOff");
  }
  startGame(game){
    this.user.game = game;
    console.log(game);
    this.emit("gameDetails");
  }

  handleActions(action){
    console.log("action recieved");
    switch (action.type) {
      case "LOGIN":{
        this.login(action.userName, action.userId);
        break;
      }case "LOGOUT":{
        this.logout();
        break;
      }
      case "STARTGAME":{
        this.startGame(action.game);
        break;
      }
    }
  }
}

const user = new User();
Dispatcher.register(user.handleActions.bind(user));


export default user;
