import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


class NavCategoryList extends Component {
    render() {


        return(
            // <Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
            // <Navbar style={style} fixedTop={true} collapseOnSelect>
            <Nav bsStyle="tabs" activeKey="1"  justified >
                <NavItem eventKey="1" href="/allproductpage">
                    All Product
                </NavItem>

                <NavItem eventKey="2" title="Item">
                NavItem 2 content
                </NavItem>

                <NavItem eventKey="3" disabled>
                NavItem 3 content
                </NavItem>
                
                <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
                    <MenuItem eventKey="4.1">Action</MenuItem>
                    <MenuItem eventKey="4.2">Another action</MenuItem>
                    <MenuItem eventKey="4.3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4.4">Separated link</MenuItem>
                </NavDropdown>

                <NavItem eventKey="4" href="/">
               Home
                </NavItem>
            </Nav>

        );
    }
}

export default NavCategoryList;