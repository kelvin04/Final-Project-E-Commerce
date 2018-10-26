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

const cookies = new Cookies();

class Header extends Component {  
    onLogOutClick = () => {
        this.props.onLogout();
    }

    renderNavbar = () => {
        if(this.props.auth.username == "admin") {
            return (
                <Navbar fixedTop={true} collapseOnSelect id="navbar-color">
                    <Navbar.Header>
                        <Navbar.Brand >
                            <img id="navbar-logo" src={image1} />
                        </Navbar.Brand>
                        
                        <Navbar.Brand>
                            <Link to="/" id="white-font">ADMIN</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav>
                            {/* <NavItem eventKey={1} href="#" id="font-navbar">
                                Link
                            </NavItem>
                            <NavItem eventKey={2} href="#" id="font-navbar">
                                Link
                            </NavItem> */}

                            <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem eventKey={3.1}><span ><img id="icon-scale" src={iconSmartphone}></img></span>Smartphone</MenuItem>
                                <MenuItem eventKey={3.2}><span ><img id="icon-scale" src={iconLaptop}></img></span>Laptop</MenuItem>
                                <MenuItem eventKey={3.3}><span ><img id="icon-scale" src={iconGaming}></img></span>Game Console</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>
                                    <Link to="/allproductpage" id="black-font"><span ><img id="icon-scale" src={iconProduct}></img></span>All Products</Link>
                                </MenuItem>
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
                        <NavItem eventKey={2} id="font-navbar">
                                <Link to="/adminpage" id="white-font">
                                    Transaction
                                </Link> 
                            </NavItem>
                            <NavItem eventKey={1} id="font-navbar">
                            <NavDropdown eventKey={3} title={ "Hello, " + this.props.auth.username} id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem>
                                    <Link to="/adminproductpage"><span ><img id="icon-scale" src={iconLogOut}></img></span>Admin Product</Link>
                                </MenuItem>
                                <MenuItem eventKey={3.2}><span ><img id="icon-scale" src={iconAccount}></img></span>Profile</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3} onSelect={this.onLogOutClick}>
                                    <Link to="/"><span ><img id="icon-scale" src={iconLogOut}></img></span>Log Out</Link>
                                </MenuItem>
                            </NavDropdown>
                        </NavItem>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            );
        }
        else if(this.props.auth.username != "") {
            return (
                <Navbar fixedTop={true} collapseOnSelect id="navbar-color">
                    <Navbar.Header>
                        <Navbar.Brand >
                            <img id="navbar-logo" src={image1} />
                        </Navbar.Brand>
                        
                        <Navbar.Brand>
                            <Link to="/" id="white-font">ONE Tech</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav>
                            {/* <NavItem eventKey={1} href="#" id="font-navbar">
                                Link
                            </NavItem>
                            <NavItem eventKey={2} href="#" id="font-navbar">
                                Link
                            </NavItem> */}

                            <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem eventKey={3.1}><span ><img id="icon-scale" src={iconSmartphone}></img></span>Smartphone</MenuItem>
                                <MenuItem eventKey={3.2}><span ><img id="icon-scale" src={iconLaptop}></img></span>Laptop</MenuItem>
                                <MenuItem eventKey={3.3}><span ><img id="icon-scale" src={iconGaming}></img></span>Game Console</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>
                                    <Link to="/allproductpage" id="black-font"><span ><img id="icon-scale" src={iconProduct}></img></span>All Products</Link>
                                </MenuItem>
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
                        <NavItem eventKey={2} id="font-navbar">
                                <Link to={`/cartpage?username=${this.props.auth.username}`} id="white-font">
                                    MyCart 
                                </Link> 
                            </NavItem>
                            <NavItem eventKey={1} id="font-navbar">
                            <NavDropdown eventKey={3} title={ "Hello, " + this.props.auth.username} id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem eventKey={3.1}><span ><img id="icon-scale" src={iconCart}></img></span>Cart</MenuItem>
                                <MenuItem eventKey={3.2}><span ><img id="icon-scale" src={iconAccount}></img></span>Profile</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3} onSelect={this.onLogOutClick}>
                                        <Link to="/"><span ><img id="icon-scale" src={iconLogOut}></img></span>Log Out</Link>
                                    </MenuItem>
                            </NavDropdown>
                        </NavItem>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            );
        }
        else {
            return (
                <Navbar fixedTop={true} collapseOnSelect id="navbar-color">
                    <Navbar.Header>

                        <Navbar.Brand >
                            <img id="navbar-logo" src={image1} />
                        </Navbar.Brand>

                        <Navbar.Brand >
                            <Link to="/" id="white-font">ONE Tech</Link>
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
                                        {/* <Link to="/allproductpage" id="black-font"><span ><img id="icon-scale" src={iconProduct}></img></span>All Products</Link> */}
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