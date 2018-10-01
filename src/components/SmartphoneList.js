import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url/apiurl';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/rsz_2nintendo.jpg';

const cookies = new Cookies;

class SmartphoneList extends Component {
  state = { products: [], selectedItem: 0 }

  componentWillMount() {
    this.getProductList();
  }
  

  getProductList = () => {
    axios.get(API_URL_1 + '/allSmartphone')
    .then((res) => {
      console.log(res);
      this.setState({ products: res.data, selectedItem: 0 })
      console.log(this.state.products);
    })
  }

  selectedProduct = (id) => {
    cookies.set('SelectedProduct', id, { path: '/' })
    console.log(id)
  }
  
  renderAllProduct = () => {
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
                <Button href="/productdetails" bsStyle="default" onClick={() => this.selectedProduct(item.idProduct)} >Details</Button>
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
                <Button href="/productdetails" bsStyle="default" onClick={() => this.selectedProduct(item.idProduct)} >Details</Button>
              </h4>
            </Thumbnail>
          </Col>
        );
      }

      return(
        <Col xs={12} md={4} lg={3}>
          <Thumbnail src={image1} alt="242x200" style={{ textAlign:"center" }}>
            <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
            <h5 className="normal-price">Rp. {(parseInt(item.NormalPrice)).toLocaleString('id')},-</h5>
            <h4 className="sale-price">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
            <h4 style={{ textAlign:"center" }}>
              <Button bsStyle="success">Add To Cart</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button href="/productdetails" bsStyle="default" onClick={() => this.selectedProduct(item.idProduct)} >Details</Button>
            </h4>
          </Thumbnail>
        </Col>
      );
    })
    return list;
  }

  onFilterBrand = (value) => {
    if(value == 1) {
      console.log('satu')
    }
    else if(value == 2) {
      console.log('dua')
    }
    else {
      console.log('pusing')
    }
  }
  
  render() {
    const Brand = [
      { label: "Apple", value: 1 },
      { label: "OPPO", value: 2 },
      { label: "Samsung", value: 3 },
      { label: "Xiaomi", value: 4 },
    ];

    const Sort = [
      { label: "Name", value: 1 },
      { label: "Price", value: 2 },
    ];

    const SortBy = [
      { label: "Ascending", value: 1 },
      { label: "Descending", value: 2 },
    ]; 

    return(
      <div>
        <div style={{ marginBottom:"35px" }}>
          <Grid>
              <Row>
                  <Col xs={12} md={4}>
                      <div style={{fontWeight:"bold"}}>
                      Filter by Brand :
                      </div>
                      <Select options={Brand} onChange={(opt) => this.onFilterBrand(opt.value)}/>
                  </Col>

                  <Col xs={6} md={4}>
                      <div style={{fontWeight:"bold"}}>
                      Sort by :
                      </div>
                      <Select options={Sort} onChange={opt => console.log(opt.label, opt.value)}/>
                  </Col>

                  <Col xs={6} md={4}>
                      <div style={{fontWeight:"bold"}}>
                      Ascending / Descending
                      </div>
                      <Select options={SortBy} onChange={opt => console.log(opt.label, opt.value)}/>
                  </Col>
              </Row>
          </Grid>
      </div>
        <Grid>
          <Row>
            {this.renderAllProduct()}
          </Row>
        </Grid>
        </div>
      );
    }
  }

export default SmartphoneList;