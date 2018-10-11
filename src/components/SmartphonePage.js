import React, { Component } from 'react';
import { Tab, NavItem, Row, Col, Nav } from 'react-bootstrap';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import ProductList from './ProductList';
import SmartphoneList from './SmartphoneList';
import LaptopList from './LaptopList';
import GameConsoleList from './GameConsoleList';
import iconProduct from '../images/product_icon.png';
import iconSmartphone from '../images/iphone_icon.png';
import iconLaptop from '../images/laptop_icon.png';
import iconGaming from '../images/gaming_icon.png';
import Footer from './Footer';

class SmartphonePage extends Component {
    render(){
        return(
            <div id="product-page-container">
                <span id="display-inline">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="second">
                        <Row className="clearfix">
                            <Col sm={2} id="side-tab">
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="first">
                                    <span><img id="icon-scale" src={iconProduct}></img></span>All Product
                                </NavItem>

                                <hr style={{ margin:"17px auto" }}/>

                                <NavItem eventKey="second">
                                    <span><img id="icon-scale" src={iconSmartphone}></img></span>Smartphone
                                </NavItem>

                                <hr style={{ margin:"8px auto" }}/>

                                <NavItem eventKey="third">
                                    <span><img id="icon-scale" src={iconLaptop}></img></span>Laptop
                                </NavItem>

                                <hr style={{ margin:"8px auto" }}/>

                                <NavItem eventKey="fourth" style={{ marginBottom:"20px" }}>
                                    <span><img id="icon-scale" src={iconGaming}></img></span>Game Console
                                </NavItem>
                            </Nav>
                            </Col>

                            <Col sm={10} id="product-list">
                                <Tab.Content animation>
                                    <Tab.Pane eventKey="first" >
                                        <ProductList />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second">
                                        <SmartphoneList />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="third">
                                        <LaptopList />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="fourth">
                                        <GameConsoleList />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    
                    <ScrollUpButton ContainerClassName="ScrollUpButton__Container" ShowAtPosition={300} style={{ border: "5px solid red" }}/>
                </span>
                <br/>
                <Footer />
            </div>
        );
    }
}

export default SmartphonePage;