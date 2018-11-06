import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url/apiurl';
import image1 from '../images/iphone-x.png';

const cookies = new Cookies;

class GameConsoleList extends Component {
  state = { products: [], selectedItem: 0, filterBy: "", sortBy: 0, ascDescSort: 0 }

  componentWillMount() {
    this.getProductList();
  }
  
  getProductList = () => {
    axios.get(API_URL_1 + '/allGaming')
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
  
  onFilterBrand = (value) => {
    this.setState({ filterBy: value })
    console.log(this.state.filterBy)
  }

  onSortBy = (value1) => {
    this.setState({ sortBy: value1 })
    console.log(this.state.sortBy)
  }

  onAscDescSort = (value2) => {
    this.setState({ ascDescSort: value2 })
    console.log(this.state.ascDescSort)
  }

  onBtnSortClick = () => {
    if(this.state.sortBy == 1 && this.state.ascDescSort == 1) {
      axios.get(API_URL_1 + '/sortgamingnameasc', {
        params : { namabrand : this.state.filterBy }
      })
      .then((res) => {
        this.setState({ products: res.data })
        console.log(res)
      })
    }
    else if(this.state.sortBy == 1 && this.state.ascDescSort == 2) {
      axios.get(API_URL_1 + '/sortgamingnamedesc', {
        params : { namabrand : this.state.filterBy }
      })
      .then((res) => {
        this.setState({ products: res.data })
        console.log(res)
      })
    }
    else if(this.state.sortBy == 2 && this.state.ascDescSort == 1) {
      axios.get(API_URL_1 + '/sortgamingpriceasc', {
        params : { namabrand : this.state.filterBy }
      })
      .then((res) => {
        this.setState({ products: res.data })
        console.log(res)
      })
    }
    else if(this.state.sortBy == 2 && this.state.ascDescSort == 2) {
      axios.get(API_URL_1 + '/sortgamingpricedesc', {
        params : { namabrand : this.state.filterBy }
      })
      .then((res) => {
        this.setState({ products: res.data })
        console.log(res)
      })
    }
  }

  renderAllProduct = () => {
    const list = this.state.products.map((item) => {
      if(item.NormalPrice == 0) {
        return (
          <Col xs={12} md={4} lg={3}>
            <Thumbnail src={require('../images/' + item.Image1)} alt="242x200" style={{ textAlign:"center" }}>
              <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
              <h5 style={{ color:"blue", fontWeight:"bold"}}>NEW Product!</h5>
              <h4 style={{ color:"#ff5722", fontWeight:"bold" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
              <h4 style={{ textAlign:"center" }}>
                <Link to={`/productdetails?idProduct=${item.idProduct}`}>
                  <Button bsStyle="success" onClick={() => this.selectedProduct(item.idProduct)} style={{ outline: 'none' }} >Details</Button>
                </Link>
              </h4>
            </Thumbnail>
          </Col>
        );
      }
      else if(item.NormalPrice == 1) {
        return (
          <Col xs={12} md={4} lg={3}>
            <Thumbnail src={require('../images/' + item.Image1)} alt="242x200" style={{ textAlign:"center" }}>
              <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
              <h5 style={{ color:"red", fontWeight:"bold"}}>HOT ITEM !!!</h5>
              <h4 style={{ color:"#ff5722", fontWeight:"bold" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
              <h4 style={{ textAlign:"center" }}>
                <Link to={`/productdetails?idProduct=${item.idProduct}`}>
                    <Button bsStyle="success" onClick={() => this.selectedProduct(item.idProduct)} style={{ outline: 'none' }} >Details</Button>
                </Link>
              </h4>
            </Thumbnail>
          </Col>
        );
      }

      return(
        <Col xs={12} md={4} lg={3}>
          <Thumbnail src={require('../images/' + item.Image1)} alt="242x200" style={{ textAlign:"center" }}>
            <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
            <h5 className="normal-price">Rp. {(parseInt(item.NormalPrice)).toLocaleString('id')},-</h5>
            <h4 className="sale-price">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
            <h4 style={{ textAlign:"center" }}>
              <Link to={`/productdetails?idProduct=${item.idProduct}`}>
                <Button bsStyle="success" onClick={() => this.selectedProduct(item.idProduct)} style={{ outline: 'none' }} >Details</Button>
              </Link>
            </h4>
          </Thumbnail>
        </Col>
      );
    })
    return list;
  }

  render() {
    const Brand = [
      { label: "All Game Consoles", value: 0 },
      { label: "NINTENDO", value: 1 },
      { label: "SONY", value: 2 },
      { label: "MICROSOFT", value: 3 },
    ];

    const Sort = [
      { label: "Name", value: 1 },
      { label: "Price", value: 2 },
    ];

    const SortBy = [
      { label: "Ascending", value: 1 },
      { label: "Descending", value: 2 },
    ]; 

    if(this.state.products.length == 0) {
			return (
				<div style={{ margin:"700px" }}>
          
				</div>
			);
		}

    return(
      <div>
        <div style={{ marginBottom:"35px" }}>
          <Grid>
              <Row>
                  <Col xs={12} md={4}>
                      <div style={{fontWeight:"bold"}}>
                      Filter by Brand :
                      </div>
                      <Select options={Brand} onChange={(opt) => this.onFilterBrand(opt.label)}/>
                  </Col>

                  <Col xs={12} md={8} style={{ paddingLeft:"0px" }}>
                    <Col xs={5} md={5}>
                      <div style={{fontWeight:"bold"}}>
                        Sort by :
                      </div>
                      <Select options={Sort} onChange={opt => this.onSortBy(opt.value)} isSearchable={false}/>
                    </Col>

                    <Col xs={5} md={5}>
                        <div style={{fontWeight:"bold"}}>
                        Asc / Desc
                        </div>
                        <Select options={SortBy} onChange={opt => this.onAscDescSort(opt.value)} isSearchable={false}/>
                      </Col>

                      <Col xs={2} md={2}>
                        <Button bsStyle="primary" onClick={this.onBtnSortClick} style={{ marginTop: "20px" }}>Submit</Button>
                    </Col>
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

export default GameConsoleList;