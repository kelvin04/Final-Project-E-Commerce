import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Button, Grid, Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url/apiurl';
import pagenotfound from '../images/pagenotfound.png';

const Sort = [
    { label: "All Courier", value: 0 },
    { label: "JNA", value: 1 },
    { label: "T&T", value: 2 },
    { label: "Samurai Express", value: 3 }
];

var click = true;

class AdminTransactionPage extends Component {
    state = { amdinList: [], transDetail: [], payment: [], showDetail: false, showPayment: false }

    componentWillMount() {
        this.getAdminTransList();
    }
    
    getAdminTransList = () => {
        axios.get(API_URL_1 + '/admintransaction')
        .then((res) => {
            this.setState({ amdinList: res.data })
        })
    }

    onTransDetailClick = (id) => {
        this.setState({ showDetail: true });
        axios.get(API_URL_1 + '/admintransdetail/' + id)
        .then((res) => {
            this.setState({ transDetail: res.data })
        })
    }

    onPaymentConfirmationClick = (id) => {
        this.setState({ showPayment: true });
        axios.get(API_URL_1 + '/adminpayment' +id)
        .then((res) => {
            this.setState({ payment: res.data })
        })
    }

    onBtnSearchClick = () => {
        axios.get(API_URL_1 + '/searchTransDetail', {
            params: {
                username: this.refs.UsernameSearch.value
            }
        })
        .then((res) => {
            console.log(res);
            this.setState({ amdinList: res.data })
        })
        .catch((err) => {
            alert("Error!");
            console.log(err);
        })
    }

    onBtnResetClick = () => {
        this.getAdminTransList();
        this.refs.UsernameSearch.value = "";
    }

    onCourierFilter = (value) => {
        if(value === "All Courier") {
            axios.get(API_URL_1 + '/admintransaction')
            .then((res) => {
                this.setState({ amdinList: res.data })
            })
        }
        else {
            axios.get(API_URL_1 + '/courierfilter', {
                params: { 
                    Courier: value,
                    username: this.refs.UsernameSearch.value
                }
            })
            .then((res) => {
                this.setState({ amdinList: res.data });
            })
        }
    }

    onSortTotalPrice = () => {
        if (click) {
            axios.get(API_URL_1 + '/adminSortTotalPrice', {
                params: { 
                    username: this.refs.UsernameSearch.value
                }
            })
            .then((res) => {
                this.setState({ amdinList: res.data })
            });
            click = false;
        }
        else {
            axios.get(API_URL_1 + '/adminSortTotalPriceDesc', {
                params: { 
                    username: this.refs.UsernameSearch.value
                }
            })
            .then((res) => {
                this.setState({ amdinList: res.data })
            });
            click = true;
        }
    }

    closeModalButton = () => {
        this.setState({ showPayment: false, payment: [] })
    }

