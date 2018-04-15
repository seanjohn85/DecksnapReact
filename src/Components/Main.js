import React from "react";
import {Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Cards from "./Cards";
import Login from "./Login";

class Main extends React.Component {


  render() {
    return (
      <BrowserRouter>
        <div>

        <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper container">
        <a href="#!" className="brand-logo">Logo</a>
        <ul className="right hide-on-med-and-down">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/cards">Cards</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        </ul>

        <ul id="nav-mobile" className="sidenav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      </div>
    </nav>
  </div>

<div className="container">
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/cards" component={Cards}/>
            <Route path="/login" component={Login}/>
          </div>
        </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
