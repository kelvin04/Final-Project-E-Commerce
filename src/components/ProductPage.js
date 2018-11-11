import React, { Component } from 'react';
import queryString from 'query-string'
import { Tab, NavItem, Row, Col, Nav } from 'react-bootstrap';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import SearchProductList from './SearchProductList';
import AllProductList from './AllProductList';
import SmartphoneList from './SmartphoneList';
import LaptopList from './LaptopList';
import iconProduct from '../images/product_icon.png';
import iconSmartphone from '../images/iphone_icon.png';
import iconLaptop from '../images/laptop_icon.png';
import iconGaming from '../images/gaming_icon.png';
import GameConsoleList from './GameConsoleList';

class ProductPage extends Component {
    state = { activeKey: "first", link: queryString.parse(this.props.location.search).search }

    componentWillMount() {
        this.changeActiveKey();

        // untuk langsung scroll ke atas saat section categories di click
        window.scrollTo(0, 0)
    }

    changeActiveKey = () => {
        if(this.state.link === "" || this.state.link === "all products") {
            this.setState({ activeKey: "first" })
        }
        else if(this.state.link === "smartphones") {
            this.setState({ activeKey: "second" })
        }
        else if(this.state.link === "laptops") {
            this.setState({ activeKey: "third" })
        }
        else if(this.state.link === "game consoles") {
            this.setState({ activeKey: "fourth" })
        }
    }

    changeRenderProduct = () => {
        const params = queryString.parse(this.props.location.search).search;
        const { link } = this.state;
        if (link === "" || link === "smartphones" || link === "laptops" || link === "game consoles") {
            return(
                <AllProductList />
            )
        }
        else {
            return(
                <SearchProductList params={params}/> 
            );
        }
    }

    render(){
        return(
            <div id="product-page-container">
                <span id="display-inline">
                    <Tab.Container id="left-tabs-example" defaultActiveKey={this.state.activeKey}>
                        <Row className="clearfix">
                            <Col sm={2} id="side-tab">
                                <Nav bsStyle="pills" stacked>
                                    <NavItem eventKey="first" >
                                        <img id="icon-scale" src={iconProduct} alt="" />All Product
                                    </NavItem>

                                    <hr style={{ margin:"17px auto" }}/>
                                    <NavItem eventKey="second">
                                        <img id="icon-scale" src={iconSmartphone} alt="" />Smartphone
                                    </NavItem>

                                    <hr style={{ margin:"8px auto" }}/>

                                    <NavItem eventKey="third">
                                        <img id="icon-scale" src={iconLaptop} alt="" />Laptop
                                    </NavItem>

                                    <hr style={{ margin:"8px auto" }}/>

                                    <NavItem eventKey="fourth" style={{ marginBottom:"20px" }}>
                                        <img id="icon-scale" src={iconGaming} alt="" />Game Console
                                    </NavItem>
                                </Nav>
                            </Col>

                            <Col sm={10} id="product-list">
                                <Tab.Content animation>
                                    <Tab.Pane eventKey="first" >
                                        {this.changeRenderProduct()}
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
            </div>
        );
    }
}

export default ProductPage;