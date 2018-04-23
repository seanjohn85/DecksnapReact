import React from "react";

//used to create each card on the slider
class Card extends React.Component {

  render() {

    return (

      <div className= {'item ' + this.props.cat}>
        <img alt={this.props.name} src={this.props.photo}/>
        <h3>{this.props.name}</h3>
        <div className="catLab" >
          <h4>{this.props.cat1}</h4>
          {this.props.catN1}
        </div>
        <div className="catLab" >
          <h4>{this.props.cat2}</h4>
          {this.props.catN2}
        </div>
        <div className="catLab" >
          <h4>{this.props.cat3}</h4>
          {this.props.catN3}
        </div>
        <div className="catLab" >
          <h4>{this.props.cat4}</h4>
          {this.props.catN4}
        </div>
        <div className="catLab" >
          <h4>{this.props.cat5}</h4>
          {this.props.catN5}
        </div>
        <div className="catLab" >
          <h4>{this.props.cat6}</h4>
          {this.props.catN6}
        </div>
      </div>
    );
  }
}

export default Card;
