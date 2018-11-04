import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout, keepLogin, cookieChecked, productSearch } from '../actions';
import Cookies from 'universal-cookie';
import image1 from '../images/logo.png';
import iconSmartphone from '../images/iphone_icon.png';
import iconLaptop from '../images/laptop_icon.png';
import iconGaming from '../images/gaming_icon.png';
import iconProduct from '../images/product_icon.png';
import iconCart from '../images/cart_icon.png';
import iconAccount from '../images/account_icon.png';
import iconLogOut from '../images/LogOut_icon.png';
import iconHistory from '../images/history.png';
import iconAdmin from '../images/admin_add.png';

class HeaderDetails extends Component {
    render() { 
        const { titleText } = this.props
        return (
            <Navbar fixedTop={true} collapseOnSelect id="navbar-color">
                    <Navbar.Header>
                        <Navbar.Brand >
                            <img id="navbar-logo" src={image1} />
                        </Navbar.Brand>

                        <Navbar.Brand >
                            <Link to="/" id="white-font">{titleText}</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} href="#" id="font-navbar">
                                <Link to="/cartpage" id="white-font">Link:&nbsp;<span class="glyphicon glyphicon-envelope"></span></Link>
                            </NavItem>

                            <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem eventKey={3.1}>
                                    <Link to="/smartphonepage" id="black-font"><span><img id="icon-scale" src={iconSmartphone}></img></span>Smartphone</Link>
                                </MenuItem>

                                <MenuItem eventKey={3.2}><span ><img id="icon-scale" src={iconLaptop}></img></span>Laptop</MenuItem>
                                <MenuItem eventKey={3.3}><span ><img id="icon-scale" src={iconGaming}></img></span>Game Console</MenuItem>
                                <MenuItem divider />
                                <Link to="/allproductpage" id="black-font">
                                    <MenuItem eventKey={3.3} >
                                        <span ><img id="icon-scale" src={iconProduct} style={{ marginLeft:"10px" }}></img></span>All Products
                                    </MenuItem>
                                </Link>
                            </NavDropdown>
                        </Nav>

                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Search Product" inputRef={input => this.search = input}/>
                            </FormGroup>{' '}                 
                            <Link to="/searchpage" id="black-font">
                                <Button type="submit" className="btn btn-success" onClick={() => this.props.productSearch(this.search.value)} style={{ backgroundColor:"#ff5722", border:"red" }}>
                                    <span class="glyphicon glyphicon-search"></span> Search
                                </Button>
                            </Link>
                        </Navbar.Form>

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
 
export default HeaderDetails;