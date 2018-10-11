import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import AllProductPage from './components/AllProductPage';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import SearchPage from './components/SearchPage';
import SmartphonePage from './components/SmartphonePage';

class App extends Component {
  
  render() {
    return (
      <div>
          <Header />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cartpage" component={CartPage} />
          <Route exact path="/productdetails" component={ProductDetails} />
          <Route path ="/allproductpage" component={AllProductPage} />
          <Route path ="/smartphonepage" component={SmartphonePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/searchpage" component={SearchPage} />
      </div>
    );
  }
}

export default App;
