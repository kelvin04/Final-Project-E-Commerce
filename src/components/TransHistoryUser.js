import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { Table, Button, Grid, Row, Col, Modal, Thumbnail, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { API_URL_1 } from '../supports/api-url/apiurl';
import loading from '../images/Loading_icon.gif';
import blankProfile from '../images/blank-profile.png';
import logo from '../images/logo.png';

const Method = [
    { label: "Internet Banking", value: 1 },
    { label: "ATM Transfer", value: 2 },
    { label: "Mobile Banking", value: 3 },
    { label: "Setoran / Transfer Tunai", value: 4 },
];

const userBankAcc = [
    { label: "BCA", value: 1 },
    { label: "Mandiri", value: 2 },
    { label: "BNI", value: 3 },
    { label: "CIMB", value: 4 },
    { label: "OCBC NISP", value: 5 }
];

const bankDestination = [
    { label: "BCA - PT.ONETech", value: 1 },
    { label: "Mandiri - PT.ONETech", value: 2 },
    { label: "BNI - PT.ONETech", value: 3 },
    { label: "CIMB Niaga - PT.ONETech", value: 4 },
    { label: "OCBC NISP - PT.ONETech", value: 5 }
];

class TransHistoryUser extends Component {
    state = { historyList: [], transDetail: [], payment: [], profile: [], invoice: [], invoiceNumber: [],
              edit: false, showDetail: false, showPayment: false, showInvoice: false,
              selectedMethod: null, selectedFromAcc: null, selectedBank: null, selectedAccDestination: null, 
              IDTransaction: '', file: '', previewImage : '', loadingUpload: false, previewProfile: '' }

    componentWillMount() {
        this.getUserHistoryList();
        this.getUserProfile();
    }

    getUserHistoryList = () => {
        axios.get(API_URL_1 + `/userhistory/` + queryString.parse(this.props.location.search).username)
        .then((res) => {
            this.setState({ historyList: res.data })
        })
    }

    getUserProfile = () => {
        axios.get(API_URL_1 + '/userprofile/' + queryString.parse(this.props.location.search).username)
        .then((res) => {
            this.setState({ profile: res.data })
            console.log(this.state.profile)
        })
    }

    onUserTransDetailClick = (id) => {
        this.setState({ showDetail: true })
        axios.get(API_URL_1 + '/admintransdetail/' + id)
        .then((res) => {
            this.setState({ transDetail: res.data })
        })
    }

    onUserPaymentStatus = (id) => {
        this.setState({ showPayment: true, IDTransaction: id })
        axios.get(API_URL_1 + '/statusPayment/' + id)
        .then((res) => {
            this.setState({ payment: res.data })
        })
    }

    // ============================================== Edit User Profile ==========================================================
    
    onBtnEditClick = () => {
        this.setState({ edit: true })
        console.log('edit')
    }

    onBtnSaveClick = (id) => {
        const formData = new FormData();
        formData.append('userPhoto', this.state.file);
        if(this.state.file) {
            axios.put(API_URL_1 + '/uploadUserPhoto/' + id, formData)
            .then((res) => {
                console.log(res)
            })
        }
        axios.put(API_URL_1 + '/updateprofile/' + id, {
            username: this.props.auth.username,
            address: this.refs.address.value
        })
        .then((res) => {
            this.setState({ profile: res.data, edit: false, previewImage: '', previewProfile: '' })
        })
    }

    onBtnCancelClick = () => {
        this.setState({ edit: false, previewImage: '', previewProfile: '' })
    }


    //=============================================== Payment ========================================================= 

    onInvoiceClick = (id) => {
        this.setState({ showInvoice: true })
        axios.get(API_URL_1 + '/getInvoiceNumber/' + id)
        .then((res) => {
            this.setState({ invoiceNumber: res.data })
        })
        axios.get(API_URL_1 + '/userhistorydetail/' + id)
        .then((res) => {
            this.setState({ invoice: res.data })
        })
    }

    selectPaymentMethod = (value) => {
        this.setState({ selectedMethod: value })
    }

    selectFromAccount = (value) => {
        this.setState({ selectedFromAcc: value })
    }

    selectAccountDestination= (value) => {
        this.setState({ selectedAccDestination: value })
    }

    changeImgPreview = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({ file: file, previewImage: reader.result, previewProfile: reader.result })
        }
        if(file) {
            reader.readAsDataURL(file)
        }
    }

    renderImagePreview = () => {
        const { previewImage } = this.state;
        if(previewImage) {
            return (
                <img src={previewImage} />
            );
        }
        else {
            return (
                <p>Image extensions must be .jpg, .jpeg or .png</p>
            );
        }
    }

    closeModalButton = () => {
        this.setState({ showPayment: false, showInvoice: false, file: '', previewImage: '', selectedMethod: null, selectedBank: null, selectedAccDestination: null })
    }
    
    submitPaymentButton = () => {
        const { loadingUpload } = this.state;
        if(loadingUpload === false) {
            return <Button bsStyle="success" bsSize="large" style={{ outline: "none" }} onClick={() => this.onBtnSubmitPayment()}>Submit</Button>
        }
        else if(loadingUpload === true) {
            return <img src={loading} style={{ maxHeight: "90px", width: "auto" }}/>
        }
    }

    onBtnSubmitPayment = () => {
        const { file, IDTransaction, selectedMethod, selectedFromAcc, selectedAccDestination } = this.state;
        const formData = new FormData();
        formData.append('paymentSlip', file);
        
        var fileExtension;
        if(file === '') {
            return alert("Payment Slip has not been uploaded!");
        }
        else {
            fileExtension = ((file.name).toLowerCase()).split('.').pop();
        }

        if(file.size <= 1000000 && (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") &&
           selectedMethod !== null && selectedFromAcc !== null && this.fromAccountNum.value !== '' && 
           this.fromAccountName.value !== '' && selectedAccDestination !== null && this.amountPaid.value !== '') {
            this.setState({ loadingUpload: true })
            axios.post(API_URL_1 + '/uploadPaymentData', {
                idTransaction: IDTransaction,
                Method: selectedMethod,
                FromBankAccount : selectedFromAcc,
                FromNumAccount: this.fromAccountNum.value,
                FromNameAccount: this.fromAccountName.value,
                AccountDestination: selectedAccDestination,
                AmountPaid: this.amountPaid.value
            })
            .then((res) => {
                console.log(res.data)
            })
            axios.post(API_URL_1 + '/uploadPaymentImage', formData)
            .then((res) => {
                console.log(res)
            })
            axios.put(API_URL_1 + '/updatePaymentStatus/' + IDTransaction, {
                username: queryString.parse(this.props.location.search).username,
                Status : "Waiting for Admin Confirmation"
            })
            .then((res) => {
                console.log('Upload success!!')
                console.log(res.data)
                this.closeModalButton();
                this.setState({ loadingUpload: false })
                this.getUserHistoryList();
                this.getUserProfile();
            })
        }
        else if(selectedMethod === null || selectedFromAcc === null || this.fromAccountNum.value === '' || 
                this.fromAccountName.value === '' || selectedAccDestination === null || this.amountPaid.value === '') {
            return alert("Select & input field cannot be left blank!");
        }
        else if(file.size > 1000000 && (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png")) {
            return alert("File size must be lower than 1MB!");
        }
        else if(fileExtension !== "jpg" || fileExtension !== "jpeg" || fileExtension !== "png"){
            return alert("Image extensions must be .jpg, .jpeg or .png!");
        }
    }    

    renderUserHistory = () => {
        const list = this.state.historyList.map((item, index) => {
            if(item.Status === 'Waiting for Payment') {
                return (    
                    <tr key={index} id="transaction-history-list">
                        <td>
                            <Button bsStyle="primary" onClick={() => this.onUserTransDetailClick(item.idTransaction)} style={{ outline: "none" }}>{item.TransactionID}</Button>
                        </td>
                        <td>{item.Date}</td>
                        <td>{item.Time}</td>
                        <td>{item.Address}</td>
                        <td>{item.Courier}</td>
                        <td>Rp. {(parseInt(item.TotalPrice)).toLocaleString('id')},-</td>
                        <td>
                            <Button bsStyle="success" onClick={() => this.onUserPaymentStatus(item.idTransaction)} style={{ outline: 'none' }}>Payment Confirmation</Button>
                        </td>
                    </tr>
                );
            }
            else if(item.Status === 'Shipping') {
                return (    
                    <tr key={index} id="transaction-history-list">
                        <td>
                            <Button bsStyle="primary" onClick={() => this.onUserTransDetailClick(item.idTransaction)} style={{ outline: "none" }}>{item.TransactionID}</Button>
                        </td>
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
                        <Button bsStyle="primary" onClick={() => this.onUserTransDetailClick(item.idTransaction)} style={{ outline: "none" }}>{item.TransactionID}</Button>
                    </td>
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

    renderModalTransDetail = () => {
        const modalList = this.state.transDetail.map((item, index) => {
            return (
                <tr key={index} id="vertical-text-center">
                    <td>
                        <img src={require('../images/' + item.Image1)} alt="" style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }} />
                    </td>
                    <td>{item.ProductName}</td>
                    <td>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td>{item.quantity}</td>
                </tr>
            );
        })
        return modalList;
    }

    renderModalPayment = () => {
        const paymentList = this.state.payment.map((item, index) => {
            return (
                <div key={index}>
                    <Grid>
                        <Row>
                            <Col xs={4} md={3}>
                                <p style={{ marginBottom: "20px" }}>Total Price</p>
                            </Col>
                            <Col xs={8} md={9}>
                                <p>Rp. {(item.TotalPrice).toLocaleString('id')},-</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3}>
                                <p>Payment Method</p>
                            </Col>
                            <Col xs={8} md={9}>
                                <div style={{ maxWidth: '520px', marginBottom: '20px' }}>
                                    <Select options={Method} onChange={opt => this.selectPaymentMethod(opt.label)} isSearchable={false}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3}>
                                <p>From Account</p>
                            </Col>
                            <Col xs={8} md={9}>
                                <div style={{ marginBottom: '20px' }}>
                                    <Row>
                                        <Col xs={4} md={3}>
                                            <Select options={userBankAcc} onChange={opt => this.selectFromAccount(opt.label)} isSearchable={false}/>
                                        </Col>
                                        <Col xs={4} md={9}>
                                            <div style={{ maxWidth: '300px' }}>
                                                <FormControl type="text" placeholder="Input your account number" inputRef={input => this.fromAccountNum = input}/>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3}>
                                Account Under Name
                            </Col>
                            <Col xs={8} md={9}>
                                <div style={{ maxWidth: '520px', marginBottom: '20px' }}>
                                    <FormControl type="text" placeholder="Input bank account under name (of)" inputRef={input => this.fromAccountName = input}/>      
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3}>
                                Account Destination
                            </Col>
                            <Col xs={8} md={9}>
                                <div style={{ maxWidth: '520px', marginBottom: '20px' }}>
                                    <Select options={bankDestination} onChange={opt => this.selectAccountDestination(opt.label)} isSearchable={false}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3}>
                                Amount Has Been Transferred
                            </Col>
                            <Col xs={8} md={9}>
                                <div style={{ maxWidth: '520px', marginBottom: '20px' }}>
                                    <FormControl type="text" placeholder="Input amount that has been paid without decimal" inputRef={input => this.amountPaid = input}/>      
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={3}>
                                Upload Payment Slip
                            </Col>
                            <Col xs={8} md={9}>
                                <div style={{ maxWidth: '520px', marginBottom: '20px' }}>
                                    <input type="file" onChange={(e) => this.changeImgPreview(e)} />
                                    <div className="preview-image"> 
                                        {this.renderImagePreview()}
                                    </div>       
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                    <div style={{ textAlign: "center" }}>
                        {/* <Button bsStyle="success" bsSize="large" style={{ outline: "none" }} onClick={() => this.onBtnSubmitPayment()}>Submit</Button> */}
                        {this.submitPaymentButton()}
                    </div>
                </div>
            );
        })
        return paymentList;
    }

    renderProfileUser = () => {
        const list = this.state.profile.map((item,index) => {
            if(item.photo === null && item.address === null && this.state.edit === false) {
                return (
                    <Grid key={index}>
                        <Row>
                            <Col xs={3} md={3}>
                                <Thumbnail src={blankProfile} circle style={{ maxWidth:"200px" }}/>
                            </Col>
                            <Col xs={9} md={9}>
                                <p>Username  : {item.username}</p>
                                <p>Full Name : {item.fullname}</p>
                                <p>Address   : </p>
                                <input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick()} style={{ outline: "none" }} />
                            </Col>
                        </Row>
                    </Grid>
                );
            }
            else if(item.photo === null && item.address !== null && this.state.edit === false) {
                return (
                    <Grid key={index}>
                        <Row>
                            <Col xs={3} md={3}>
                                <Thumbnail src={blankProfile} circle style={{ maxWidth:"200px" }}/>
                            </Col>
                            <Col xs={9} md={9}>
                                <p>Username : {item.username}</p>
                                <p>Full Name : {item.fullname}</p>
                                <p>Address : {item.address}</p>
                                <input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick()} style={{ outline: "none" }} />
                            </Col>
                        </Row>
                    </Grid>
                );
            }
            else if((item.photo === null || item.address === null) && this.state.edit === true) {
                return (
                    <Grid key={index}>
                        <Row>
                            <Col xs={3} md={3}>
                                <div className="preview-profile">
                                    <input type="file" onChange={(e) => this.changeImgPreview(e)} />
                                    <img src={this.state.previewProfile} />
                                </div>
                            </Col>
                            <Col xs={9} md={9}>
                                <p>Username : {item.username}</p>
                                <p>Full Name : {item.fullname}</p>
                                Address : <textarea type="text" ref="address" defaultValue={item.address}/>
                                <br/><br/>
                                <input type="button" className="btn btn-success" value="Save" onClick={() => this.onBtnSaveClick(item.id)} style={{ outline: "none", marginRight: "15px" }} />
                                <input type="button" className="btn btn-danger" value="Cancel" onClick={() => this.onBtnCancelClick()} style={{ outline: "none" }} />
                            </Col>
                        </Row>
                    </Grid>
                );
            }
            else if((item.photo !== null && item.address !== null) && this.state.edit === false) {
                return (
                    <Grid key={index}>
                        <Row>
                            <Col xs={3} md={3}>
                                <Thumbnail src={require('../../../public/Photo Profile/' + item.photo)} circle style={{ maxWidth:"200px" }}/>
                            </Col>
                            <Col xs={9} md={9}>
                                <p>Username : {item.username}</p>
                                <p>Full Name : {item.fullname}</p>
                                <p>Address : {item.address}</p>
                                <input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick()} style={{ outline: "none" }} />
                            </Col>
                        </Row>
                    </Grid>
                );
            }
            else if((item.photo !== null && item.address !== null) && this.state.edit === true) {
                return (
                    <Grid key={index}>
                        <Row>
                            <Col xs={3} md={3}>
                                <div className="preview-profile">
                                    <input type="file" onChange={(e) => this.changeImgPreview(e)} />
                                    <img src={this.state.previewProfile} />
                                </div>
                            </Col>
                            <Col xs={9} md={9}>
                                <p>Username : {item.username}</p>
                                <p>Full Name : {item.fullname}</p>
                                Address : <textarea type="text" ref="address" defaultValue={item.address}/>
                                <br/><br/>
                                <input type="button" className="btn btn-success" value="Save" onClick={() => this.onBtnSaveClick(item.id)} style={{ outline: "none", marginRight: "15px" }} />
                                <input type="button" className="btn btn-danger" value="Cancel" onClick={() => this.onBtnCancelClick()} style={{ outline: "none" }} />
                            </Col>
                        </Row>
                    </Grid>
                );
            }
            else {
                return (
                    <Grid key={index}>
                        <Row>
                            <Col xs={3} md={3}>
                                <Thumbnail src={require('../../../public/Photo Profile/' + item.photo)} circle style={{ maxWidth:"200px" }}/>
                            </Col>
                            <Col xs={9} md={9}>
                                <p>Username : {item.username}</p>
                                <p>Full Name : {item.fullname}</p>
                                Address : <textarea type="text" ref="address" defaultValue={item.address}/>
                                <br/><br/>
                                <input type="button" className="btn btn-success" value="Save" onClick={() => this.onBtnSaveClick(item.id)} style={{ outline: "none", marginRight: "15px" }} />
                                <input type="button" className="btn btn-danger" value="Cancel" onClick={() => this.onBtnCancelClick()} style={{ outline: "none" }} />
                            </Col>
                        </Row>
                    </Grid>
                );
            }
        })
        return list;
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
                    <p>{item.Name}</p>
                    <p>{item.Address}</p>
                </tfoot>
            );
        })
        return subtotal;
    }

    renderHistoryList = () => {
        return (
            <div>
                <h3 className="header-profile-page">{this.props.auth.username}'s Profile & Transaction History</h3>

                {/* ======================================= Modal PopUp TransDetail ================================================ */}
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
                        <Button bsStyle="danger" onClick={() => this.setState({ showDetail: false })} style={{ outline: "none" }}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* =================================== Modal PopUp Payment Confirmation========================================= */}
                <Modal show={this.state.showPayment} onHide={this.handleHide} container={this} aria-labelledby="contained-modal-title" bsSize="large">
                    <Modal.Header closeButton onClick={() => this.closeModalButton()}>
                        <Modal.Title id="contained-modal-title">
                            <h3 style={{ textAlign: "center" }}>Payment Confirmation</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderModalPayment()}
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

                {/* ================================================================================================== */}

                {this.renderProfileUser()}
                
                <div style={{ marginTop: "20px" }}>
                    <Table striped condensed hover>
                        <thead>
                            <tr id="vertical-head-center">
                                <th style={{ width: "2%" }}>Transaction ID</th>
                                <th style={{ width: "4%" }}>Date</th>
                                <th style={{ width: "4%" }}>Time</th>
                                <th style={{ width: "12%" }}>Address</th>
                                <th style={{ width: "5%" }}>Courier</th>
                                <th style={{ width: "7%" }}>Total Price</th>
                                <th style={{ width: "4%" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUserHistory()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

    renderHistoryPage = () => {
        if(this.state.historyList.length == 0 || this.state.historyList.length == 1 || this.state.historyList.length == 2) {
            return (
                <div style={{ margin: "90px 30px 300px 30px" }}>
                    {this.renderHistoryList()}
                </div>
            );
        }
        else {
            return (
                <div style={{ margin: "90px 30px 70px 30px" }}>
                    {this.renderHistoryList()}
                </div>
            );
        }
    }

    render() {
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
