import React from 'react';
var jwt = require('jsonwebtoken');



class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', email: '',    v: ''};

    // This binding is necessary to make `this` work in the callback
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
      //this.state =  { userId: cookie.load('userId') }
    }
  handleInputChange(event) {
   const target = event.target;
   const value = target.type === 'checkbox' ? target.checked : target.value;
   const name = target.name;

   console.log(`Input name ${name}. Input value ${value}.`);

   this.setState({
     [name]: value
   });
 }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    let url = 'http://www.decksnaps.com/decksnap/loginregister/register.php';
    let data = `username=${this.state.username}&password=${this.state.password}&email=${this.state.email}&dob=${this.state.dob}`;

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: data, // data can be `string` or {object}!
    headers : {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
       }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response);
      if (response.Register.Result === "Taken"){
        console.log("user name already taken please try again");

      }
      else{

        var u = {
       username: response.Register.Username,
       userId: response.Register.UserId};

       jwt.sign({
  data: u
}, 'secret');

console.log(jwt.data)

        console.log(`Name ${response.Register.Username}`);
        console.log(`id ${response.Register.UserId}`);

      }
    });

    event.preventDefault();

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name= "username" value={this.state.username} onChange={this.handleInputChange} />
        </label>
        <label>
          Password:
          <input type="text" name= "password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <label>
          Email:
          <input type="text" name= "email" value={this.state.email} onChange={this.handleInputChange} />
        </label>
        <label>
          Dob:
          <input type="text" name="email" value={this.state.dob} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


export default Register;
