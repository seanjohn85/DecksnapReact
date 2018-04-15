import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import cookie from "react-cookie";



/*
//login
let url = 'http://www.decksnaps.com/decksnap/loginregister/login.php';
let data = 'username=jk&password=jk';

fetch(url, {
method: 'POST',
//prams ro get user data
body: data,
headers : {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
   }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => {
console.log('Success:', response);
console.log('name:', response.Login.Username);

//req.session.user = response.Login.Username;
//console.log('name:', req.session.user);
});*/


class App extends React.Component {
  render (){

    return <h1>The name {this.props.name} contains {this.props.name.length} characters!</h1>;
  }
}


export default App;