    renderModalTransDetail = () => {
        const modalList = this.state.transDetail.map((item, index) => {
            return (
                <tr key={index} id="vertical-text-center">
                    <td>
                        <img src={require('../images/' + item.Image1)} style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }} />
                    </td>
                    <td>{item.ProductName}</td>
                    <td>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td>{item.quantity}</td>
                </tr>
            );
        })
        return modalList;
    }

    renderModalPaymentConfirmation = () => {
        const paymentList = this.state.payment.map((item, index) => {
            return (
                <div>
                    <Table condensed hover striped>
                        <tbody key={index} id="admin-payment-modal">
                            <tr>
                                <td>Total Price</td>
                                <td>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                            </tr>
                            <tr>
                                <td>Payment Method</td>
                                <td>{item.Method}</td>
                            </tr>
                            <tr>
                                <td>User Bank Account</td>
                                <td>{item.FromBankAccount}</td>
                            </tr>
                            <tr>
                                <td>User Account Name</td>
                                <td>{item.FromNameAccount}</td>
                            </tr>
                            <tr>
                                <td>User Account Number</td>
                                <td>{item.FromNumAccount}</td>
                            </tr>
                            <tr>
                                <td>Bank Destination</td>
                                <td>{item.AccountDestination}</td>
                            </tr>
                            <tr>
                                <td>Amount Has Been Transferred</td>
                                <td>Rp. {(parseInt(item.AmountPaid)).toLocaleString('id')},-</td>
                            </tr>
                            <tr>
                                <td>Payment Slip</td>
                                <td>
                                    <img src={require('../../../public/Payment Slip Uploads/' + item.PaymentSlip)} style={{ maxHeight:"450px", maxWidth: "500px", margin:"10px 0" }} />
                                </td>
                            </tr>
                            
                        </tbody>
                    </Table>

                    <div style={{ textAlign: "center" }}> 
                        <Button bsStyle="success" bsSize="large" style={{ outline: "none" }} onClick={() => this.onBtnConfimPayment()}>Confirm Payment</Button>
                    </div>
                </div>
            );
        })
        return paymentList;
    }

    renderTransactionList = () => {
        const list = this.state.amdinList.map((item, index) => {
            if(item.Status === 'Waiting for Admin Confirmation') {
                return (  
                    <tr key={index} id="transaction-history-list">
                        <td style={{ padding: "15px 0" }}>
                            <Button bsStyle="primary" onClick={() => this.onTransDetailClick(item.idTransaction)} style={{ outline: "none" }}>{item.idTransaction}</Button>
                        </td>
                        <td>{item.username}</td>
                        <td>{item.Date}</td>
                        <td>{item.Time}</td>
                        <td>{item.Address}</td>
                        <td>{item.Courier}</td>
                        <td>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                        <td>
                            <Button bsStyle="success" onClick={() => this.onPaymentConfirmationClick(item.idTransaction)} style={{ outline: 'none' }}>Confirmation</Button>
                        </td>
                    </tr>
                );
            }
            return (  
                <tr key={index} id="transaction-history-list">
                    <td>
                        <Button bsStyle="primary" onClick={() => this.onTransDetailClick(item.idTransaction)} style={{ outline: "none" }}>{item.idTransaction}</Button>
                    </td>
                    <td>{item.username}</td>
                    <td>{item.Date}</td>
                    <td>{item.Time}</td>
                    <td>{item.Address}</td>
                    <td>{item.Courier}</td>
                    <td>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                    <td>{item.Status}</td>
                </tr>
            );
        })
        return list;
    }

    renderAdminTransList = () => {
        if(this.props.auth.username != "admin") {
            return (
                <div style={{ marginTop: '160px', textAlign: 'center' }}>
                    <img src={pagenotfound} style={{ width:"100%", maxWidth:"430px", height:"auto" }} /><br/><br/>
                    <h2>Page Not Found!</h2>
                </div>
            );
        }
        else {
            return (
                <div style={{ margin: "85px 5px 0px 5px" }}>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={4}>
                                <h2 style={{ color: "#ff5722", fontWeight: "bold", marginTop: "0" }}>Admin Transaction List</h2>
                            </Col>
                            <Col xs={12} md={8}>
                                <div style={{ textAlign: "center" }}>
                                    <input type="text" ref="UsernameSearch" placeholder="Search Username" style={{ marginRight: '10px'}} />
                                    <Button bsStyle="success" style={{ marginRight: "10px" }} onClick={this.onBtnSearchClick} style={{ outline: "none", marginRight: "10px" }}>Search</Button>
                                    <Button bsStyle="danger" onClick={this.onBtnResetClick} style={{ outline: "none" }}>Reset</Button>
                                </div>

                                {/* ======================================== Modal PopUp =================================================*/}
                                <Modal show={this.state.showDetail} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title">
                                    <Modal.Header>
                                        <Modal.Title id="contained-modal-title">
                                            <p style={{ textAlign: "center" }}>Transaction History</p>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Table condensed hover>
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign:"center" }} colSpan="2">Product</th>
                                                    <th style={{ textAlign:"center" }}>Price/Unit</th>
                                                    <th style={{ textAlign:"center" }}>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderModalTransDetail()}
                                            </tbody>
                                        </Table>  
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button bsStyle="danger" onClick={() => this.setState({ showDetail: false, transDetail: [] })} style={{ outline: "none" }}>Close</Button>
                                    </Modal.Footer>
                                </Modal>

                                {/* =================================== Modal PopUp Payment Confirmation========================================= */}
                                <Modal show={this.state.showPayment} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title" bsSize="large">
                                    <Modal.Header closeButton onClick={() => this.closeModalButton()}>
                                        <Modal.Title id="contained-modal-title">
                                            <h3 style={{ textAlign: "center" }}>Admin Payment Confirmation</h3>
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {this.renderModalPaymentConfirmation()}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button bsStyle="danger" onClick={() => this.closeModalButton()} style={{ outline: "none" }}>Close</Button>
                                    </Modal.Footer>
                                </Modal>
                                {/* ====================================================================================================== */}

                            </Col>
                        </Row>
                    </Grid>
                    
                    <div style={{ marginTop: "20px" }}>
                        <Table striped condensed hover>
                            <thead>
                                <tr id="vertical-head-center">
                                    <th style={{ width: "4%" }}>Transaction ID</th>
                                    <th style={{ width: "7%" }}>Username</th>
                                    <th style={{ width: "7%" }}>Date</th>
                                    <th style={{ width: "7%" }}>Time</th>
                                    <th style={{ width: "13%" }}>Address</th>
                                    <th style={{ width: "7%" }}>
                                        <Select options={Sort} onChange={opt => this.onCourierFilter(opt.label)} placeholder="Courier" isSearchable={false}/>
                                    </th>
                                    <th style={{ width: "8%" }}>
                                        <Button bsStyle="primary" onClick={this.onSortTotalPrice}>Total Price</Button>
                                    </th>
                                    <th style={{ width: "7%" }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTransactionList()}
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        }   
    }

    renderAdminHistoryPage = () => {
        if(this.state.amdinList.length == 0 || this.state.amdinList.length == 1 || this.state.amdinList.length == 2) {
            return (
                <div style={{ margin: "90px 30px 230px 30px" }}>
                    {this.renderAdminTransList()}
                </div>
            );
        }
        else {
            return (
                <div style={{ margin: "90px 30px 70px 30px" }}>
                    {this.renderAdminTransList()}
                </div>
            );
        }
    }

    render() { 
        return (
            <div>
                {this.renderAdminHistoryPage()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps)(AdminTransactionPage);
