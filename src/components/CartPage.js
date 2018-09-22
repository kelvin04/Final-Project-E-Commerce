import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import '../supports/css/components/cartpage.css';

const thStyle ={
    textAlign: "center"
}

class CartPage extends Component {
    state = { cartList: [], selectedId: 0 }

    getCartList = () => {
        axios.get(API_URL_1 + '/movies')
        .then((response) => {
            this.setState({ cartList: response.data, selectedId:0 });
        })
        .catch((err) => {
            // alert("Error Occured!")
            console.log(err);
        })
    }

    componentWillMount() {
        this.getCartList();
    }

    renderCartList = () => {
        const list = this.state.cartList.map((item) => {
            if(this.state.selectedId !== item.id) {
                return(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.image}</td>
                        <td>{item.title}</td>
                        <td>Unit Price{item.url}</td>
                        <td>Quantity{item.url}</td>
                        <td>Total Price{item.url}</td>
                        <td><input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick(item.id)} /></td>
                        <td><input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)}/></td>
                    </tr>
                );
            }
            return(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.image}</td>
                    <td>{item.title}</td>
                    <td>{item.url}</td>
                    <td>**"AAA"**{item.url}</td>
                    <td colSpan="2"><input type="button" className="btn btn-success" value="Update" onClick={(refs) => this.onBtnUpdateClick(item.id, refs)} /></td>
                </tr>
            );
        })
        return list;
    }

    render() { 

        return ( 
            <div style={{ margin: "80px 60px 0px 60px" }}>
                <h2 style={{ color: "#ff5722", fontWeight: "bold" }}>My Shopping Cart</h2><br/>
                <Table striped bordered condensed hover >
                    <thead>
                        <tr>
                            <th style={{ textAlign:"center", width:"3%"}}>No.</th>
                            <th style={{ textAlign:"center", width:"20%"}}>Product</th>
                            <th style={{ textAlign:"center", width:"10%"}}>Unit Price</th>
                            <th style={{ textAlign:"center", width:"6%"}}>Quantity</th>
                            <th style={{ textAlign:"center", width:"10%"}}>Total Price</th>
                            <th colSpan="2" style={{ textAlign:"center", width:"7%"}}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCartList()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
 
export default CartPage;