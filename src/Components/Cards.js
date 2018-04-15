import React from "react";
import OwlCarousel from 'react-owl-carousel';


//view cards screen
class Cards extends React.Component {
  constructor(props) {
    super(props);
    //state to hold cards
    this.state = {
      cards: [],
      cat : [],
      options: {
               loop: true,
               margin:20,
               nav:false,
               center:true,
               responsive:{
                   0:{
                       items:1
                   },
                   600:{
                       items:2
                   },
                   1000:{
                       items:3
                   }
               }
           }
    };
  }


  componentWillMount() {


    let url = 'http://www.decksnaps.com/decksnap/cards/getcards.php';
    //later the user id willl be passed in here
    let data = `userId=16&catId=3`;
    //get the users cards form db
    fetch(url, {
    //post required by api
    method: 'POST',
    //data for request
    body: data,
    //sets send recieve datatypes
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
       }
    }).then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      console.log(data);
      this.setState({cards: data.Cards});
      console.log(this.state.cards);
    })
    .catch(error => {
      console.log(error);
    });
    }



  render() {

    const list = this.state.cards.map( (c) => {
      console.log(c.photo);
            return <Card key={c.cardId} name={c.name} id={c.cardId} cat1={c.cat1} cat2={c.cat2} cat3={c.cat3} cat4={c.cat4} cat5={c.cat5} cat6={c.cat6} cust = {c.customCard} photo = {`../images/${c.photo}.jpg`}/>;

        });
    return (
      <div>
        <h1>Your cards are:</h1>
        <OwlCarousel
	className="owl-theme" {...this.state.options}
	 

>
        {list}
        </OwlCarousel>
      </div>

    );
  }
}



class Card extends React.Component {
  render() {
    return (
      <div className="item superhero" >
        <img alt={this.props.name} src={this.props.photo}/>
        <h3>{this.props.name}</h3>
        <div className="catLab" >
          <h4>{this.props.cat1}</h4>
          cat
        </div>
        <div className="catLab" >
          <h4>{this.props.cat2}</h4>
          cat
        </div>
        <div className="catLab" >
          <h4>{this.props.cat3}</h4>
          cat
        </div>
        <div className="catLab" >
          <h4>{this.props.cat4}</h4>
          cat
        </div>
        <div className="catLab" >
          <h4>{this.props.cat5}</h4>
          cat
        </div>
        <div className="catLab" >
          <h4>{this.props.cat6}</h4>
          cat
        </div>




      </div>
    );
  }
}











export default Cards;
