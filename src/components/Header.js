import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
// import NotificationBadge from 'react-notification-badge';
// import {Effect} from 'react-notification-badge';
import { onLogout, keepLogin, cookieChecked, productSearch } from '../actions';
import image1 from '../images/logo.png';
import iconSmartphone from '../images/iphone_icon.png';
import iconLaptop from '../images/laptop_icon.png';
import iconGaming from '../images/gaming_icon.png';
import iconProduct from '../images/product_icon.png';
import iconCart from '../images/cart_icon.png';
import iconLogOut from '../images/LogOut_icon.png';
import iconProfile from '../images/account_icon.png';
import iconAdmin from '../images/admin_add.png';
import iconHistory from '../images/history.png';

class Header extends Component {  
    state = { cart: [] }

    componentWillMount() {
        window.scrollTo(0, 0)
    }

    onLogOutClick = () => {
        this.props.onLogout();
    }

    searchProduct = (value) => {
        // window.location.href =`/searchpage?searchResults=${value}`
        window.location.href =`/allproductpage?search=${value}`
    }

    onSearchPress = (event) => {
        var code = event.keycode || event.which;
        if(code === 13) {
            this.searchProduct(this.search.value);
        }
    }

    renderLeftNavbar = () => {
        return (
            <div>
                <Navbar.Header>
                    <Navbar.Brand >
                        <img id="navbar-logo" src={image1} />
                    </Navbar.Brand>
                    
                    <Navbar.Brand>
                        <Link to="/" id="white-font">ONE Tech</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
            </div>
        );
    }

    renderMiddleNavbar = () => {
        return (
            <div>
                <Nav>
                    <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown" id="font-navbar">
                        <MenuItem eventKey={3.1}>
                            <Link to={`/allproductpage?search=smartphones`} id="black-font">
                                <img id="icon-scale" src={iconSmartphone} />Smartphone
                            </Link>
                        </MenuItem>
                        <MenuItem eventKey={3.2}>
                            <Link to={`/allproductpage?search=laptops`} id="black-font">
                                <img id="icon-scale" src={iconLaptop} alt="" />Laptop
                            </Link>
                        </MenuItem>
                        <MenuItem eventKey={3.3}>
                            <Link to={`/allproductpage?search=game%20consoles`} id="black-font">
                                <img id="icon-scale" src={iconGaming} alt="" />Game Console
                            </Link>
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>
                            <Link to={`/allproductpage?search=all%20products`} id="black-font">
                                <img id="icon-scale" src={iconProduct} alt="" />All Products
                            </Link>
                        </MenuItem>
                    </NavDropdown>
                </Nav>

                <Navbar.Form pullLeft>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search Product" inputRef={input => this.search = input} onKeyPress={this.onSearchPress.bind(this)}/>
                    </FormGroup>{' '}                 
                        <Button type="submit" className="btn btn-success" onClick={() => this.searchProduct(this.search.value)} style={{ backgroundColor:"#ff5722", border:"red" }}>
                            <span className="glyphicon glyphicon-search"/> Search
                        </Button>
                </Navbar.Form>
            </div>
        );
    }

    renderNavbar = () => {
        if(this.props.auth.username === "admin") {
            return (
                <Navbar fixedTop={true} collapseOnSelect id="navbar-color">
                    {this.renderLeftNavbar()}
                    <Navbar.Collapse>
                        {this.renderMiddleNavbar()}
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title={ "Hello, " + this.props.auth.username} id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem>
                                    <Link to="/adminproductpage">
                                        <img id="icon-scale" src={iconAdmin} alt="" />Admin Product
                                    </Link>
                                </MenuItem>
                                <MenuItem eventKey={3.2}>
                                    <Link to="/admintransactionpage">
                                        <img id="icon-scale" src={iconHistory} alt="" />Transaction History
                                    </Link>
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3} onSelect={this.onLogOutClick}>
                                    <Link to="/">
                                        <img id="icon-scale" src={iconLogOut} alt="" />Log Out
                                    </Link>
                                </MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        else if(this.props.auth.username !== "") {
            return (
                <Navbar fixedTop={true} collapseOnSelect id="navbar-color">
                    {this.renderLeftNavbar()}
                    <Navbar.Collapse>
                        {this.renderMiddleNavbar()}
                        <Nav pullRight>
                            {/* <NavItem eventKey={1} href="#">
                                <NotificationBadge count={this.state.cart[0].CartQuantity} effect={Effect.SCALE}/>Cart
                            </NavItem> */}
                            <NavDropdown eventKey={3} title={ "Hello, " + this.props.auth.username} id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem eventKey={3.1}>
                                    <Link to={`/cartpage?username=${this.props.auth.username}`}>
                                        <img id="icon-scale" src={iconCart} alt="" />Cart
                                    </Link>
                                </MenuItem>
                                <MenuItem eventKey={3.2}>
                                    <Link to={`/transactionhistorypage?username=${this.props.auth.username}`}>
                                        <img id="icon-scale" src={iconProfile} alt="" />Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3} onSelect={this.onLogOutClick}>
                                    <Link to="/">
                                        <img id="icon-scale" src={iconLogOut} alt="" />Log Out
                                    </Link>
                                </MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        else {
            return (
                <Navbar fixedTop={true} collapseOnSelect id="navbar-color">
                    {this.renderLeftNavbar()}
                    <Navbar.Collapse>
                        {this.renderMiddleNavbar()}
                        <Nav pullRight>
                            <NavItem eventKey={1} id="font-navbar">
                                <Link to="/register" id="white-font">Register</Link> 
                            </NavItem>
                            
                            <NavItem eventKey={2} id="font-navbar">
                                <Link to="/login" id="white-font">Login</Link> 
                            </NavItem>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
    render () {
        return(
            this.renderNavbar()
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const searchResult = state.searchResult

    return { auth, searchResult };
}

export default connect(mapStateToProps, { onLogout, keepLogin, cookieChecked, productSearch })(Header);