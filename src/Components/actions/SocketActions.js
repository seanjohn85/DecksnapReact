import { socketConnect } from 'socket.io-react';

//user nickname

export function connectWithUserId(props, id) {
        props.socket.emit("connectPlayer", id);
        console.log("user connected to socket");
    }

    //when a user logs out of the app this messsages is sent to the server and any
    //ungoing activity is destroyed
    export function logoutapp(id) {
        socket.emit("logoutapp", id)
    }

    ///Decksnap game messages to the socket server

  //request to join a game sends user id
  export function play(id, catId) {
      socket.emit("play", id, catId)
  }

  //make an ingame move sents move the playersId and the room/gameId
  export function playermove(move, playerId, roomId) {
      socket.emit("playermove", move, playerId, roomId)
  }
  //when a player is ready to go to the game screen tell the server
  export function startGame(roomId, myId){
      socket.emit("startgame", roomId, myId);
  }
  //when a game is over exit the room
  export function finishgame(myId, roomId){
      socket.emit("finishgame", myId, roomId);
  }
  //if a user quits a game
  export function quitegame(myId, roomId){
      socket.emit("quitegame", myId, roomId);
  }

  // challange another user - sending the user info cat info ect
  export function challange(myId, catId, player2, userName){
      socket.emit("challange", myId, catId, player2, userName);
  }

  //accept a challange - sending back the info for the challange
  export function acceptchallenge(player1, catId, player2, room){
      socket.emit("acceptchallenge", player1, catId, player2, room);
  }

  //decline a challange - the server will then notify this player
  export function delinechallenge(player1, catId, player2, room, name){
      socket.emit("delinechallenge", player1, catId, player2, room, name);
  }
