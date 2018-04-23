import React from "react";
import user from "../User";
import manager from "../SocketManager";


export function CardView(props){
  if (props.myCard.name){

    return(
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card center-align">
            <div className="card-content center-align ">
      <div className={"item gameCard " + props.cat.catName}>
        <img className="responsive-img" alt={props.myCard.name} src={'../images/'+ props.myCard.photo +'.jpg'}/>
        <h2>{props.myCard.name}</h2>
        <div onClick = {() => clicked('cat1')} className="catLab mouseChange" >
          <h4>{props.myCard.cat1}</h4>
          {props.cat.cat1Name}
        </div>
        <div onClick = {() => clicked('cat2')}  className="catLab mouseChange" >
          <h4>{props.myCard.cat2}</h4>
          {props.cat.cat2Name}
        </div>
        <div onClick = {() => clicked('cat3')} className="catLab mouseChange" >
          <h4>{props.myCard.cat3}</h4>
          {props.cat.cat3Name}
        </div>
        <div onClick = {() => clicked('cat4')}  className="catLab mouseChange" >
          <h4>{props.myCard.cat4}</h4>
          {props.cat.cat4Name}
        </div>
        <div onClick = {() => clicked('cat5')} className="catLab mouseChange" >
          <h4>{props.myCard.cat5}</h4>
          {props.cat.cat5Name}
        </div>
        <div onClick = {() => clicked('cat6')}  className="catLab mouseChange" >
          <h4>{props.myCard.cat6}</h4>
          {props.cat.cat6Name}
        </div>

      </div>
      </div>
      </div>
      </div>
      </div>


    );
  }else{
    return(
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card center-align">
            <div className="card-content center-align ">
            <h2>Waiting On Player 2</h2>
            <div className="loader"></div>
            </div>
            </div>
            </div>
            </div>
  
    );
  }

}




function clicked(cat){
  console.log('clicked' + cat);
  console.log(user.user.game.pturn);
  console.log(user.user.userId);

  //if its this users turn inform server of user selection
  if(user.user.userId == user.user.game.pturn){
    console.log("my turn");
    manager.playermove(cat, parseInt(user.user.userId), user.user.game.gameName)
  }else{
    console.log("not your turn");
  }
}
