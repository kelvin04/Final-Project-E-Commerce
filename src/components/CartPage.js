import React, { Component } from 'react';
import axios from 'axios';
import { Table, Image } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import '../supports/css/components/cartpage.css';

class CartPage extends Component {
    state = { cartList: [], selectedId: 0 }

    getCartList = () => {
        axios.get(API_URL_1 + '/allProducts')
        .then((res) => {
            console.log(res);
            this.setState({ cartList: res.data, selectedItem: 0 })
        })
    }

    componentWillMount() {
        this.getCartList();
    }

    onQtyChange = (event) => {
        console.log(event.target.value);
        var price = event.target.value;
        // renderTotalPrice(price);
    }

    renderTotalPrice = (value) => {
        console.log(value)
    }

    renderCartList = () => {
        const list = this.state.cartList.map((item) => {
            // if(this.state.selectedId !== item.id) {
            //     return(
            //         <tr>
            //             <td>{item.id}</td>
            //             <td>{item.image}</td>
            //             <td>{item.title}</td>
            //             <td>Unit Price{item.url}</td>
            //             <td>Quantity{item.url}</td>
            //             <td>Total Price{item.url}</td>
            //             <td><input type="button" className="btn btn-success" value="Edit" onClick={() => this.onBtnEditClick(item.id)} /></td>
            //             <td><input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)}/></td>
            //         </tr>
            //     );
            // }
            return(
                <tr>
                    <td style={{ textAlign:"center" }}><img src={require('../images/' + item.Image1)} style={{ maxHeight:"110px", maxWidth:"100%", margin:"10px 0" }}></img></td>
                    {/* <td><Image src={require('../images/' + item.Image1)} responsive style={{ maxHeight:"150px" }}/></td> */}
                    <td style={{ verticalAlign:"middle" }}>{item.ProductName}</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</td>
                    <td style={{ textAlign:"center", verticalAlign:"middle" }}>
                        <input type="number" style={{ maxWidth:"30%", minWidth:"35px" ,textAlign:"right" }} min="1" max="99" onChange={(value) => this.onQtyChange(value)} />
                    </td>
                    <td>AAA</td>
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
                <Table  responsive condensed hover>
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
                    </tbody>
                </Table>
            </div>
        );
    }
}
 
export default CartPage;