import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { onLogout, keepLogin, cookieChecked } from './actions';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import AllProductPage from './components/AllProductPage';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import SearchPage from './components/SearchPage';
import SmartphonePage from './components/SmartphonePage';
import AdminPage from './components/AdminPage';
import AdminProductPage from './components/AdminProductPage';
import AdminTransactionPage from './components/AdminTransactionPage';
import Footer from './components/Footer';

const cookies = new Cookies();

class App extends Component {
  // componentWillMount() {
  //   const cookieNya = cookies.get('CinemaBertasbih');
  //   if(cookieNya !== undefined) {
  //       this.props.keepLogin(cookieNya);
  //   }
  //   else {
  //       this.props.cookieChecked();
  //   }
  // }

  // componentWillReceiveProps(newProps) {
  //   if(newProps.auth.username !== "") {
  //       cookies.set("LoggedInUser", newProps.auth.username, { path: '/' });
  //   }
  //   else if(newProps.auth.username == "" && this.props.auth.username !== newProps.auth.username) {
  //     this.props.keepLogin(cookies.get("LoggedInUser"))
  //   }
  // }

  componentWillMount() {
    const cookieNya = cookies.get('LoginCookies');
    if(cookieNya !== undefined) {
        this.props.keepLogin(cookieNya);
    }
    else {
        this.props.cookieChecked();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.auth.username === "" && (this.props.auth.username !== newProps.auth.username)) {
        cookies.remove('LoginCookies');
    }
    else if(newProps.auth.username !== "" && (this.props.auth.username !== newProps.auth.username)) {
      cookies.set('LoginCookies', newProps.auth.username, { path: '/' });
    }
  }

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
          {/* <Route path="/adminpage" component={AdminPage} /> */}
          <Route path="/admintransactionpage" component={AdminTransactionPage} />
          <Route path="/adminproductpage" component={AdminProductPage} />
          <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const auth = state.auth;

  return { auth };
}

export default withRouter(connect(mapStateToProps, { onLogout, keepLogin, cookieChecked })(App));
