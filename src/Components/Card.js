import React from "react";

//used to create each card on the slider
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

export default Card;
