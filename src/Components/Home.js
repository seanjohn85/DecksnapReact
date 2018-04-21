import React from "react";
import user from "./User";

class Home extends React.Component {
  render() {

    return (
      <div>
        <h2>{user.user.userId}</h2>
      </div>
    );
  }
}

export default Home;
