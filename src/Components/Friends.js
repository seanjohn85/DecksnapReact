import React from "react";
import user from "./User";
import {Redirect} from "react-router-dom";

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

//when the user is logged in
class Friends extends React.Component {

  constructor(props){
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
    if(this.state.redirect){
      return(<Redirect to={'/login'}/>)
    }
    console.log("user is" + user.user.userName);

    return (
      <div>
        <h1>Welcome {user.user.userName}</h1>
      </div>
    );
  }
}

export default Friends;
