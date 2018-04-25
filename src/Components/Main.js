import React from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Cards from "./Cards";
import Login from "./Login";
import Register from "./Register";
import GameOver from "./GameOver";
import Friends from "./Friends";
import Play from "./Play";
import user from "./User";
import * as UserActions from "./actions/UserActions";
import {Button, Card, Row, Col, SideNav, Navbar, NavItem, Footer} from "react-materialize";
import manager from "./SocketManager";

//navbar and routing page

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      gameMode: false,
      menu: []
    };
  }
  componentWillMount() {
    //when the user logs on connect to the websocket
    user.on("loggedIn", () => {
      console.log("a user logged in");
      this.setState({ loggedIn: true });
      manager.connectWithUserId(parseInt(user.user.userId));
    });

    //when the user logs out change the state
    user.on("loggedout", () => {
      console.log("logged Out");
      this.setState({ loggedIn: false });
    });
  }

  logout() {
    UserActions.logout();
  }

  render() {
    //nav menu and routing of all pages
    return (
      <BrowserRouter>
        <div>
          <header>
            <div className="navbar-fixed ">
              <Navbar container="true" right brand="DeckSnap">
                <ul className="right hide-on-med-and-down">
                  <li>
                    <NavLink exact to="/">
                      Home
                    </NavLink>
                  </li>
                  {this.state.loggedIn && (
                    <li>
                      <NavLink to="/friends">Friends</NavLink>
                    </li>
                  )}
                  {this.state.loggedIn && (
                    <li>
                      <NavLink to="/play">Play</NavLink>
                    </li>
                  )}
                  {this.state.loggedIn && (
                    <li>
                      <NavLink to="/cards">Cards</NavLink>
                    </li>
                  )}
                  {this.state.loggedIn && (
                    <li>
                      <button
                        className="btn waves-effect waves-light"
                        onClick={this.logout}
                      >
                        LogOut
                      </button>
                    </li>
                  )}
                  {!this.state.loggedIn && (
                    <li>
                      <NavLink to="/register">Register</NavLink>
                    </li>
                  )}
                  {!this.state.loggedIn && (
                    <li>
                      <NavLink to="/login">Login</NavLink>
                    </li>
                  )}
                </ul>
              </Navbar>
            </div>
          </header>
          <main className="valign-wrapper ">
            <div className="container mainContent">
              <div className="content">
                <Route exact path="/" component={Home} />
                <Route path="/play" component={Play} />
                <Route path="/cards" component={Cards} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/gameover" component={GameOver} />
                <Route path="/friends" component={Friends} />
              </div>
            </div>
          </main>
          <Footer copyrights="&copy; 2018 DeckSnap" />
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
