import React from "react";
import user from "./User";

//home screen
class Home extends React.Component {
  render() {
    return (
      <div className="mainScreen">
        <h1> Welcome To DeckSnap</h1>
        <style>
          {"\
                .valign-wrapper{\
                  background-color: #2d3e50!important;;\
                }\
              "}
        </style>
      </div>
    );
  }
}

export default Home;
