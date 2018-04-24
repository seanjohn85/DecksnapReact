import React from "react";
import user from "./User";
import { Redirect } from "react-router-dom";
import { Card, CardTitle } from "react-materialize";

/*
to be added later
//get friends
url = 'http://www.decksnaps.com/decksnap/friends/findfriends.php';
data = 'userId=1';

fetch(url, {
method: 'POST', // or 'PUT'
body: data, // data can be `string` or {object}!
headers : {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
     }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));

*/

//when the user is logged in displays users friends
class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used to redirect if not logged in
      redirect: false,
      user: ""
    };
  }

  componentWillMount() {
    //if there is not user id redirect as user is not logged in
    if (!user.user.userId) {
      this.setState({ redirect: true });
    }

    //whwn the user loggs out
    user.on("loggedout", () => {
      this.setState({ redirect: true });
    });

    user.on("loggedIn", () => {
      this.setState({ user: user.user.userName });
    });
  }

  render() {
    //if the user is not logged in redirect
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }
    console.log("user is" + user.user.userName);

    //returns html content
    return (
      <div>
        <h1>Welcome {user.user.userName}</h1>

        <Card
          className="small friend"
          header={
            <CardTitle image="../images/friends.png">Coming Soon!!😀</CardTitle>
          }
          actions={[
            <a href="http://www.apple.com">Now Availible on app store</a>
          ]}
        >
          <ul>
            <li>Find Friends</li>
            <li>Add Friends</li>
            <li>Challenge Friends</li>
            <li>View Game history with friends</li>
            <li>...and much more</li>
          </ul>
        </Card>
      </div>
    );
  }
}

export default Friends;
