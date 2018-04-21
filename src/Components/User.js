import {EventEmitter} from "events";

class User extends EventEmitter{
  constructor(){
    super()
    this.user ={
      userName : "john",
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

  getUserName(){
    return this.user.userName;
  }

  getUserId(){
    return this.user.userId;
  }

}

const user = new User;


export default user;


/*import React from "react";
import Main from "./Main";

class User extends React.Component {

  constructor(props) {
    super(props);
    //state to page data
    this.state = {
      userName : "John",
      userId : ""
    };
      //bind functions to change loaded cards
      this.login = this.login.bind(this);

  }


  login(){
    this.setState({userName: "John"});
  }

  render() {


    return(
      <div>
        <Main/>
      </div>
    );

  }
}

export default User;*/
