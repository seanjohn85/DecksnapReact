import React from "react";
import {Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Cards from "./Cards";
import Login from "./Login";
import Register from "./Register";
import Play from "./Play";
import user from "./User";
import * as UserActions from "./actions/UserActions";
import { Button, Card, Row, Col, SideNav, Navbar, NavItem} from 'react-materialize';
import manager from "./SocketManager";




class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn : false,
      gameMode : false,
    }

  }
  componentWillMount(){

    user.on("loggedIn", () => {
      console.log("a user logged in");
      this.setState({loggedIn: true});
      manager.connectWithUserId(parseInt(user.user.userId));

      //send.connectWithUserId(parseInt(user.user.userId));
    });

    user.on("loggedout", () => {
      console.log("logged Out");
      this.setState({loggedIn: false})
    });

  }

  logout(){
     UserActions.logout();
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
        <li><NavLink to="/play">Play Game</NavLink></li>
        <li><NavLink to="/cards">Cards</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><button onClick ={this.logout}>LogOut</button></li>
        </ul>
    </Navbar>


  </div>

<div className="container">
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/play" component={Play}/>
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
