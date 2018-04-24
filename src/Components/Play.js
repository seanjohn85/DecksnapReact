import React from "react";
import user from "./User";
import { Redirect } from "react-router-dom";
import * as UserActions from "./actions/UserActions";
import manager from "./SocketManager";
import { GetCards } from "./ApiCalls/GetCards";
import { GetCat } from "./ApiCalls/GetCat";
import * as GameActions from "./actions/GameActions";
import Modal from "react-responsive-modal";
import { Col } from "react-materialize";

//play game screen
class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      //used to redirect if not logged in
      redirect: false,
      gameOver: false,
      cards: [],
      cat: [],
      player: "",
      oppCards: [],
      myCurrentCard: {},
      oppCurrentCard: {},
      iamP1: false,
      open: false
    };
    //bind functions
    this.getCards = this.getCards.bind(this);
    this.getOppCards = this.getOppCards.bind(this);
    this.setMyCard = this.setMyCard.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentWillMount() {
    //if there is not user id redirect as user is not logged in
    if (!user.user.userId) {
      this.setState({ redirect: true });
    }
    //send a messsage to start a supperhero (cat3) game
    manager.play(parseInt(user.user.userId), 3);
    //get users cards
    this.getCards(user.user.userId);
    //when 2 players are present the socket will set the game details and opponents cards are downloaded here
    user.on("gameDetails", () => {
      console.log("game details loaded");
      if (parseInt(user.user.userId) === parseInt(user.user.game.play1)) {
        this.getOppCards(user.user.game.play2);
        this.setState({ iamP1: true });
      } else {
        this.getOppCards(user.user.game.play1);
        this.setState({ iamP1: false });
      }
    });
    //whwn the game starts
    user.on("showCard", () => {
      console.log("show card 1");
      this.setMyCard();
    });
    //when a hanf finishes
    user.on("result", () => {
      //open compare screen
      this.onOpenModal();
      //wait 5 sec and close
      setTimeout(this.onCloseModal, 5000);
    });
    //when the game is over
    user.on("winner", () => {
      console.log("change screen");
      //leave the room
      manager.finishgame(parseInt(user.user.userId), user.user.game.gameName);
      this.setState({ gameOver: true });
    });
  }
  //modal controls
  onOpenModal() {
    this.setState({ open: true });
    console.log(`hand winner id ${user.user.game.handWon}`);
  }
  onCloseModal() {
    this.setState({ open: false });
    //get the
    this.setMyCard();
  }
  //get this users cards
  getCards(id) {
    //later the user id willl be passed in here
    let data = `userId=${id}&catId=3`;
    //get Cat from DB
    //get Cat from DB
    GetCat("cat", "catId=3").then(response => {
      console.log(response.Categories.Cat);
      this.setState({ cat: response.Categories.Cat });
    });
    GetCards("cards", data).then(response => {
      this.setState({ cards: response.Cards });
    });
  }
  //get oppponents cards
  getOppCards(id) {
    //later the user id willl be passed in here
    let data = `userId=${id}&catId=3`;
    GetCards("cards", data).then(response => {
      console.log(`id p2 is ${user.user.game}`);
      this.setState({ oppCards: response.Cards });
      manager.startGame(user.user.game.gameName, parseInt(user.user.userId));
    });
  }
  //function to get both users current cards
  setMyCard() {
    //loop through and set cards
    for (let i = 0; i < this.state.cards.length; i++) {
      if (this.state.iamP1) {
        if (
          parseInt(user.user.game.p1card) ===
          parseInt(this.state.cards[i].cardId)
        ) {
          console.log(
            `my card is ${this.state.cards[i].cardId} ${
              this.state.cards[i].name
            }`
          );
          this.setState({ myCurrentCard: this.state.cards[i] });
        }
        if (
          parseInt(user.user.game.p2card) ===
          parseInt(this.state.oppCards[i].cardId)
        ) {
          console.log(
            `opp card is ${this.state.oppCards[i].cardId} ${
              this.state.oppCards[i].name
            }`
          );
          this.setState({ oppCurrentCard: this.state.oppCards[i] });
        }
      } else {
        if (
          parseInt(user.user.game.p2card) ===
          parseInt(this.state.cards[i].cardId)
        ) {
          console.log(
            `my card is ${this.state.cards[i].cardId} ${
              this.state.cards[i].name
            }`
          );
          this.setState({ myCurrentCard: this.state.cards[i] });
        }
        if (
          parseInt(user.user.game.p1card) ===
          parseInt(this.state.oppCards[i].cardId)
        ) {
          console.log(
            `opp card is ${this.state.oppCards[i].cardId} ${
              this.state.oppCards[i].name
            }`
          );
          this.setState({ oppCurrentCard: this.state.oppCards[i] });
        }
      }
    }
  }
  //render the view
  render() {
    //if the user is not loged in redirect from this page
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    } else if (this.state.gameOver) {
      return <Redirect to={"/gameover"} />;
    }
    // set the win screen messages
    let userMsg;
    let oppMsg;
    if (user.user.game.move === "cat1") {
      userMsg = `${this.state.cat.cat1Name} ${this.state.myCurrentCard.cat1}`;
      oppMsg = `${this.state.cat.cat1Name} ${this.state.oppCurrentCard.cat1}`;
    } else if (user.user.game.move === "cat2") {
      userMsg = `${this.state.cat.cat2Name} ${this.state.myCurrentCard.cat2}`;
      oppMsg = `${this.state.cat.cat2Name} ${this.state.oppCurrentCard.cat2}`;
    } else if (user.user.game.move === "cat3") {
      userMsg = `${this.state.cat.cat3Name} ${this.state.myCurrentCard.cat3}`;
      oppMsg = `${this.state.cat.cat3Name} ${this.state.oppCurrentCard.cat3}`;
    } else if (user.user.game.move === "cat4") {
      userMsg = `${this.state.cat.cat4Name} ${this.state.myCurrentCard.cat4}`;
      oppMsg = `${this.state.cat.cat4Name} ${this.state.oppCurrentCard.cat4}`;
    } else if (user.user.game.move === "cat5") {
      userMsg = `${this.state.cat.cat5Name} ${this.state.myCurrentCard.cat5}`;
      oppMsg = `${this.state.cat.cat5Name} ${this.state.oppCurrentCard.cat5}`;
    } else if (user.user.game.move === "cat6") {
      userMsg = `${this.state.cat.cat6Name} ${this.state.myCurrentCard.cat6}`;
      oppMsg = `${this.state.cat.cat6Name} ${this.state.oppCurrentCard.cat6}`;
    }

    //set the props fro the game screen
    let props = {
      myCard: this.state.myCurrentCard,
      oppCard: this.state.oppCurrentCard,
      cat: this.state.cat
    };

    //return html content
    return (
      <div>
        <GameActions.CardView {...props} />
        <Modal open={this.state.open} onClose={this.onCloseModal} little>
          {parseInt(user.user.game.handWon) === parseInt(user.user.userId) ? (
            <h2>You Won</h2>
          ) : (
            <h2>You Lost</h2>
          )}
          <Col s={6}>
            <img className="responsive-img"
              alt={this.state.myCurrentCard.name}
              src={"../images/" + this.state.myCurrentCard.photo + ".jpg"}/>
            <div className="msgbox">{userMsg}</div>
          </Col>

          <Col s={6}>
            <img className="responsive-img"
              alt={this.state.oppCurrentCard.name}
              src={"../images/" + this.state.oppCurrentCard.photo + ".jpg"}/>
            <div className="msgbox">{oppMsg}</div>
          </Col>
        </Modal>
      </div>
    );
  }
}

export default Play;
