import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/rsz_2nintendo.jpg';

class ProductList extends Component {
  state = { products: [], selectedItem: 0 }

  componentWillMount() {
    this.getProductList();
  }

  getProductList = () => {
    axios.get('http://localhost:1989/products')
    .then((res) => {
      console.log(res);
      this.setState({ products: res.data, selectedItem: 0 })
      console.log(this.state.products);
    })
  }
  
  renderProductList = () => {
    const list = this.state.products.map((item) => {
      if(item.NormalPrice == 0) {
        return (
          <Col xs={12} md={4} lg={3}>
              <Thumbnail src={image1} alt="242x200" style={{ textAlign:"center" }}>
                <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
                <h5 style={{ color:"blue", fontWeight:"bold"}}>NEW Product!</h5>
                <h4 style={{ color:"#ff5722", fontWeight:"bold" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
                <h4 style={{ textAlign:"center" }}>
                  <Button bsStyle="success">Add To Cart</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/productdetails"><Button bsStyle="default">Details</Button></Link>
                </h4>
              </Thumbnail>
              </Col>
        );
      }
      else if(item.NormalPrice == 1) {
        return (
          <Col xs={12} md={4} lg={3}>
              <Thumbnail src={image1} alt="242x200" style={{ textAlign:"center" }}>
                <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
                <h5 style={{ color:"red", fontWeight:"bold"}}>HOT ITEM !!!</h5>
                <h4 style={{ color:"#ff5722", fontWeight:"bold" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
                <h4 style={{ textAlign:"center" }}>
                  <Button bsStyle="success">Add To Cart</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/productdetails"><Button bsStyle="default">Details</Button></Link>
                </h4>
              </Thumbnail>
              </Col>
        );
      }

      return(
        <Col xs={12} md={4} lg={3}>
              <Thumbnail src={image1} alt="242x200" style={{ textAlign:"center" }}>
                <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
                <h5 style={{ color:"#aaaaaa", fontWeight:"bold", textDecoration:"line-through" }}>Rp. {(parseInt(item.NormalPrice)).toLocaleString('id')},-</h5>
                <h4 style={{ color:"#ff5722", fontWeight:"bold" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
                <h4 style={{ textAlign:"center" }}>
                  <Button bsStyle="success">Add To Cart</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/productdetails"><Button bsStyle="default">Details</Button></Link>
                </h4>
              </Thumbnail>
              </Col>
      );
    })
    return list;
  }

  render() {
    return(
        <Grid>
          <Row>
            
            {this.renderProductList()}
            
          </Row>
        </Grid>
       
      );
    }
  }

export default ProductList;