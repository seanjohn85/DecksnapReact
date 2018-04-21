import {EventEmitter} from "events";
import Dispatcher from "./Dispatcher";


class User extends EventEmitter{
  constructor(){
    super()
    this.user ={
      userName : "",
      userId : "",
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
    this.gameMode = true;
    this.emit("gameOn");
  }

  quitGame(){
    this.gameMode = true;
    this.emit("gameOff");
  }

  handleActions(action){
    console.log("action recieved", action);
    switch (action.type) {
      case "LOGIN":{
        this.login(action.userName, action.userId);
        break;
      }case "LOGOUT":{
        this.logout();
        break;
      }
    }
  }
}

const user = new User();
Dispatcher.register(user.handleActions.bind(user));


export default user;
