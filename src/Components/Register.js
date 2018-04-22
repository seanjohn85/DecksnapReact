import React from 'react';
import {Redirect} from "react-router-dom";
import {RegisterPost} from './ApiCalls/RegisterPost';
import user from "./User";
import * as UserActions from "./actions/UserActions";
class Register extends React.Component {
  constructor(props) {
    super(props);
    // the states used to hold the form details
    this.state = {username: '', password: '', email: '',    dob: '', error : "", redirect: false};

    // This binding is necessary to make `this` work in the callback
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

  }

  //stores the elements when the user change sthe data in the form
  handleInputChange(event) {
   const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
     [name]: value
   });
  }

//triggered when the user hits the submit button
  handleSubmit(event) {
    //gets all the data from the state and create the post request body
     let data = `username=${this.state.username}&password=${this.state.password}&email=${this.state.email}&dob=${this.state.dob}`;
     //calls the fetch method and uses the results to store a session for the user logging the user in
     RegisterPost('register', data).then((response) => {
       //used to add an error message
      if (response.Register.Result === "Taken"){
        console.log("user name already taken please try again");
      }
      //successiful login, session created and page redirected
      else{
        UserActions.login(response.Register.Username, response.Register.UserId);
        //sessionStorage.setItem('userName', response.Register.Username);
        //sessionStorage.setItem('userId', response.Register.UserId);
        console.log(`Name ${response.Register.Username}`);
        console.log(`id ${response.Register.UserId}`);

        //this.setState({redirect: true});
      }
    });
    //removes the default button action
    event.preventDefault();
  }

  render() {
    //redirect if the user is logged in
   /*if (this.state.redirect) {
      return (<Redirect to={'/home'}/>)
    }

    if(user.user.userId){
      return (<Redirect to={'/home'}/>)
    }*/
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
        <label>
          Email:
          <input type="text" name= "email" value={this.state.email} onChange={this.handleInputChange} />
        </label>
        <label>
          Dob:
          <input type="text" name="dob" value={this.state.dob} onChange={this.handleInputChange} />
        </label>
        <button class="btn waves-effect waves-light" type="submit">Submit
    <i class="material-icons right">send</i></button>
      </form>
    );
  }

}
export default Register;
