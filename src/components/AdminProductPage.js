import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { API_URL_1 } from '../supports/api-url/apiurl';
import pagenotfound from '../images/pagenotfound.png';

var click = true;

class AdminProductPage extends Component {
    state = { productList: [], selectedEditId: 0, selectedItem: 0 }

    componentWillMount() {
        this.getProductList();
    }

    getProductList = () => {
        axios.get(API_URL_1 + '/allProducts')
        .then((res) => {
            console.log(res);
            this.setState({ productList: res.data, selectedEditId: 0, selectedItem: 0 })
        })
    }

    onBtnAddClick = () => {
        axios.post(API_URL_1 + '/adminAddProduct', {
            Image1: this.refs.Image1.value,
            Image2: this.refs.Image2.value,
            Image3: this.refs.Image3.value,
            Brand: this.refs.Brand.value,
            ProductName: this.refs.ProductName.value,
            Description: this.refs.Description.value,
            Features1: this.refs.Features1.value,
            Features2: this.refs.Features2.value,
            Features3: this.refs.Features3.value,
            Features4: this.refs.Features4.value,
            NormalPrice: this.refs.NormalPrice.value,
            SalePrice: this.refs.SalePrice.value,
        }) 
        .then((res) => {
            alert('Add Product Success!');
            this.setState({ productList: res.data, selectedEditId: 0, selectedItem: 0 })
        })
        .catch((err) => {
            alert("Error!");
            console.log(err);
        })
    }

    onBtnEditClick = (id) => {
        this.setState({ selectedEditId: id })
    }

    onBtnDeleteClick = (itemId) => {
        var check = window.confirm("Are you sure to delete this product?");
        if(check == true) {
            axios.delete(API_URL_1 + '/adminDeleteProduct/' + itemId)
            .then(res => {
                alert('Delete Product Success!');
                this.setState({ productList: res.data, selectedEditId: 0, selectedItem: 0 })
            }).catch((err) => {
                alert("Delete Error!");
                console.log(err);
            })
        }
    };

    onBtnCancelClick = () => {
        this.setState({ selectedEditId: 0 })
    }

    onBtnUpdateClick = (itemId) => {
        axios.put(API_URL_1 + `/adminEditProduct/` + itemId, {
            Image1: this.refs.EditImage1.value,
            Image2: this.refs.EditImage2.value,
            Image3: this.refs.EditImage3.value,
            Brand: this.refs.EditBrand.value,
            ProductName: this.refs.EditProductName.value,
            Description: this.refs.EditDescription.value,
            Features1: this.refs.EditFeatures1.value,
            Features2: this.refs.EditFeatures2.value,
            Features3: this.refs.EditFeatures3.value,
            Features4: this.refs.EditFeatures4.value,
            NormalPrice: this.refs.EditNormalPrice.value,
            SalePrice: this.refs.EditSalePrice.value,
        }) 
        .then((res) => {
            if(res.data.status === "Error") {
                console.log(res.data.err);
                alert(res.data.err.sqlMessage)
            }
            else {
                alert('Edit Data Success!');
                this.setState({ productList: res.data, selectedEditId: 0, selectedItem: 0 })
            }
        })
        .catch((err) => {
            alert("Error!");
            console.log(err);
        })
    }

    onBtnSearchClick = () => {
        axios.get(API_URL_1 + '/searchAdmin', {
            params: {
                ProductName: this.refs.ProductnameSearch.value
            }
        })
        .then((res) => {
            console.log(res);
            this.setState({ productList: res.data, selectedEditId: 0, selectedItem: 0 })
        })
        .catch((err) => {
            alert("Error!");
            console.log(err);
        })
    }

    onBtnResetClick = () => {
        this.getProductList();
    }

