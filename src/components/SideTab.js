import React, { Component } from 'react';
import { Tab, NavItem, Row, Col, Nav } from 'react-bootstrap';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import Select from 'react-select';
import ProductList from './ProductList';
import iconGaming from '../images/iphone_icon.png';

class SideTab extends Component {
    render() { 
        const scaryAnimals = [
            { label: "Apple", value: 1 },
            { label: "OPPO", value: 2 },
            { label: "Samsung", value: 3 },
            { label: "Xiaomi", value: 4 },
        ];
        return ( 
            <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                    <Col sm={2} id="side-tab">
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="first"><span ><img id="icon-scale" src={iconGaming}></img></span>Smartphone</NavItem>
                        <NavItem eventKey="second">Tab 2</NavItem>
                    </Nav>
                    </Col>
                    <Col sm={10} id="product-list">
                    <Tab.Content animation>
                        <Tab.Pane eventKey="first" >
                        {/* <div style={{ display:"flex", d }}>
                            
                        </div> */}

                        <div style={{ margin:"0px 10px 25px 15px" }}>
                            Filter by Brand :
                            <Select options={scaryAnimals} isMulti/>
                        </div>
                            <ProductList />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
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