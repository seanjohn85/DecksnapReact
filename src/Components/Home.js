import React from "react";
import user from "./User";

class Home extends React.Component {
  render() {
    console.log(`test ${user.user.userName}`);
    return (
      <div>
        <h2>home</h2>
      </div>
    );
  }
}

export default Home;
