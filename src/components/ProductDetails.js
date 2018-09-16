import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/rsz_2nintendo.jpg';
import '../supports/css/components/ProductDetails.css';
import Footer from './Footer';

class ProductDetails extends Component {
	
    render() { 
        return ( 
		<div>
			<Grid>
				<div className="container" style={{ paddingLeft:"0px", paddingRight:"0px"}}>
					<Col xs={12} md={7} style={{ paddingLeft:"0px", paddingRight:"0px"}}>
						<img src={image1} className="main-image"/>
						<Grid>
							<Row>
								<Col xs={4} md={2}>
									<Thumbnail href="#" alt="171x180" src={image1} className="sub-image"/>
								</Col>
								<Col xs={4} md={2}>
									<Thumbnail href="#" alt="171x180" src={image2} className="sub-image"/>
								</Col>
								<Col xs={4} md={2}>
									<Thumbnail href="#" alt="171x180" src={image3} className="sub-image"/>
								</Col>
							</Row>
						</Grid>
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
											<button className="btn btn-default btn-info" data-dir="dwn"><span className="glyphicon glyphicon-minus"></span></button>
										</span>
										<input type="text" className="form-control text-center" value="1" min="1" max="99"/>
										<span className="input-group-btn data-up">
											<button className="btn btn-default btn-info" data-dir="up"><span className="glyphicon glyphicon-plus"></span></button>
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