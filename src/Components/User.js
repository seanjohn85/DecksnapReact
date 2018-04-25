import { EventEmitter } from "events";
import Dispatcher from "./Dispatcher";

//global state class
class User extends EventEmitter {
  constructor() {
    super();
    //global state
    this.user = {
      userName: "",
      userId: "",
      game: {},
      gameMode: false,
      winner: ""
    };
  }
  //when user logs in
  login(userName, userId) {
    this.user.userName = userName;
    this.user.userId = userId;
    this.emit("loggedIn");
  }

  showCard() {
    this.emit("showCard");
  }
  //update the gsme object
  upgateGame(p1Cards, p2Cards, turn, p1card, p2card, won, move) {
    this.user.game.pturn = turn;
    this.user.game.p1card = p1card;
    this.user.game.p2card = p2card;
    this.user.game.p1Remaining = p1Cards;
    this.user.game.p2Remaining = p2Cards;
    this.user.game.handWon = won;
    this.user.game.move = move;
    this.emit("result");
  }
  //emit to load win screen
  win(win) {
    this.user.winner = win;
    this.emit("winner");
  }
  //when user logs out emit for redirects
  logout() {
    this.user.userName = "";
    this.user.userId = "";
    this.emit("loggedout");
  }
  playGame() {
    this.user.gameMode = true;
    this.emit("gameOn");
  }
//when game is ready to be quit
  quitGame() {
    this.user.gameMode = false;
    this.emit("gameOff");
  }
  //when game is ready to be started set game and emoit
  startGame(game) {
    this.user.game = game;
    console.log(game);
    this.emit("gameDetails");
  }
  //handles user actions  all funtions should be added here
  handleActions(action) {
    console.log("action recieved");
    switch (action.type) {
      case "LOGIN": {
        this.login(action.userName, action.userId);
        break;
      }
      case "LOGOUT": {
        this.logout();
        break;
      }
      case "STARTGAME": {
        this.startGame(action.game);
        break;
      }
    }
  }
}

const user = new User();
Dispatcher.register(user.handleActions.bind(user));

export default user;
