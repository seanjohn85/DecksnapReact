import React from "react";


//view cards screen
class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
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
            return <Card key={c.cardId} name={c.name} id={c.cardId} cat1={c.cat1} cat2={c.cat1} cat3={c.cat1} cat4={c.cat1} cat5={c.cat1} cat6={c.cat1} cust = {c.customCard} photo = {`../images/${c.photo}.jpg`}/>;

        });
    return (
      <div>
        <h1>My users are:</h1>
        {list}
      </div>
    );
  }
}



class Card extends React.Component {
  render() {
    return (
      <div style={{'borderStyle': 'dotted'}}>
        <h3>{this.props.name}</h3>
        <p>{this.props.id}</p>
        <p>{this.props.cat1}</p>
        <img alt={this.props.name} src={this.props.photo}/>
      </div>
    );
  }
}

export default Cards;
