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
      oppCards : [],
      myCurrentCard : {},
      oppCurrentCard : {},
      iamP1 : false
    }

    this.getCards = this.getCards.bind(this);
    this.getOppCards = this.getOppCards.bind(this);
    this.setMyCard = this.setMyCard.bind(this);
  }

  componentWillMount(){
    manager.play(parseInt(user.user.userId), 3);
    this.getCards(user.user.userId)

    user.on("gameDetails", () => {
      console.log("game details loaded");
      if (user.user.userId == user.user.game.play1){
        this.getOppCards(user.user.game.play2);
        this.setState({iamP1: true});
      }else{
        this.getOppCards(user.user.game.play1);
        this.setState({iamP1: false});
      }

    });

    user.on("showCard", () => {
      console.log("show card 1");
      this.setMyCard();
    });

  }

  getCards(id){
    //later the user id willl be passed in here
    let data = `userId=${id}&catId=3`;
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
    let data = `userId=${id}&catId=3`;
    GetCards('cards', data).then((response) => {
      console.log(`id p2 is ${user.user.game}`);
      this.setState({oppCards: response.Cards});
      manager.startGame(user.user.game.gameName, parseInt(user.user.userId))
    });
  }


setMyCard(){

  for (let i = 0; i < this.state.cards.length; i++){
    if(this.state.iamP1 && (user.user.game.p1card == this.state.cards[i].cardId)){
      this.setState({myCurrentCard: this.state.cards[i]});
      console.log("my card found");
    }else if(user.user.game.p2card == this.state.cards[i].cardId){
      console.log(this.state.cards[i].cardId);
      console.log(user.user.game.p2card);
      this.setState({myCurrentCard: this.state.cards[i]});
      console.log("my card found");
    }
  }

  for (let i = 0; i < this.state.oppCards.length; i++){
    if(this.state.iamP1 && (user.user.game.p2card == this.state.oppCards[i].cardId)){
      this.setState({oppCurrentCard: this.state.oppCards[i]});
      console.log("opp card found");
    }else if(user.user.game.p1card == this.state.oppCards[i].cardId){
      this.setState({oppCurrentCard: this.state.oppCards[i]});
      console.log("opp card found");
      console.log(this.state.oppCards[i].cardId);
      console.log(user.user.game.p1card);
    }
  }
}





  render() {


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
