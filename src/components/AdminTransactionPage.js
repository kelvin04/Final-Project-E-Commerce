import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Button, Grid, Row, Col, Modal } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import pagenotfound from '../images/pagenotfound.png';


class AdminTransactionPage extends Component {
    state = { amdinList: [], transDetail: [], show: false }

    componentWillMount() {
        this.getAdminTransList();
    }
    
    getAdminTransList = () => {
        axios.get(API_URL_1 + '/admintransaction')
        .then((res) => {
            this.setState({ amdinList: res.data })
        })
    }

    renderTransactionList = () => {
        const list = this.state.amdinList.map((item, index) => {
            return (    
                <tr key={index}>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>
                        <Button bsStyle="primary" onClick={() => this.onTransDetailClick(item.idTransaction)} style={{ outline: "none" }}>{item.idTransaction}</Button>
                    </td>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>{item.username}</td>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                </tr>
            );
        })
        return list;
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
    }

    onTransDetailClick = (id) => {
        this.setState({ show: true })
        axios.get(API_URL_1 + '/admintransdetail/' + id)
        .then((res) => {
            this.setState({ transDetail: res.data })
        })
    }

    renderModalTransDetail = () => {
        const modalList = this.state.transDetail.map((item, index) => {
            return (
                <tr key={index}>
                    <td id="vertical-text-center">
                        <img src={require('../images/' + item.Image1)} style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }} />
                    </td>
                    <td id="vertical-text-center">{item.ProductName}</td>
                    <td id="vertical-text-center">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td id="vertical-text-center">{item.quantity}</td>
                </tr>
            );
        })
        return modalList;
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
                <div style={{ margin: "85px 60px 0px 60px" }}>
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
                                <Modal show={this.state.show} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title">
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
                                        <Button bsStyle="danger" onClick={() => this.setState({ show: false })} style={{ outline: "none" }}>Close</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                        </Row>
                    </Grid>
                    
                    <div style={{ marginTop: "20px" }}>
                        <Table striped condensed hover>
                            <thead>
                                <tr>
                                    <th style={{ textAlign:"center" }}>Transaction ID</th>
                                    <th style={{ textAlign:"center" }}>Username</th>
                                    <th style={{ textAlign:"center" }}>Total Price</th>
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
                <div style={{ margin: "90px 60px 230px 60px" }}>
                    {this.renderAdminTransList()}
                </div>
            );
        }
        else {
            return (
                <div style={{ margin: "90px 60px 70px 60px" }}>
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
