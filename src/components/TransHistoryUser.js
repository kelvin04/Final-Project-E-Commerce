import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import { Table, Button, Grid, Row, Col, Modal } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';


class TransHistoryUser extends Component {
    state = { historyList: [], transDetail: [], show: false }

    componentWillMount() {
        this.getUserHistoryList();
    }

    getUserHistoryList = () => {
        axios.get(API_URL_1 + `/userhistory/` + queryString.parse(this.props.location.search).username)
        .then((res) => {
            this.setState({ historyList: res.data })
        })
    }

    onUserTransDetailClick = (id) => {
        this.setState({ show: true })
        axios.get(API_URL_1 + '/admintransdetail/' + id)
        .then((res) => {
            this.setState({ transDetail: res.data })
        })
    }

    renderUserHistory = () => {
        const list = this.state.historyList.map((item) => {
            return (    
                <tr>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>
                        <Button bsStyle="primary" onClick={() => this.onUserTransDetailClick(item.idTransaction)} style={{ outline: "none" }}>{item.TransactionID}</Button>
                    </td>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>{item.Date}</td>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>{item.Time}</td>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>{item.Address}</td>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>{item.Courier}</td>
                    <td id="vertical-text-center" style={{ padding: "15px 0" }}>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                </tr>
            );
        })
        return list;
    }

    renderModalTransDetail = () => {
        const modalList = this.state.transDetail.map((item) => {
            return (
                <tr>
                    <td id="vertical-text-center">
                        <img src={require('../images/' + item.Image1)} alt="" style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }} />
                    </td>
                    <td id="vertical-text-center">{item.ProductName}</td>
                    <td id="vertical-text-center">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td id="vertical-text-center">{item.quantity}</td>
                </tr>
            );
        })
        return modalList;
    }

    renderHistoryList = () => {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={4}>
                            <h3 style={{ color: "#ff5722", fontWeight: "bold", marginTop: "0", marginBottom: "30px" }}>{this.props.auth.username}'s Transaction History</h3>
                        </Col>
                        <Col xs={12} md={8}>

                            {/* ======================================= Modal PopUp ================================================ */}
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
                            {/* ================================================================================================== */}

                        </Col>
                    </Row>
                </Grid>
                
                <Table striped condensed hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign:"center", width: "2%" }}>Transaction ID</th>
                            <th style={{ textAlign:"center", width: "4%" }}>Date</th>
                            <th style={{ textAlign:"center", width: "4%" }}>Time</th>
                            <th style={{ textAlign:"center", width: "10%" }}>Address</th>
                            <th style={{ textAlign:"center", width: "5%" }}>Courier</th>
                            <th style={{ textAlign:"center", width: "7%" }}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUserHistory()}
                    </tbody>
                </Table>
            </div>
        );
    }

    renderHistoryPage = () => {
        if(this.state.historyList.length == 0 || this.state.historyList.length == 1 || this.state.historyList.length == 2) {
            return (
                <div style={{ margin: "90px 60px 300px 60px" }}>
                    {this.renderHistoryList()}
                </div>
            );
        }
        else {
            return (
                <div style={{ margin: "90px 60px 70px 60px" }}>
                    {this.renderHistoryList()}
                </div>
            );
        }
    }

    render() {
        console.log(this.state.historyList.length)
        return (
           this.renderHistoryPage()
        );
    }
}
 
const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps)(TransHistoryUser);
