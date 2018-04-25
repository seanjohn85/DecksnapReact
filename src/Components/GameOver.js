import React from "react";
import user from "./User";


//used to display the gave ove rimage
class GameOver extends React.Component {
  render() {

    //checks who won and displays relevent image
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card center-align">
            <div className="card-content center-align ">
              {user.user.winner === "draw" && (
                <img
                  className="responsive-img"
                  alt="draw"
                  src={"../images/draw.jpeg"}/>
              )}
              {user.user.winner == user.user.userId && (
                <img
                  className="responsive-img"
                  alt="draw"
                  src={"../images/win.gif"}/>
              )}
              {user.user.winner !== "draw" &&
                user.user.winner != user.user.userId && (
                  <img
                    className="responsive-img"
                    alt="draw"
                    src={"../images/lose.jpg"}/>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOver;
