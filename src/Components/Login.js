import React from "react";
import {Redirect} from "react-router-dom";
import {LoginPost} from './ApiCalls/LoginPost';
import Home from "./Home";

import user from "./User";
import * as UserActions from "./actions/UserActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    // the states used to hold the form details
    this.state = {username: '', password: '',  redirect: false, error: ""};

    // This binding is necessary to make `this` work in the callback
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

    user.on("loggedIn", () => {
        this.setState({redirect: true})
      });
  }

  //stores the elements when the user change sthe data in the form
  handleInputChange(event) {
   const target = event.target;
   const value =  target.value;
   const name = target.name;

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
     [name]: value,
     error : ""

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
        this.setState({error : "Invalid username or password entered please try again!"});
      }
      //successiful login, session created and page redirected
      else{
        UserActions.login(response.Login.Username, response.Login.UserId);
        //this.setState({redirect: true});
      }
    });
    //removes the default button action
    event.preventDefault();
  }

  render() {

    console.log(this.state.error);
    //redirect if the user is logged in
   if (this.state.redirect) {
      return (<Redirect to={'/home'}/>)
    }

    if(user.user.userId){
      return (<Redirect to={'/home'}/>)
    }
    //return the html input form
    return (

      <div className="valign-wrapper" >
    <div className="valign">
        <div className="container">
           <div className="row">
              <div className="col s12 m8 offset-m2">
                 <div className="card">
                    <div className="card-content">
                       <span className="card-title black-text">Sign In</span>
                         <form>
                          <div className="row">
                             <div className="input-field col s12">
                                <input type="text" name= "username" value={this.state.username} onChange={this.handleInputChange}  className="validate"/>
                                <label  className="active">UserName</label>
                             </div>
                          </div>
                          <div className="row">
                             <div className="input-field col s12">
                                <input type="password" name= "password" value={this.state.password} onChange={this.handleInputChange} className="validate"/>
                                <label className="active">Password</label>
                             </div>
                          </div>
                          <div className="row">
                             <div className="input-field col s12 error">
                              {this.state.error}
                             </div>
                          </div>
                       </form>
                    </div>
                    <div className="card-action">
                    <button onClick={this.handleSubmit}className="btn waves-effect waves-light" type="submit">Sign In
                <i className="material-icons right">send</i></button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
    </div>
</div>


    );
  }
}

export default Login;