    sortIdProduct = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortIdProduct')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortIdProductDesc')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = true;
        }
    }

    sortProductName = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortProductName')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortProductNameDesc')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = true;
        }
    }

    sortNormalPrice = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortNormalPrice')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortNormalPriceDesc')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = true;
        }
    }

    sortPromoPrice = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortPromoPrice')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortPromoPriceDesc')
            .then((res) => {
                this.setState({ productList: res.data })
            });
            click = true;
        }
    }

    renderProductList = () => {
        const list = this.state.productList.map((item, index) => {
            if(this.state.selectedEditId !== item.idProduct) {
                return(
                    <tr key={index} id="vertical-text-center">
                        <td>{item.idProduct}</td>
                        <Link to={`/productdetails?idProduct=${item.idProduct}`}>
                            <td >
                                <div className="row" id="image-align-center">
                                    <img src={require('../images/' + item.Image1)} alt="" className="col-sm-4" id="image-product-list" onClick={() => this.selectedProduct(item.idProduct)} />
                                    <img src={require('../images/' + item.Image2)} alt="" className="col-sm-4" id="image-product-list" onClick={() => this.selectedProduct(item.idProduct)} />
                                    <img src={require('../images/' + item.Image3)} alt="" className="col-sm-4" id="image-product-list" onClick={() => this.selectedProduct(item.idProduct)} />
                                </div>
                            </td>
                        </Link>
                        <td>{item.Brand}</td>
                        <td>{item.ProductName}</td>
                        <td style={{ textAlign: "left" }}>{item.Description}</td>
                        <td id="admin-features-product">
                            <ul style={{ paddingLeft: "15px" }}>
                                <li>{item.Features1}</li>
                                <li>{item.Features2}</li>
                                <li>{item.Features3}</li>
                                <li>{item.Features4}</li>
                            </ul>
                        </td>
                        <td>Rp. {(parseInt(item.NormalPrice)).toLocaleString('id')},-</td>
                        <td>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                        <td>
                            <input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick(item.idProduct)} style={{ outline: "none" }} /><br/><br/>
                            <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.idProduct)} style={{ outline: "none" }} />
                        </td>
                    </tr>
                );
            }
            return(
                <tr key={index}>
                    <td></td>
                    <td>
                        MainImage:<input type="text" ref="EditImage1" defaultValue={item.Image1} style={{ margin: "5px 0" }} />
                        SubImage:<input type="text" ref="EditImage2" defaultValue={item.Image2} style={{ margin: "5px 0" }} />
                        SubImage:<input type="text" ref="EditImage3" defaultValue={item.Image3} style={{ margin: "5px 0" }} />
                    </td>
                    <td>
                        <input type="text" ref="EditBrand" defaultValue={item.Brand} style={{ maxWidth: "105px" }} />
                    </td>
                    <td>
                        <input type="text" ref="EditProductName" defaultValue={item.ProductName} style={{ maxWidth: "120px" }} />
                    </td>
                    <td>
                        <textarea type="text" ref="EditDescription" defaultValue={item.Description} />
                    </td>
                    <td>
                        1:<input type="text" ref="EditFeatures1" defaultValue={item.Features1} style={{ margin: "5px 0" }} />
                        2:<input type="text" ref="EditFeatures2" defaultValue={item.Features2} style={{ margin: "5px 0" }} />
                        3:<input type="text" ref="EditFeatures3" defaultValue={item.Features3} style={{ margin: "5px 0" }} />
                        4:<input type="text" ref="EditFeatures4" defaultValue={item.Features4} style={{ margin: "5px 0" }} />
                    </td>
                    <td>
                        <input type="text" ref="EditNormalPrice" defaultValue={item.NormalPrice} style={{ maxWidth: "105px" }}/>
                    </td>
                    <td>
                        <input type="text" ref="EditSalePrice" defaultValue={item.SalePrice} style={{ maxWidth: "105px" }}/>
                    </td>
                    <td>
                        <input type="button" className="btn btn-success" value="Update" onClick={() => this.onBtnUpdateClick(item.idProduct)} style={{ outline: "none" }} /><br/><br/>
                        <input type="button" className="btn btn-danger" value="Cancel" onClick={() => this.onBtnCancelClick()} style={{ outline: "none" }} />
                    </td>
                </tr>
            );
        })
        return list;
    }
    
    renderAdminProduct = () => {
        if(this.props.auth.username != "admin") {
            return (
                <div style={{ margin: '160px 0', textAlign: 'center' }}>
                    <img src={pagenotfound} alt="" style={{ width:"100%", maxWidth:"430px", height:"auto" }} /><br/><br/>
                    <h2>Page Not Found!</h2>
                </div>
            );
        }
        else {
            return (
                <div style={{ margin: "60px 5px 0px 5px" }}>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={4}>
                                <h2 style={{ color: "#ff5722", fontWeight: "bold" }}>Admin Product List</h2>
                            </Col>
                            <Col xs={12} md={8}>
                                <div style={{ marginTop: "20px", textAlign: "center" }}>
                                    {/* <input type="text" ref="ProductNameSearch" placeholder="Search Username" style={{ marginRight: '10px' }}/> */}
                                    <input type="text" ref="ProductnameSearch" placeholder="Search Product Name" style={{ marginRight: '10px'}} />
                                    <Button bsStyle="success" style={{ marginRight: "10px" }} onClick={this.onBtnSearchClick} style={{ outline: "none", marginRight: "10px" }}>Search</Button>
                                    <Button bsStyle="danger" onClick={this.onBtnResetClick} style={{ outline: "none" }}>Reset</Button>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <br/>
                    <Table striped bordered condensed>
                        <thead>
                            <tr id="vertical-head-center">
                                <th style={{ width:"3%" }}>
                                    <Button bsStyle="primary" onClick={this.sortIdProduct}>ID</Button>
                                </th>
                                <th style={{ width:"18%"}}>Product Image</th>
                                <th style={{ width:"3%"}}>Brand</th>
                                <th style={{ textAlign:"center", width:"9%"}}>
                                    <Button bsStyle="primary" onClick={this.sortProductName}>Product Name</Button>
                                </th>
                                <th style={{ width:"13%"}}>Description</th>
                                <th style={{ width:"12%"}}>Features</th>
                                <th style={{ textAlign:"center", width:"8%"}}>
                                    <Button bsStyle="primary" onClick={this.sortNormalPrice}>Normal Price</Button>
                                </th>
                                <th style={{ textAlign:"center", width:"8%"}}>
                                    <Button bsStyle="primary" onClick={this.sortPromoPrice}>Promo Price</Button>
                                </th>
                                <th style={{ width:"5%"}}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderProductList()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>
                                    MainImage:<input type="text" ref="Image1" style={{ margin: "5px 0" }} />
                                    SubImage: <input type="text" ref="Image2" style={{ margin: "5px 0" }} />
                                    SubImage: <input type="text" ref="Image3" style={{ margin: "5px 0" }} />
                                </td>
                                <td>
                                    <input type="text" ref="Brand" style={{ maxWidth: "105px" }}/>
                                </td>
                                <td>
                                    <input type="text" ref="ProductName" style={{ maxWidth: "120px" }}/>
                                </td>
                                <td>
                                    <textarea type="text" ref="Description" />
                                </td>
                                <td>
                                    1:<input type="text" ref="Features1" style={{ margin: "5px 0" }} />
                                    2:<input type="text" ref="Features2" style={{ margin: "5px 0" }} />
                                    3:<input type="text" ref="Features3" style={{ margin: "5px 0" }} />
                                    4:<input type="text" ref="Features4" style={{ margin: "5px 0" }} />
                                </td>
                                <td>
                                    <input type="text" ref="NormalPrice" style={{ maxWidth: "105px" }}/>
                                </td>
                                <td>
                                    <input type="text" ref="SalePrice" style={{ maxWidth: "105px" }}/>
                                </td>
                                <td><input type="button" className="btn btn-primary" value="Add" onClick={this.onBtnAddClick}/></td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                {this.renderAdminProduct()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps)(AdminProductPage);
