import {EventEmitter} from "events";
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import user from "./User";
import * as UserActions from "./actions/UserActions";

class SocketManager extends EventEmitter{
  constructor(){
    super()
    this.socket = io.connect('http://159.65.85.150');

    this.socket.on('connectToRoom', msg => console.log(msg));
    this.socket.on('roomname', msg => console.log(msg));
    this.socket.on('gameloaded', function (name, p1, p2, turn, p1c, p2c) {
        console.log("startgamenow");
        let game = {"gameName": name, "play1" : p1, "play2" : p2, "pturn": turn, "p1card" :p1c, "p2card" : p2c};
        UserActions.startGame(game);

    });
    this.socket.on('startgamenow', function () {
        console.log("startgamenow");
        this.emit("showCard");

    });
    this.socket.on('roomname', function () {
        console.log("roomname");

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
          this.socket.emit("logoutapp", id)
      }

      ///Decksnap game messages to the socket server

    //request to join a game sends user id
    play(id, catId) {
        this.socket.emit("play", id, catId)
    }

    //make an ingame move sents move the playersId and the room/gameId
    playermove(move, playerId, roomId) {
        this.socket.emit("playermove", move, playerId, roomId)
    }
    //when a player is ready to go to the game screen tell the server
    startGame(roomId, myId){
        this.socket.emit("startgame", roomId, myId);
    }
    //when a game is over exit the room
    finishgame(myId, roomId){
        this.socket.emit("finishgame", myId, roomId);
    }
    //if a user quits a game
    quitegame(myId, roomId){
        this.socket.emit("quitegame", myId, roomId);
    }

    // challange another user - sending the user info cat info ect
    challange(myId, catId, player2, userName){
        this.socket.emit("challange", myId, catId, player2, userName);
    }

    //accept a challange - sending back the info for the challange
    acceptchallenge(player1, catId, player2, room){
        this.socket.emit("acceptchallenge", player1, catId, player2, room);
    }

    //decline a challange - the server will then notify this player
    delinechallenge(player1, catId, player2, room, name){
        this.socket.emit("delinechallenge", player1, catId, player2, room, name);
    }

    /*socket.on('connectToRoom', function () {
        console.log("here");

    });


    this.socket.on('gameloaded', function () {
        console.log("gameloaded");

    });
    this.socket.on('result', function () {
        console.log("result");

    });
    this.socket.on('disco', function () {
        console.log("disco");

    });
    this.socket.on('delinedby', function () {
        console.log("delinedby");

    });
    this.socket.on('incomingchallange', function () {
        console.log("incomingchallange");

    });
    this.socket.on('quit', function () {
        console.log("quit");

    });

    this.socket.on('winnerid', function () {
        console.log("winnerid");

    });
    this.socket.on('startgamenow', function () {
        console.log("startgamenow");

    });
    this.socket.on('roomname', function () {
        console.log("roomname");

    });

    io.on('delinedby', function (msg, msg2) {
            console.log(msg, msg2);

            alert("Challenege decliend by " + msg);
        });*/




}

const manager = new SocketManager();



export default manager;
