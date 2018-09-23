import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Image } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import Magnifier from 'react-magnifier';
import CarouselProduct from './CarouselProduct';
import Footer from './Footer';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../supports/css/components/ProductDetails.css';
import image1 from '../images/iphone-x.png';
import image2 from '../images/iphone-x-front.jpg';
import image3 from '../images/iphone-x-side.jpg';


class ProductDetails extends Component {	
	state = { quantity: 1, images: image1 }

	changeImage1 = () => {
		var imageA = image1;
		this.setState({ images: imageA })
	}

	changeImage2 = () => {
		var imageB = image2;
		this.setState({ images: imageB })
	}

	changeImage3 = () => {
		var imageC = image3;
		this.setState({ images: imageC })
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

    render() {
		var imageA = image1;
		var imageB = image2;
		var imageC = image3;
        return ( 
		<div>
			<Grid>
				<div className="container" style={{ paddingLeft:"0px", paddingRight:"0px"}}>
					<Col xs={12} md={7} style={{ paddingLeft:"0px", paddingRight:"0px", marginTop:"80px", textAlign:"center"}}>
						<div style={{ marginBottom:"30px", maxHeight:"350px" }}>
							<Magnifier src={this.state.images} zoomFactor={1.2}/><br/>
						</div>
						
						<Row>
							<Col xs={4} md={4}>
								<Image src={imageA} onClick={this.changeImage1} thumbnail/>
							</Col>
							<Col xs={4} md={4}>
								<Thumbnail src={imageB} onClick={this.changeImage2} />
							</Col>
							<Col xs={4} md={4}>
								<Thumbnail src={imageC} onClick={this.changeImage3} />
							</Col>
						</Row>
						
					</Col>

					<Col xs={12} md={5}>
						<span id="product-detail-header">
							<h4 style={{ marginBottom:"0px"}}>Smartphone</h4>
							<br/>
							<h1 style={{ marginTop:"0px"}}>iPhone X 64GB</h1>
							<br/>
							<p style={{ textAlign: "justify"}}>The iPhone X is Apple's new flagship 10th anniversary iPhone featuring a 5.8-inch OLED display, facial recognition and 3D camera functionality, a glass body, and an A11 Bionic processor.<br/><br/>Launched November 3, 2017.</p>
							<br/>

							<h4 style={{ marginTop:"0px"}}>Features :</h4>
							<ul style={{ paddingLeft:"15px", marginBottom:"30px"}}>
								<li>5.8" OLED display</li>
								<li>Faster A11 Bionic processor</li>
								<li>Edge-to-edge display</li>
								<li>Facial Recognition</li>
							</ul>
							
							<h2>Rp 14,500.000</h2>
							<br/><br/>
							<Row>
								<Col xs={12} sm={4} md={5} >
									<div className="input-group number-spinner" id="item-cart-increment">
										<span className="input-group-btn data-dwn">
											<button className="btn btn-default btn-info" data-dir="dwn" onClick={this.decrement}><span className="glyphicon glyphicon-minus"></span></button>
										</span>
										<input type="text" className="form-control text-center" value={this.state.quantity} min="1" max="99" style={{minWidth:"80px"}}/>
										<span className="input-group-btn data-up">
											<button className="btn btn-default btn-info" data-dir="up" onClick={this.increment}><span className="glyphicon glyphicon-plus"></span></button>
										</span>
									</div>
								</Col>

								<Col xs={12} sm={8} md={7}>
								<p style={{ textAlign:"center" }}>
									<input type="button" className="btn btn-success" id="addcart-button" value="Add to Cart" onClick={this.onBtnAddClick} />
								</p>
								</Col>
							</Row>
						</span>
					</Col>
				</div>
			</Grid>
			
			<Footer />
		</div>

        );
    }
}
 
export default ProductDetails;