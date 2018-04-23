import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Main";
import { Button, Card, Row, Col, CardTitle} from 'react-materialize';
import "./index.css";

ReactDOM.render(
  <Main/>,
  document.getElementById("root")
);
//center nav content
let element = document.getElementsByClassName("col");
element[0].classList.add("container");
