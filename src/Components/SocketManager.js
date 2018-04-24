import { EventEmitter } from "events";
import { SocketProvider } from "socket.io-react";
import io from "socket.io-client";
import user from "./User";
import * as UserActions from "./actions/UserActions";

class SocketManager extends EventEmitter {
  constructor() {
    super();
    //connect to the socket server ip
    this.socket = io.connect("http://165.227.228.2");
    //listen for socket messages from the server
    this.socket.on("connectToRoom", msg => console.log(msg));
    this.socket.on("roomname", msg => console.log(msg));
    //set the game elements
    this.socket.on("gameloaded", function(name, p1, p2, turn, p1c, p2c) {
      let game = {
        gameName: name,
        play1: p1,
        play2: p2,
        pturn: turn,
        p1card: p1c,
        p2card: p2c,
        p1Remaining: 15,
        p2Remaining: 15,
        handWon: 0,
        move: ""
      };
      UserActions.startGame(game);
    });
    this.socket.on("startgamenow", function() {
      user.showCard();
    });
    this.socket.on("roomname", function() {
      console.log("roomname");
    });
    this.socket.on("result", function(p1Cards, p2Cards, turn, p1card, p2card, won, move) {
      console.log("startgamenow");

      user.upgateGame(p1Cards, p2Cards, turn, p1card, p2card, won, move);
    });
    this.socket.on("winnerid", function(winner) {
      console.log(`winner id ${winner}`);
      user.win(winner);
    });
  }

  //user nickname
  connectWithUserId(id) {
    this.socket.emit("connectPlayer", id);
    console.log("user connected to socket");
  }

  //when a user logs out of the app this messsages is sent to the server and any
  //ungoing activity is destroyed
  logoutapp(id) {
    this.socket.emit("logoutapp", id);
  }

  ///Decksnap game messages to the socket server

  //request to join a game sends user id
  play(id, catId) {
    this.socket.emit("play", id, catId);
  }

  //make an ingame move sents move the playersId and the room/gameId
  playermove(move, playerId, roomId) {
    this.socket.emit("playermove", move, playerId, roomId);
  }
  //when a player is ready to go to the game screen tell the server
  startGame(roomId, myId) {
    this.socket.emit("startgame", roomId, myId);
  }
  //when a game is over exit the room
  finishgame(myId, roomId) {
    this.socket.emit("finishgame", myId, roomId);
  }
  //if a user quits a game
  quitegame(myId, roomId) {
    this.socket.emit("quitegame", myId, roomId);
  }

  // challange another user - sending the user info cat info ect
  challange(myId, catId, player2, userName) {
    this.socket.emit("challange", myId, catId, player2, userName);
  }

  //accept a challange - sending back the info for the challange
  acceptchallenge(player1, catId, player2, room) {
    this.socket.emit("acceptchallenge", player1, catId, player2, room);
  }

  //decline a challange - the server will then notify this player
  delinechallenge(player1, catId, player2, room, name) {
    this.socket.emit("delinechallenge", player1, catId, player2, room, name);
  }
}

const manager = new SocketManager();

export default manager;
