import React, { Component } from 'react';
import { Tab, NavItem, Row, Col, Nav } from 'react-bootstrap';
import ProductList from './ProductList';
import iconGaming from '../images/gaming_icon.png';

class SideTab extends Component {
    render() { 
        return ( 
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={2}  id="side-tab">
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="first"><span ><img id="icon-scale" src={iconGaming}></img></span>Game Console</NavItem>
                        <NavItem eventKey="second">Tab 2</NavItem>
                    </Nav>
                    </Col>
                    {/* <Col sm={10} style={{ paddingLeft: "6px"}}> */}
                    <Col sm={10} id="product-list">
                    <Tab.Content animation>
                        <Tab.Pane eventKey="first" >
                            <ProductList />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}
 
export default SideTab;