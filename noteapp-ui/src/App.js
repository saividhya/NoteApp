import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header.js';
import Routes from './components/routes.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Jumbotron } from 'reactstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Routes/>
      </div>
    );
  }
}

export default App;
