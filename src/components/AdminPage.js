import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { Table, Button, Grid, Col, Row } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import pagenotfound from '../images/pagenotfound.png';

const cookies = new Cookies;
var click = true;

class AdminPage extends Component {
    state = { adminList: [] }

    componentWillMount() {
        this.getAdminList();
    }

    getAdminList = () => {
        axios.get(API_URL_1 + '/admin')
        .then((res) => {
            this.setState({ adminList: res.data });
        })
        console.log(this.state.adminList)
    }

    selectedProduct = (id) => {
        cookies.set('SelectedProduct', id, { path: '/' })
        console.log(id)
    };

    sortCartId = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortCartId')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortCartIdDesc')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = true;
        }
    }

    sortUsername = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortUsername')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortUsernameDesc')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = true;
        }
    }

    sortProduct = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortProduct')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortProductDesc')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = true;
        }
    }

    sortPrice = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortPrice')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortPriceDesc')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = true;
        }
    }

    sortQuantity = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortQuantity')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortQuantityDesc')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = true;
        }
    }

    sortTotalPrice = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortTotalPrice')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortTotalPriceDesc')
            .then((res) => {
                this.setState({ adminList: res.data })
            });
            click = true;
        }
    }

    onBtnSearchClick = () => {
        axios.get(API_URL_1 + '/searchadmin', {
          params: {
            username: this.refs.UsernameSearch.value,
            ProductName: this.refs.ProductnameSearch.value,
          }
        })  
        .then((res) => {
          this.setState({ adminList: res.data })
        })
        .catch((err) => {
          alert("Error!");
          console.log(err);
        })
      }

    renderAdminList = () => {
        const list = this.state.adminList.map((item,index) => {
            return (
                <tr key={index}>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>{item.idCart}</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>{item.username}</td>
                    <td style={{ textAlign:"center" }}>
                        <a href="/productdetails">
                            <img src={require('../images/' + item.Image1)} style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }} onClick={() => this.selectedProduct(item.idProduct)} />
                        </a>
                    </td>
                    <td style={{ verticalAlign:"middle" }}>{item.ProductName}</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>{item.quantity}</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>Rp. {(parseInt(item.quantity*item.SalePrice)).toLocaleString('id')},-</td>
                </tr>
            );
        })
        return list;
    }

    renderAdminPage = () => {
        if(this.props.auth.username != "admin") {
            return (
                <div style={{ marginTop: '150px', textAlign: 'center' }}>
                    <img src={pagenotfound} style={{ width:"100%", maxWidth:"430px", height:"auto" }} /><br/><br/>
                    <h2>Page Not Found!</h2>
                </div>
            );
        }
        return (
            <div style={{ margin: "80px 60px 0px 60px" }}>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={4}>
                            <h2 style={{ color: "#ff5722", fontWeight: "bold", marginTop: "0" }}>Admin</h2><br/>
                        </Col>
                        <Col xs={12} md={8}>
                            <input type="text" ref="UsernameSearch" placeholder="Search Username" style={{ marginRight: '10px' }}/>
                            <input type="text" ref="ProductnameSearch" placeholder="Search Product Name" style={{ marginRight: '10px'}} />
                            <Button bsStyle="primary" onClick={this.onBtnSearchClick}>Search</Button>
                        </Col>
                    </Row>
                </Grid>
                <Table striped>
                    <thead>
                        <tr>
                            <th style={{ textAlign:"center"}}>
                                <Button bsStyle="primary" onClick={this.sortCartId}>CartID</Button>
                            </th>
                            <th style={{ textAlign:"center"}}>
                                <Button bsStyle="primary" onClick={this.sortUsername}>Username</Button>
                            </th>
                            <th style={{ textAlign:"center"}} colspan="2">
                                <Button bsStyle="primary" onClick={this.sortProduct}>Product</Button>
                            </th>
                            <th style={{ textAlign:"center"}}>
                                <Button bsStyle="primary" onClick={this.sortPrice}>Price</Button>
                            </th>
                            <th style={{ textAlign:"center"}}>
                                <Button bsStyle="primary" onClick={this.sortQuantity}>Quantity</Button>
                            </th>
                            <th style={{ textAlign:"center"}}>
                                <Button bsStyle="primary" onClick={this.sortTotalPrice}>Total Price</Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAdminList()}
                        <tr>
                            <td style={{ padding: '0' }}></td>
                            <td style={{ padding: '0' }}></td>
                            <td style={{ padding: '0' }}></td>
                            <td style={{ padding: '0' }}></td>
                            <td style={{ padding: '0' }}></td>
                            <td style={{ padding: '0' }}></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderAdminPage()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps)(AdminPage);
