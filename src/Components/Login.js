import React from "react";
import {Redirect} from "react-router-dom";
import {LoginPost} from './ApiCalls/LoginPost';

import user from "./User";
import * as UserActions from "./actions/UserActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // the states used to hold the form details
    this.state = {username: '', password: '',  redirect: false};

    // This binding is necessary to make `this` work in the callback
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

  }

  //stores the elements when the user change sthe data in the form
  handleInputChange(event) {
   const target = event.target;
   const value =  target.value;
   const name = target.name;

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
     [name]: value
   });
  }

//triggered when the user hits the submit button
  handleSubmit(event) {
    //gets all the data from the state and create the post request body
     let data = `username=${this.state.username}&password=${this.state.password}`;
     //calls the fetch method and uses the results to store a session for the user logging the user in
     LoginPost('login', data).then((response) => {

       //used to add an error message
      if (response.Login.Result === "Failed"){
        console.log("invalid log in details");
      }
      //successiful login, session created and page redirected
      else{
        UserActions.login(response.Login.Username, response.Login.UserId);

        //console.log(`Name ${response.Register.Username}`);
        //console.log(`id ${response.Register.UserId}`);

        //this.setState({redirect: true});
      }
    });
    //removes the default button action
    event.preventDefault();
  }

  render() {
    //redirect if the user is logged in
   if (this.state.redirect) {
      return (<Redirect to={'/home'}/>)
    }

    if(user.user.userId){
      return (<Redirect to={'/home'}/>)
    }
    //return the html input form
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name= "username" value={this.state.username} onChange={this.handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name= "password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <button className="btn waves-effect waves-light" type="submit">Submit
    <i className="material-icons right">send</i></button>
      </form>
    );
  }
}

export default Login;
