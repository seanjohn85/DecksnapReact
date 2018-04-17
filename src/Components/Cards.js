import React from "react";
import {Redirect} from "react-router-dom";
import Card from "./Card";
import {GetCards} from './ApiCalls/GetCards'
import OwlCarousel from 'react-owl-carousel';
import update from 'immutability-helper';
import axios from 'axios';


//view cards screen
class Cards extends React.Component {
  constructor(props) {
    super(props);
    //state to page data
    this.state = {
      //used to redirect if not logged in
      redirect: false,
      cards: [],
      cat : "super",
      //owl OwlCarousel settind
      options: {
               loop: true,
               margin:20,
               nav:false,
               center:true,
               animateOut: true,
               //sets responsive values
               responsive:{
                   0:{items:1},
                   600:{items:2},
                   1000:{items:3}
               }
           }
    };

      this.actors = this.actors.bind(this);
  }

  componentWillMount() {
    //ensure user is logged in other wise redirect
    if(sessionStorage.getItem("userId")){
      console.log(`userId is ${sessionStorage.getItem("userId")}`);
    }else{
     this.setState({redirect: true});
    }

    //later the user id willl be passed in here
    let data = `userId=${sessionStorage.getItem("userId")}&catId=3`;
    //get the users cards form db
    GetCards('cards', data).then((response) => {

      this.setState({cards: response.Cards});
    });

    }

    actors(){
      //later the user id willl be passed in here
      let data = `userId=${sessionStorage.getItem("userId")}&catId=1`;
      //get the users cards form db
      GetCards('cards', data).then((response) => {

        console.log(response.Cards);

        this.setState({cards: response.Cards});
      });

    }


  render() {

    if(this.state.redirect){
      return(<Redirect to={'/login'}/>)
    }


    const list = this.state.cards.map( (c) => {
      console.log(c.photo);
      let pic;
      if (c.customCard === '0'){
        pic= `../images/${c.photo}.jpg`;
      }else{
        pic = `http://www.decksnaps.com/decksnap/cards/images/${c.photo}`;
      }
            return <Card key={c.cardId} name={c.name} id={c.cardId} cat1={c.cat1} cat2={c.cat2} cat3={c.cat3} cat4={c.cat4} cat5={c.cat5} cat6={c.cat6} cust = {c.customCard}
            photo = {pic}/>;

        });
    return (
      <div>
        <h1>Your cards are:</h1>
        <OwlCarousel className="owl-theme" {...this.state.options}>
          {list}
        </OwlCarousel>
        <button onClick ={this.actors}>Actors</button>
      </div>

    );
  }
}

export default Cards;
