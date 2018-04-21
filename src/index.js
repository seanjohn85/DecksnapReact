import React from "react";
import ReactDOM from "react-dom";
import {Redirect} from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Main from "./Components/Main";
import { Button, Card, Row, Col, SideNav } from 'react-materialize';
import "./index.css";
//import store from "./store";

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);


//loods the main menu
ReactDOM.render(

<Provider store ={createStoreWithMiddleware(reducers)}>
  <Main/>
  </Provider>,
  document.getElementById("root")
);
