import React from "react";
import user from "./User";
import manager from "./SocketManager";

export function CardView(props){
  if (props.myCard.name){
    console.log(`my card is ${props.myCard.cat1}`);
    console.log(`my card is ${props.myCard.cat2}`);
    console.log(`my card is ${props.myCard.cat3}`);
    console.log(`my card is ${props.myCard.cat4}`);
    console.log(`my card is ${props.myCard.cat5}`);
    console.log(`my card is ${props.myCard.cat6}`);
    console.log(`my card is ${props.myCard.photo}`);
    console.log(`my card is ${props.cat.catName}`);
    console.log(`my card is ${props.cat.cat1Name}`);
    console.log(`my card is ${props.cat.cat2Name}`);
    console.log(`my card is ${props.cat.cat3Name}`);
    console.log(`my card is ${props.cat.cat4Name}`);
    console.log(`my card is ${props.cat.cat5Name}`);
    console.log(`my card is ${props.cat.cat6Name}`);
    return(
      <div className={props.cat.catName}>
        <img alt={props.myCard.name} src={'../images/'+ props.myCard.photo +'.jpg'}/>
        <h2>{props.myCard.name}</h2>
        <div onClick = {() => clicked('cat1')} className="catLab" >
          <h4>{props.myCard.cat1}</h4>
          {props.cat.cat1Name}
        </div>
        <div onClick = {() => clicked('cat2')}  className="catLab" >
          <h4>{props.myCard.cat2}</h4>
          {props.cat.cat2Name}
        </div>
        <div onClick = {() => clicked('cat3'))} className="catLab" >
          <h4>{props.myCard.cat3}</h4>
          {props.cat.cat3Name}
        </div>
        <div onClick = {() => clicked('cat4')}  className="catLab" >
          <h4>{props.myCard.cat4}</h4>
          {props.cat.cat4Name}
        </div>
        <div onClick = {() => clicked('cat5')} className="catLab" >
          <h4>{props.myCard.cat5}</h4>
          {props.cat.cat5Name}
        </div>
        <div onClick = {() => clicked('cat6')}  className="catLab" >
          <h4>{props.myCard.cat6}</h4>
          {props.cat.cat6Name}
        </div>

      </div>
    );
  }else{
    return(
      <h2>hello</h2>
    );
  }

}




function clicked(cat){
  console.log('clicked' + cat);
  if(user.user.userId == user.user.game.turn){
    console.log("my turn");
  }
}
