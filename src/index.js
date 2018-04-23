import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main";
import { Button, Card, Row, Col} from 'react-materialize';
import "./index.css";

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

//const socket = io.connect('http://159.65.85.150');

//socket.on('message', msg => console.log(msg));

//loods the main menu
ReactDOM.render(
  <Main/>,
  document.getElementById("root")
);
//center nav content
let element = document.getElementsByClassName("col");
  element[0].classList.add("container");
