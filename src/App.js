import React, { Component } from 'react';

import './App.css';
// import 'mdbreact/dist/css/mdb.css';
// import 'font-awesome/css/font-awesome.min.css';

import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import AllProductPage from './components/AllProductPage';



class App extends Component {
  
  render() {
    return (
      <div>
          <Header />
          <Route exact path="/" component={HomePage} />
          <Route path ="/allproductpage" component={AllProductPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
      </div>
    );
  }
}

export default App;
