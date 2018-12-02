import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Button, Grid, Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url/apiurl';
import pagenotfound from '../images/pagenotfound.png';
import logo from '../images/logo.png';

const Sort = [
    { label: "All Courier", value: 0 },
    { label: "JNA", value: 1 },
    { label: "T&T", value: 2 },
    { label: "Samurai Express", value: 3 }
];

var click = true;


class AdminTransactionPage extends Component {
    state = { amdinList: [], transDetail: [], payment: [], invoice: [], invoiceNumber: [], showDetail: false, showPayment: false, showInvoice: false }

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
        axios.get(API_URL_1 + '/adminpayment/' + id)
        .then((res) => {
            this.setState({ payment: res.data })
        })
    }

    onInvoiceClick = (id) => {
        this.setState({ showInvoice: true })
        axios.get(API_URL_1 + '/getInvoiceNumber/' + id)
        .then((res) => {
            this.setState({ invoiceNumber: res.data })
        })
        axios.get(API_URL_1 + '/admintransdetail/' + id)
        .then((res) => {
            this.setState({ invoice: res.data })
        })
    }

    romanize = (num) => {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                   "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                   "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    }

    onBtnConfimPayment = (id) => {
        const date = new Date();
        const getFullYear = (date.getFullYear()).toString();
        const getYear = getFullYear.slice(-2);
        const getMonth = (date.getMonth()).toString();
        const getDate = (date.getDate()).toString();
        const getFullDate = getFullYear + getMonth + getDate;
        const getHours = (date.getHours()).toString();
        const getMinutes = (date.getMinutes()).toString();
        const getSeconds = (date.getSeconds()).toString();
        const getMilliseconds = (date.getMilliseconds()).toString();
        const msLength = () => {
            if(getMilliseconds.length === 1) {
                return ("00" + (date.getMilliseconds()).toString())
            }
            else if(getMilliseconds.length === 2) {
                return ("0" + (date.getMilliseconds()).toString())
            }
            else {
                return (date.getMilliseconds()).toString()
            }
        }
        const invoiceNumber = "INV/" + getFullDate + "/" + this.romanize(getYear) + '/' + this.romanize(getMonth) + '/' + getHours + getMinutes + getSeconds + msLength();

        axios.post(API_URL_1 + '/addNewInvoice/' + id, {
            idTransaction: id,
            InvNumber: invoiceNumber
        })
        .then((res) => {
            console.log(res)
        })
        axios.put(API_URL_1 + '/adminConfirmationPayment/' + id, {
            Status: "Shipping"
        })
        .then((res) => {
            this.setState({ amdinList: res.data, showPayment: false })
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
        this.setState({ showPayment: false, showInvoice: false , payment: [], invoice: [] })
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
                <div key={index}>
                    <Table condensed hover striped>
                        <tbody id="admin-payment-modal">
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
                        <Button bsStyle="success" bsSize="large" style={{ outline: "none" }} onClick={() => this.onBtnConfimPayment(item.idTransaction)}>Confirm Payment</Button>
                    </div>
                </div>
            );
        })
        return paymentList;
    }

    renderHeaderModalInvoice = () => {
        const invoiceHeader = this.state.invoiceNumber.map((item, index) => {
            return(
                <table id="modal-header-invoice" key={index}>
                    <tr>
                        <td>Number</td>
                        <td>{item.InvNumber}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{item.Date}</td>
                    </tr>
                </table>
            );
        })
        return invoiceHeader;
    }

    renderBodyModalInvoice = () => {
        const invoiceBody = this.state.invoice.map((item, index) => {
            return(
                <tr id="modal-body-invoice" key={index}>
                    <td>{item.ProductName}</td>
                    <td>{item.quantity}</td>
                    <td>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td>Rp. {(parseInt(item.quantity*item.SalePrice)).toLocaleString('id')},-</td>
                </tr>
            );
        })
        return invoiceBody;
    }

    renderFooterInvoice = () => {
        const subtotal = this.state.invoiceNumber.map((item, index) => {
            return(
                <tfoot key={index} id="modal-footer-invoice">
                    <tr>
                        <td>SubTotal</td>
                        <td></td>
                        <td></td>
                        <td>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                    </tr>
                    <tr>
                        <td>Courier - {item.Courier}</td>
                        <td></td>
                        <td></td>
                        <td>Free</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Total</td>
                        <td></td>
                        <td>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                    </tr>
                    <h3>Shipping Destination</h3>
                    <p>{item.Address}</p>
                </tfoot>
            );
        })
        return subtotal
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
            else if(item.Status === 'Shipping') {
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
                            <Button bsStyle="info" onClick={() => this.onInvoiceClick(item.idTransaction)} style={{ outline: 'none' }}>Invoice</Button>
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
                                                <tr id="vertical-head-center">
                                                    <th colSpan="2">Product</th>
                                                    <th>Price/Unit</th>
                                                    <th>Quantity</th>
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

                                {/* =================================== Modal PopUp Payment Confirmation ========================================= */}
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

                                {/* ==================================== Modal PopUp Invoice ================================================================ */}
                                <Modal show={this.state.showInvoice} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title" dialogClassName="custom-invoice-modal">
                                    <Modal.Header closeButton onClick={() => this.closeModalButton()}>
                                        <Modal.Title id="contained-modal-title">
                                            <img src={logo} style={{ maxWidth: "35px", marginLeft: "10px", marginRight: "15px" }}/>ONETech
                                            <h3 style={{ marginLeft: "10px" }}>Invoice</h3>
                                        </Modal.Title>
                                        {this.renderHeaderModalInvoice()}
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Table striped condensed>
                                            <thead>
                                                <tr id="vertical-head-center">
                                                    <th>Product Name</th>
                                                    <th>Quantity</th>
                                                    <th>Product Price</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderBodyModalInvoice()}
                                            </tbody>
                                            {this.renderFooterInvoice()}
                                        </Table>
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
