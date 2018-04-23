import React from "react";
import user from "./User";
import * as UserActions from "./actions/UserActions";
import { Button, Card, Row, Col, SideNav, Navbar, NavItem} from 'react-materialize';
import manager from "./SocketManager";
import {GetCards} from './ApiCalls/GetCards';
import {GetCat} from './ApiCalls/GetCat';
import GameCard from "./GameCard";
import * as GameActions from "./actions/GameActions";
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

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
      iamP1 : false,
      modalIsOpen: false,
    }

    this.getCards = this.getCards.bind(this);
    this.getOppCards = this.getOppCards.bind(this);
    this.setMyCard = this.setMyCard.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

    user.on("result", () => {
      console.log("result");
      this.openModal();
      wait(5000);
      this.closeModal();
      this.setMyCard();
    });

  }

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

openModal() {
   this.setState({modalIsOpen: true});
 }


 closeModal() {
   this.setState({modalIsOpen: false});

 }

 afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }



  render() {

    let props = {
      myCard : this.state.myCurrentCard,
      cat : this.state.cat,
      oppCard : this.state.oppCurrentCard
      }

    return (
      <div>
        <GameActions.CardView  {...props}/>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>{user.user.game.handWon}</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
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
