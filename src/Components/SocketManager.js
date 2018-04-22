import {EventEmitter} from "events";
import io from 'socket.io-client';

class SocketManager extends EventEmitter{
  constructor(){
    super()
    this.socket = io.connect('http://159.65.85.150');
  }

  //user nickname
      connectWithUserId(id) {
          this.socket .emit("connectPlayer", id);
          console.log("user connected to socket");
      }

      //when a user logs out of the app this messsages is sent to the server and any
      //ungoing activity is destroyed
      logoutapp(id) {
          this.socket .emit("logoutapp", id)
      }


}

const manager = new SocketManager();



export default manager;
