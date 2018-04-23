import React from "react";
import user from "./User";
import {Redirect} from "react-router-dom";
import * as UserActions from "./actions/UserActions";
import { Button, Card, Row, Col, SideNav, Navbar, NavItem} from 'react-materialize';
import manager from "./SocketManager";
import {GetCards} from './ApiCalls/GetCards';
import {GetCat} from './ApiCalls/GetCat';
import GameCard from "./GameCard";
import * as GameActions from "./actions/GameActions";
import Modal from 'react-responsive-modal';




class Play extends React.Component {

  constructor(){
    super();
    this.state = {
      //used to redirect if not logged in
      redirect: false,
      cards: [],
      cat : [],
      player: "",
      oppCards : [],
      myCurrentCard : {},
      oppCurrentCard : {},
      iamP1 : false,
      open: false,
    }

    this.getCards = this.getCards.bind(this);
    this.getOppCards = this.getOppCards.bind(this);
    this.setMyCard = this.setMyCard.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);

  }

  componentWillMount(){
    //if there is not user id redirect as user is not logged in
    if(!user.user.userId){
       this.setState({redirect: true});
     }
    //send a messsage to start a supperhero (cat3) game
    manager.play(parseInt(user.user.userId), 3);
    //get users cards
    this.getCards(user.user.userId)
    //when 2 players are present the socket will set the game details and opponents cards are downloaded here
    user.on("gameDetails", () => {
      console.log("game details loaded");
      if (parseInt(user.user.userId) === parseInt(user.user.game.play1)){
        console.log("iam p1");
        this.getOppCards(user.user.game.play2);
        this.setState({iamP1: true});
      }else{
        console.log("iam not p1");
        this.getOppCards(user.user.game.play1);
        this.setState({iamP1: false});
      }

    });


    user.on("showCard", () => {
      console.log("show card 1");
      this.setMyCard();
    });

    user.on("result", () => {
      console.log("result");
      this.onOpenModal();
      wait(5000);
      this.onCloseModal();
      this.setMyCard();
    });

  }

  onOpenModal(){
    this.setState({ open: true });
  };

  onCloseModal(){
    this.setState({ open: false });
  };

  getCards(id){
    //later the user id willl be passed in here
    let data = `userId=${id}&catId=3`;
    //get Cat from DB
    //get Cat from DB
    GetCat('cat', 'catId=3').then((response) => {
      console.log(response.Categories.Cat);
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
    if(this.state.iamP1){
      if(parseInt(user.user.game.p1card) === parseInt(this.state.cards[i].cardId)){
        console.log(`my card is ${this.state.cards[i].cardId} ${this.state.cards[i].name}`);
        this.setState({myCurrentCard: this.state.cards[i]});
      }
      if(parseInt(user.user.game.p2card) === parseInt(this.state.oppCards[i].cardId)){
        console.log(`opp card is ${this.state.oppCards[i].cardId} ${this.state.oppCards[i].name}`);
        this.setState({oppCurrentCard: this.state.oppCards[i]});
      }
    }else{
      if(parseInt(user.user.game.p2card) === parseInt(this.state.cards[i].cardId)){
        console.log(`my card is ${this.state.cards[i].cardId} ${this.state.cards[i].name}`);
        this.setState({myCurrentCard: this.state.cards[i]});
      }
      if(parseInt(user.user.game.p1card) === parseInt(this.state.oppCards[i].cardId)){
        console.log(`opp card is ${this.state.oppCards[i].cardId} ${this.state.oppCards[i].name}`);
        this.setState({oppCurrentCard: this.state.oppCards[i]});
      }
    }
  }



}



  render() {
    //if the user is not loged in redirect from this page
    if(this.state.redirect){
      return(<Redirect to={'/login'}/>)
    }

    let props = {
      myCard : this.state.myCurrentCard,
      oppCard : this.state.oppCurrentCard,
      cat : this.state.cat,

      }

    return (
      <div>
        <GameActions.CardView  {...props}/>
        <Modal open={this.state.open} onClose={this.onCloseModal} little>
          <h2>Simple centered modal</h2>
        </Modal>

      </div>

    );
  }
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}



export default Play;
