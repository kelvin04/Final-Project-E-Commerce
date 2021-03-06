import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import queryString from 'query-string'
import { withAlert } from 'react-alert'
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import Magnifier from 'react-magnifier';
import '../supports/css/components/ProductDetails.css';
import MainImage from '../images/Loading_icon.gif';

class ProductDetails extends Component {	
	state = { product: [], quantity: 1, images: MainImage }

	componentWillMount() {
		this.getSelectedProduct();
	}
	
	getSelectedProduct = async() => {
		console.log(queryString.parse(this.props.location.search).idProduct)
		axios.get(API_URL_1 + '/productsdetail/' + queryString.parse(this.props.location.search).idProduct)
		.then((res) => {
			this.setState({ product: res.data })
			this.setState({ images: require('../images/' + this.state.product[0].Image1) })
		})
	}

	changeImage1 = () => {
		this.setState({ images: require('../images/' + this.state.product[0].Image1) })
	}

	changeImage2 = () => {
		this.setState({ images: require('../images/' + this.state.product[0].Image2) })
	}

	changeImage3 = () => {
		this.setState({ images: require('../images/' + this.state.product[0].Image3) })
	}

	increment = () => {
		this.setState({ quantity: this.state.quantity+1 })
	}

	decrement = () => {
		this.setState({ quantity: this.state.quantity-1 })
		if(this.state.quantity <= 1) {
			this.setState({ quantity:1 })
		}
	}

	renderNormalPrice = (value) => {
		if(value != 0 && value != 1) {
			return (
				<h3 className="normal-price" style={{ marginTop: "30px" }}>
					Rp. {(parseInt(value)).toLocaleString('id')},-
				</h3>
			);
		}
		else {
			<h3 className="normal-price" style={{ marginTop: "50px" }}></h3>
		}
	}

	addToCart = () => {
		// const { idProduct, ProductName, SalePrice } = this.state.product[0];
		if(this.props.auth.username == "") {
			this.props.alert.error(
				<div style={{ textTransform: 'capitalize', textAlign: 'center' }}>
					You are not Logged In!
				</div>
			)
		}
		else if(this.props.auth.username == "admin") {
			this.props.alert.error(
				<div style={{ textTransform: 'capitalize', textAlign: 'center' }}>
					Admin cannot purchase!
				</div>
			)
		}
		else if(this.props.auth.username != "") {
			axios.post(API_URL_1 + '/cart', {
				idProduct: this.state.product[0].idProduct,
				ProductName: this.state.product[0].ProductName,
				SalePrice: this.state.product[0].SalePrice,
				Image1: this.state.product[0].Image1,
				quantity: this.refs.QuantityProduct.value,
				username: this.props.auth.username
			}).then(res => {
				console.log(res.data);
				this.setState(res.data);
			}).catch(err => {
				console.log(err);
			})
			this.props.alert.success(
				<div style={{ textTransform: 'capitalize', textAlign: 'center' }}>
					Success add to your cart!
				</div>
			)
		}
	}

	renderProductDetail = () => {
		const list = this.state.product.map((item, index) => {
			return (
				<Grid key={index}>
					<div className="container" style={{ paddingLeft:"0px", paddingRight:"0px"}}>
						<Col xs={12} md={7} style={{ paddingLeft:"0px", paddingRight:"0px", marginTop:"85px", textAlign:"center"}}>
							<div style={{ marginBottom:"35px", maxHeight:"350px", maxWidth:"680px" }} >
								<Magnifier src={this.state.images} zoomFactor={1} mgWidth={210} mgHeight={210} mgShape="square"/><br/>
							</div>

							<div style={{ marginBottom:"30px" }}>
							<Row>
								<Col xs={4} md={4}>
									<Image src={require('../images/' + item.Image1)} onClick={this.changeImage1} thumbnail/>
								</Col>
								<Col xs={4} md={4}>
									<Image src={require('../images/' + item.Image2)} onClick={this.changeImage2} thumbnail />
								</Col>
								<Col xs={4} md={4}>
									<Image src={require('../images/' + item.Image3)} onClick={this.changeImage3} thumbnail />
								</Col>
							</Row>
							</div>
							
						</Col>

						<Col xs={12} md={5}>
							<span id="product-detail-header">
								<h3 style={{ marginBottom:"0px" }}>{item.Category}</h3>
								<br/>
								<h1 style={{ marginTop:"0px"}}>{item.ProductName}</h1>
								<br/>
								<p style={{ textAlign: "justify"}}>{item.Description}</p>
								<br/>
								<h4 style={{ marginTop:"0px"}}>Features :</h4>
								<ul style={{ paddingLeft:"15px", marginBottom:"30px", fontWeight:"bold"}}>
									<li>{item.Features1}</li>
									<li>{item.Features2}</li>
									<li>{item.Features3}</li>
									<li>{item.Features4}</li>
								</ul>
								{this.renderNormalPrice(item.NormalPrice)}
								<br/>
								<h2 className="sale-price" style={{marginTop:"0px"}}>Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h2>
								<br/><br/>
								<Row>
									<Col xs={12} sm={4} md={5} >
										<div className="input-group number-spinner" id="item-cart-increment">
											<span className="input-group-btn data-dwn">
												<button className="btn btn-default btn-info" style={{ outline: 'none' }} data-dir="dwn" onClick={this.decrement}><span className="glyphicon glyphicon-minus"></span></button>
											</span>
											<input type="text" className="form-control text-center" value={this.state.quantity} min="1" max="99" style={{minWidth:"80px"}} ref="QuantityProduct"/>
											<span className="input-group-btn data-up">
												<button className="btn btn-default btn-info" style={{ outline: 'none' }} data-dir="up" onClick={this.increment}><span className="glyphicon glyphicon-plus"></span></button>
											</span>
										</div>
									</Col>

									<Col xs={12} sm={8} md={7}>
									<p style={{ textAlign:"center" }}>
										<input type="button" className="btn btn-success" id="addcart-button" style={{ outline: 'none' }}  value="Add to Cart" onClick={this.addToCart} />
									</p>
									</Col>
								</Row>
							</span>
						</Col>
					</div>
				</Grid>
			);
		})
		return list;
	}

    render() {
		console.log(this.state.product)
        return ( 
			<div style={{ marginBottom: "70px" }}>
				{this.renderProductDetail()}
			</div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps)(withAlert(ProductDetails));