import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { API_URL_1 } from '../supports/api-url/apiurl';
import Magnifier from 'react-magnifier';
import Footer from './Footer';
import '../supports/css/components/ProductDetails.css';


const cookies = new Cookies();

class ProductDetails extends Component {	
	state = { product: null, quantity: 1, images: null }

	getSelectedProduct = () => {
		var selected = cookies.get('SelectedProduct')
		axios.get(API_URL_1 + '/products/' + selected)
		.then((res) => {
			this.setState({ product: res.data })
			this.setState({ images: require('../images/' + this.state.product[0].Image1) })
			console.log(this.state.product[0]);
		})
	} 

	componentWillMount() {
		this.getSelectedProduct();
		console.log(this.state.product)
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

	renderNormalPrice = () => {
		if(this.state.product[0].NormalPrice == 0) {
			return <br/>
		}
		else if(this.state.product[0].NormalPrice == 1) {
			return <br/>
		}
		else{
			return <h4 className="normal-price">Rp. {(parseInt(this.state.product[0].NormalPrice)).toLocaleString('id')},-</h4>
		}
	}

    render() {
		console.log('ssasasa')
		console.log(this.props.auth.username)
		if(this.state.product === null || this.state.images == null) {
			return (
				<div>
				</div>
			);
		}
        return ( 
			<div style={{ marginBottom: "70px" }}>
				<Grid>
					<div className="container" style={{ paddingLeft:"0px", paddingRight:"0px"}}>
						<Col xs={12} md={7} style={{ paddingLeft:"0px", paddingRight:"0px", marginTop:"85px", textAlign:"center"}}>
							<div style={{ marginBottom:"35px", maxHeight:"350px", maxWidth:"680px" }} >
								<Magnifier src={this.state.images} zoomFactor={1} mgWidth={210} mgHeight={210} mgShape="square"/><br/>
							</div>

							<div style={{ marginBottom:"30px" }}>
							<Row>
								<Col xs={4} md={4}>
									<Image src={require('../images/' + this.state.product[0].Image1)} onClick={this.changeImage1} thumbnail/>
								</Col>
								<Col xs={4} md={4}>
									<Image src={require('../images/' + this.state.product[0].Image2)} onClick={this.changeImage2} thumbnail />
								</Col>
								<Col xs={4} md={4}>
									<Image src={require('../images/' + this.state.product[0].Image3)} onClick={this.changeImage3} thumbnail />
								</Col>
							</Row>
							</div>
							
						</Col>

						<Col xs={12} md={5}>
							<span id="product-detail-header">
								<h4 style={{ marginBottom:"0px"}}>{this.state.product[0].Category}</h4>
								<br/>
								<h1 style={{ marginTop:"0px"}}>{this.state.product[0].ProductName}</h1>
								<br/>
								<p style={{ textAlign: "justify"}}>{this.state.product[0].Description}</p>
								<br/>
								<h4 style={{ marginTop:"0px"}}>Features :</h4>
								<ul style={{ paddingLeft:"15px", marginBottom:"30px", fontWeight:"bold"}}>
									<li>{this.state.product[0].Features1}</li>
									<li>{this.state.product[0].Features2}</li>
									<li>{this.state.product[0].Features3}</li>
									<li>{this.state.product[0].Features4}</li>
								</ul>
								{this.renderNormalPrice()}
								<br/>
								<h2 className="sale-price" style={{marginTop:"0px"}}>Rp. {(parseInt(this.state.product[0].SalePrice)).toLocaleString('id')},-</h2>
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
			</div>
        );
    }
}

const mapStateToProps = (state) => {
    const auth = state.auth;

    return { auth };
}
 
export default connect(mapStateToProps)(withAlert(ProductDetails));