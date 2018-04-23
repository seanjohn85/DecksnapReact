import React from "react";
import {Redirect} from "react-router-dom";
import Card from "./Card";
import {GetCards} from './ApiCalls/GetCards';
import {GetCat} from './ApiCalls/GetCat';
import OwlCarousel from 'react-owl-carousel';
import user from "./User";
import {CardTitle} from 'react-materialize';




//view cards screen
class Cards extends React.Component {
  constructor(props) {
    super(props);
    //state to page data
    this.state = {
      //used to redirect if not logged in
      redirect: false,
      cards: [],
      cat : [],
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
      //bind functions to change loaded cards
      this.actors = this.actors.bind(this);
      this.superhero = this.superhero.bind(this);

  }

  componentWillMount() {
    //ensure user is logged in other wise redirect
   if(user.user.userId){
      console.log(`userId is ${user.user.userId}`);
      //loads superhero cards
      this.superhero();
    }else{
     this.setState({redirect: true});
     console.log("not logged in");
   }

  }



    superhero(){
      //later the user id willl be passed in here
      let data = `userId=${user.user.userId}&catId=3`;
      //get Cat from DB
      GetCat('cat', 'catId=3').then((response) => {
        console.log(response.Categories.Cat);
        this.setState({cat: response.Categories.Cat});
      });
      //get the users cards form db
      GetCards('cards', data).then((response) => {
        this.setState({cards: response.Cards});
      });

    }

    actors(){
      //later the user id willl be passed in here
      let data = `userId=${user.user.userId}&catId=1`;
      //get Cat from DB
      GetCat('cat', 'catId=1').then((response) => {
        this.setState({cat: response.Categories.Cat});
      });
      //get the users cards form db
      GetCards('cards', data).then((response) => {
        this.setState({cards: response.Cards});
      });

    }


  render() {

    if(this.state.redirect){
      return(<Redirect to={'/login'}/>)
    }


    const list = this.state.cards.map( (c) => {
      console.log(this.state.cat);
      let cat = this.state.cat;
      let catName = this.state.cat.catName;
      console.log(c.photo);
      let pic;
      if (c.customCard === '0'){
        pic= `../images/${c.photo}.jpg`;
      }else{
        pic = `http://www.decksnaps.com/decksnap/cards/images/${c.photo}`;
      }
            return <Card key={c.cardId} name={c.name} id={c.cardId} cat1={c.cat1} cat2={c.cat2} cat3={c.cat3} cat4={c.cat4} cat5={c.cat5} cat6={c.cat6} cust = {c.customCard}
            photo = {pic} cat = {cat.catName} catN1 ={cat.cat1Name} catN2 ={cat.cat2Name} catN3 ={cat.cat3Name} catN4 ={cat.cat4Name} catN5 ={cat.cat5Name} catN6 ={cat.cat6Name}/>;

        });
    return (
      <div>
      <div className="container">
        <div className="row">
        <h1 className="cap">{user.user.userName}s {this.state.cat.catName} Cards:</h1>
        <OwlCarousel className="owl-theme" {...this.state.options}>
          {list}
        </OwlCarousel>
        </div>
        </div>
        <div className="container">
          <div className="row">
          <h3>Select Category</h3>
        <button className="btn waves-effect waves-light" onClick ={this.actors}>Actors</button>
        <button className="marleft btn waves-effect waves-light" onClick ={this.superhero}>superhero</button>
</div></div>

      </div>

    );
  }
}

export default Cards;
