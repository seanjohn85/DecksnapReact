import React from "react";
import user from "./User";
import * as UserActions from "./actions/UserActions";
import { Button, Card, Row, Col, SideNav, Navbar, NavItem} from 'react-materialize';
import manager from "./SocketManager";
import {GetCards} from './ApiCalls/GetCards';
import {GetCat} from './ApiCalls/GetCat';

class Play extends React.Component {

  constructor(){
    super();
    this.state = {
      cards: [],
      cat : [],
      player: "",
      oppCards : []
    }

  }

  componentWillMount(){
    this.getCards(user.user.userId)

    user.on("gameDetails", () => {
      console.log("game details loaded");
      if (user.user.userId == user.user.game.play1){
        this.getOppCards(user.user.game.play2);
      }else{
        this.getOppCards(user.user.game.play1);
      }

    });

    manager.on("showCard", () => {
      console.log("show card 1");
    });

  }

  getCards(id){
    //later the user id willl be passed in here
    let data = `userId=${id}&catId=1`;
    //get Cat from DB
    GetCat('cat', 'catId=1').then((response) => {
      this.setState({cat: response.Categories.Cat});
    });
    GetCards('cards', data).then((response) => {

      this.setState({cards: response.Cards});
    });
  }

  getOppCards(id){
    //later the user id willl be passed in here
    let data = `userId=${id}&catId=1`;
    GetCards('cards', data).then((response) => {
      console.log(`id p2 is ${user.user.game}`);
      this.setState({oppCards: response.Cards});
      //manager.startGame(user.user.game.gameName, parseInt(user.user.userId))
    });
  }






  render() {
    manager.play(parseInt(user.user.userId), 1);

    console.log(this.state.cards);
    console.log(this.state.oppCards);
    return (
      <div>
        <h2>"new game"</h2>
      </div>
    );
  }
}

export default Play;
