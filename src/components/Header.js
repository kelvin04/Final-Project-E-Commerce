import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onLogout } from '../actions';
import image1 from '../images/logo.png';

class Header extends Component {
    onLogOutClick = () => {
        this.props.onLogout();
    }

    renderNavbar = () => {
        if(this.props.auth.username != "") {
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
                            <NavItem eventKey={1} href="#" id="font-navbar">
                                Link
                            </NavItem>

                            <NavItem eventKey={2} href="#" id="font-navbar">
                                Link
                            </NavItem>

                            <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem eventKey={3.1}>Smartphone</MenuItem>
                                <MenuItem eventKey={3.2}>Laptop</MenuItem>
                                <MenuItem eventKey={3.3}>Game Console</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.3}>
                                    <Link to="/allproductpage" id="black-font">All Product</Link>
                                </MenuItem>
                            </NavDropdown>
                        </Nav>

                        <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl type="text" placeholder="Cari Produk" />
                            </FormGroup>{' '}
                            <Button type="submit" className="btn btn-success">Cari</Button>
                        </Navbar.Form>

                        <Nav pullRight>
                            <NavItem eventKey={1} id="font-navbar">
                            <NavDropdown eventKey={3} title={ "Hello, " + this.props.auth.username} id="basic-nav-dropdown" id="font-navbar">
                                <MenuItem eventKey={3.1}>Profile</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={3.2} onSelect={this.onLogOutClick}>Log Out</MenuItem>
                            </NavDropdown>
                        </NavItem>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            );
        }

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
                            Link
                        </NavItem>

                        <NavItem eventKey={2} href="#" id="font-navbar">
                            Link
                        </NavItem>

                        <NavDropdown eventKey={3} title="Category" id="basic-nav-dropdown" id="font-navbar">
                            <MenuItem eventKey={3.1}>Smartphone</MenuItem>
                            <MenuItem eventKey={3.2}>Laptop</MenuItem>
                            <MenuItem eventKey={3.3}>Game Console</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>
                                <Link to="/allproductpage" id="black-font">All Product</Link>
                            </MenuItem>
                        </NavDropdown>
                    </Nav>

                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl type="text" placeholder="Cari Produk" />
                        </FormGroup>{' '}
                        <Button type="submit" className="btn btn-success">Cari</Button>
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
    render () {
        return(
         
            this.renderNavbar()
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}


export default connect(mapStateToProps, { onLogout })(Header);