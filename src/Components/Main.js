import React from "react";
import {Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from "./Home";
import Cards from "./Cards";
import Login from "./Login";
import Register from "./Register";
import user from "./User";

class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn : false,
      gameMode : false,
    }
  }






  logout(){
     sessionStorage.setItem("userId",'');
     sessionStorage.clear();
     <BrowserRouter>
     <Route exact path="/" component={Login}/>
     </BrowserRouter>
   }


  render() {
user.user.userName = "lish";
    console.log(`test ${user.user.userName}`);
    return (

      <BrowserRouter>
        <div>
          <h1>{user.user.userName}</h1>
        <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper container">
        <a href="#!" className="brand-logo">Logo</a>
        <ul className="right hide-on-med-and-down">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/cards">Cards</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><button onClick ={this.logout}>LogOut</button></li>
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
