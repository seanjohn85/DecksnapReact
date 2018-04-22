import React from "react";
import {Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Cards from "./Cards";
import Login from "./Login";
import Register from "./Register";
import user from "./User";
import * as UserActions from "./actions/UserActions";
import io from 'socket.io-client';
import { Button, Card, Row, Col, SideNav, Navbar, NavItem} from 'react-materialize';

class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn : false,
      gameMode : false,
    }
    var socket = io.connect('http://159.65.85.150');
  }
  componentWillMount(){
  /*  user.on("loggedIn", () => {
      this.setState({loggedIn: true})
    });

    user.on("loggedout", () => {
      console.log("logged Out");
      this.setState({loggedIn: false})
    });*/

  }

  logout(){
     UserActions.login("", "");
     <BrowserRouter>
     <Route exact path="/" component={Login}/>
     </BrowserRouter>
   }


  render() {

    /*
    <Navbar brand='logo' right>
  <NavItem onClick={() => console.log('test click')}>Getting started</NavItem>
  <ul className="right hide-on-med-and-down">
  <li><NavLink exact to="/">Home</NavLink></li>
  <li><NavLink to="/cards">Cards</NavLink></li>
  <li><NavItem to="/register">Register</NavItem></li>
  <li><button onClick ={this.logout}>LogOut</button></li>
  </ul>

</Navbar>
*/

    console.log(`test ${user.user.userName}`);
    console.log(`test ${user.user.userId}`);
    return (

      <BrowserRouter>
        <div>

        <div className="navbar-fixed ">
    <Navbar brand='logo' right   >
        <ul className="right hide-on-med-and-down">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/cards">Cards</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><button onClick ={this.logout}>LogOut</button></li>
        </ul>
    </Navbar>


  </div>

<div className="container">
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/cards" component={Cards}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
          </div>
        </div>
        </div>
      </BrowserRouter>
    );



  }

}



export default Main;
