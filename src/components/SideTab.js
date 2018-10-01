import React, { Component } from 'react';
import { Tab, NavItem, Row, Col, Nav } from 'react-bootstrap';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import SortFilterAll from './SortFilterAll';
import ProductList from './ProductList';
import SmartphoneList from './SmartphoneList';
import iconProduct from '../images/product_icon.png';
import iconSmartphone from '../images/iphone_icon.png';
import iconLaptop from '../images/laptop_icon.png';
import iconGaming from '../images/gaming_icon.png';



class SideTab extends Component {
    render() { 
        


        return ( 
            <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={2} id="side-tab">
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="first"><span ><img id="icon-scale" src={iconProduct}></img></span>All Product</NavItem>
                        <NavItem eventKey="second"><span ><img id="icon-scale" src={iconSmartphone}></img></span>Smartphone</NavItem>
                    </Nav>
                    </Col>

                    <Col sm={10} id="product-list">
                        <Tab.Content animation>
                            <Tab.Pane eventKey="first" >
                                {/* <SortFilterAll /> */}
                                <ProductList />
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">
                                <SmartphoneList />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            
            <ScrollUpButton ContainerClassName="ScrollUpButton__Container" ShowAtPosition={300} style={{ border: "5px solid red" }}/>
            </div>
        );
    }
}
 
export default SideTab;