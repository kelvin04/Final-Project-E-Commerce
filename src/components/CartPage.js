import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import { Table, Grid, Row, Col, Button, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url/apiurl';
import '../supports/css/components/cartpage.css';
import emptyCart from '../images/cart-empty.png';
import thankYou from '../images/thankyou-minions.png';

const Kurir = [
    { label: "JNA", value: 1 },
    { label: "T&T", value: 2 },
    { label: "Samurai Express", value: 3 }
];

class CartPage extends Component {
    state = { cartList: [], selectedItem: 0, selectedEditId: 0, quantityCart: 0, selectedOption: null }

    componentWillMount() {
        this.getCartList();
    };

    getCartList = () => {
        axios.get(API_URL_1 + `/cart/` + queryString.parse(this.props.location.search).username)
        .then((res) => {
            this.setState({ cartList: res.data, selectedItem: 0, selectedEditId: 0 });
        })
    };

    onQtyChange = (event) => {
        console.log(event.target.value);
        this.setState({ quantityCart: event.target.value })
        console.log(this.state.quantityCart)
    };

    onBtnEditClick = (itemId) => {
        this.setState({ selectedEditId: itemId })
    }

    onBtnDeleteClick = (itemId) => {
        var check = window.confirm("Are you sure to delete this product?");
        if(check == true) {
            axios.delete(API_URL_1 + '/cart/' + itemId, {
                username: this.props.auth.username
            })
            .then(res => {
                this.getCartList();
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
        if(this.refs.editQuantity.value == "") {
            this.setState({ selectedEditId: 0 })
        }
        else {
            axios.put(API_URL_1 + '/cart/' + itemId, {
                quantity: this.refs.editQuantity.value,
                username: this.props.auth.username
            })
            .then(res => {
                this.setState({ cartList: res.data, selectedItem: 0, selectedEditId: 0 });
            })
            .catch((err) => {
                alert("Edit Error!");
                console.log(err);
            })
        }
    }

    selectAddress = (value) => {
        this.setState({ selectedOption: value })
    }

    renderProductTotal = () => {
        var totalPrice = 0;
        this.state.cartList.map((item) =>{
            totalPrice += item.SalePrice * item.quantity
        })
        return totalPrice;
    }

    onCheckoutButton = () => {
        if(this.address.value === "" || this.state.selectedOption === null) {
            this.props.alert.error(
                <div style={{ textTransform: 'capitalize'}}>
                    Please fill the address and select one of the courier.
                </div>
            )
        }
        else if (this.address.value !== "" || this.state.selectedOption !== null) {
            axios.post(API_URL_1 + `/checkout`,{
                username: this.props.auth.username,
                Address: this.address.value,
                Courier: this.state.selectedOption,
                TotalPrice: this.renderProductTotal()
            })
            .then((res) => {
                this.setState({ cartList: "checkoutSuccess" });
            })
        }
    }

    renderCartList = () => {
        const list = this.state.cartList.map((item, index) => {
            if(this.state.selectedEditId !== item.idCart) {
                return(
                    <tr key={index}>
                        <td style={{ textAlign:"center" }}>
                            <Link to={`/productdetails?idProduct=${item.idProduct}`}>
                                <img src={require('../images/' + item.Image1)} alt="" style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }} />
                            </Link>
                        </td>
                        <td style={{ verticalAlign:"middle" }}>{item.ProductName}</td>
                        <td style={{ textAlign:"center", verticalAlign:"middle" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                        <td style={{ textAlign:"center", verticalAlign:"middle" }}>{item.quantity}</td>
                        <td style={{ textAlign:"center", verticalAlign:"middle" }}>Rp. {(parseInt(item.quantity*item.SalePrice)).toLocaleString('id')},-</td>
                        <td style={{ textAlign:"center", verticalAlign:"middle" }}>
                            <input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick(item.idCart)} style={{ outline: "none" }} /><br/><br/>
                            <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.idCart)} style={{ outline: "none" }} />
                        </td>
                    </tr>
                );
            }
            return(
                <tr key={index}>
                    <td style={{ textAlign:"center" }}>
                        <img src={require('../images/' + item.Image1)} alt="" style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }} onClick={() => this.selectedProduct(item.idProduct)} />
                    </td>
                    <td style={{ verticalAlign:"middle" }}>{item.ProductName}</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>
                        <input ref="editQuantity" type="number" style={{ maxWidth:"30%", minWidth:"35px" ,textAlign:"right" }} min="1" max="99" onChange={(value) => this.onQtyChange(value)} />
                    </td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>Rp. {(parseInt(item.quantity*item.SalePrice)).toLocaleString('id')},-</td>
                    <td colSpan="2" style={{ textAlign:"center", verticalAlign:"middle" }}>
                        <input type="button" className="btn btn-success" value="Update" onClick={(refs) => this.onBtnUpdateClick(item.idCart, refs)} style={{ outline: "none" }} /><br/><br/>
                        <input type="button" className="btn btn-danger" value="Cancel" onClick={() => this.onBtnCancelClick()} style={{ outline: "none" }} />
                    </td>
                </tr>
            );
        })
        return list;
    }

    renderUserCartList = () => {
        if(this.state.cartList === "checkoutSuccess"){
            return(
                <div style={{ marginTop: '100px', marginBottom:"100px", textAlign: 'center' }}>
                    <img src={thankYou} alt="" style={{ width:"100%", maxWidth:"700px", height:"auto" }} />
                </div>
            );
        }
        else if(this.state.cartList.length == 0) {
            return(
                <div style={{ marginTop: '120px', marginBottom: "100px", textAlign: 'center' }}>
                    <img src={emptyCart} alt="" style={{ width:"100%", maxWidth:"430px", height:"auto" }} />
                    <br/>
                    <div style={{ marginTop: "50px", outline: "none" }}>
                        <Link to={`/allproductpage?search=`}>
                            <Button bsStyle="success" bsSize="large" style={{ outline: "none" }} >Click here to shop!</Button>
                        </Link>
                    </div>
                </div>
            );
        }
        return(
        <div style={{ margin: "80px 60px 80px 60px" }}>
            <h2 style={{ color: "#ff5722", fontWeight: "bold" }}>My Shopping Cart</h2><br/>
                <Table condensed hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign:"center", width:"13%"}} colspan="2">Product</th>
                            <th style={{ textAlign:"center", width:"10%"}}>Unit Price</th>
                            <th style={{ textAlign:"center", width:"6%"}}>Quantity</th>
                            <th style={{ textAlign:"center", width:"10%"}}>Total Price</th>
                            <th colSpan="2" style={{ textAlign:"center", width:"7%"}}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCartList()}
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
                <div style={{ marginTop: "30px" }}>
                    <Grid>
                        <Row>
                            <Col xs={0} md={4}>
                            </Col>
                            <Col xs={0} md={4}>
                                <p style={{ fontWeight: "bold" }}>Shipping Options</p>
                                <p>Destination Address :</p>
                                <FormControl componentClass="textarea" placeholder="textarea" inputRef={input => this.address = input}/>
                                <div style={{ marginTop: "10px", marginBottom: "20px"}}>
                                    <p>Choose Courier :</p>
                                    <Select options={Kurir} onChange={opt => this.selectAddress(opt.label)} isSearchable={false}/>
                                </div>
                            </Col>
                            <Col xs={6} md={2}>
                                <p style={{ textAlign: 'left' }}>Shipping</p>
                                <p style={{ textAlign: 'left' }}>Product Total</p>
                                <hr style={{ height: '1px', backgroundColor: 'black', width: '150%' }}/>
                                <p style={{ textAlign: 'left', fontWeight: 'bold' }}>SubTotal</p> 
                            </Col>
                            <Col xs={6} md={2}>
                                <p style={{ textAlign: 'left' }}>Free</p>
                                <p style={{ textAlign: 'left' }}>Rp. {(parseInt(this.renderProductTotal())).toLocaleString('id')},-</p>
                                <hr style={{ height: '1px', backgroundColor: 'black', width: '40%' }}/>
                                <p style={{ textAlign: 'left', fontWeight: 'bold' }} >Rp. {(parseInt(this.renderProductTotal())).toLocaleString('id')},-</p>
                            </Col>
                        </Row>
                            <div style={{ textAlign: "center", marginTop: "30px" }}>
                                <Button bsStyle="success" id="addcart-button" style={{ outline: 'none' }} onClick={this.onCheckoutButton}>Checkout</Button>
                            </div>
                    </Grid>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderUserCartList()}
            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps)(withAlert(CartPage));