import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Image } from 'react-bootstrap';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/rsz_2nintendo.jpg';
import '../supports/css/components/ProductDetails.css';

class ProductDetails extends Component {
    render() { 
        return ( 
//             <div className="single_product">
// 		<div className="container">
// 			<div className="row">

	
// 				<div className="col-lg-2 order-lg-1 order-2">
// 					<ul className="image_list">
// 						<li data-image="images/single_4.jpg"><img src={image1} alt="" /></li>
// 						<li data-image="images/single_2.jpg"><img src={image2} alt="" /></li>
// 						<li data-image="images/single_3.jpg"><img src={image1} alt="" /></li>
// 					</ul>
// 				</div>


// 				<div className="col-lg-5 order-lg-2 order-1">
// 					<div className="image_selected"><img src={image1} alt="" /></div>
// 				</div>

	
// 				<div className="col-lg-5 order-3">
// 					<div className="product_description">
// 						<div className="product_category">Smartphone</div>
// 						<div className="product_name">iPhone X</div>
// 						<div className="rating_r rating_r_4 product_rating"><i></i><i></i><i></i><i></i><i></i></div>
// 						<div className="product_text"><p>5.8-inch Super Retina HD display with HDR and True Tone<br/>
// 12MP dual cameras with dual optical image stabilization<br/>
// Powered by A11 Bionic, the most powerful and smartest chip ever in a smartphone</p></div>
// 						<div className="order_info d-flex flex-row">
// 							<form action="#">
// 								{/* <div className="clearfix" style="z-index: 1000;"> */}
//                                 <div className="clearfix" >
								
// 									<div className="product_quantity clearfix">
// 										<span>Quantity: </span>
// 										<input id="quantity_input" type="text" pattern="[0-9]*" value="1" />
// 										<div className="quantity_buttons">
// 											<div id="quantity_inc_button" className="quantity_inc quantity_control"><i className="fas fa-chevron-up"></i></div>
// 											<div id="quantity_dec_button" className="quantity_dec quantity_control"><i className="fas fa-chevron-down"></i></div>
// 										</div>
// 									</div>

									
// 									<ul className="product_color">
// 										<li>
// 											<span>Color: </span>
// 											<div className="color_mark_container"><div id="selected_color" className="color_mark"></div></div>
// 											<div className="color_dropdown_button"><i className="fas fa-chevron-down"></i></div>

// 											<ul className="color_list">
//                                                 <li><div className="color_mark" style={{  background: "#999999"}}></div></li>
//                                                 <li><div className="color_mark" style={{  background: "#b19c83"}}></div></li>
// 												{/* <li><div className="color_mark" style="background: #b19c83;"></div></li>
// 												<li><div className="color_mark" style="background: #000000;"></div></li> */}
// 											</ul>
// 										</li>
// 									</ul>

// 								</div>

// 								<div className="product_price">$2000</div>
// 								<div className="button_container">
// 									<button type="button" className="button cart_button">Add to Cart</button>
// 									<div className="product_fav"><i className="fas fa-heart"></i></div>
// 								</div>
								
// 							</form>
// 						</div>
// 					</div>
// 				</div>

// 			</div>
// 		</div>
// 	</div>

		// <div className="grid-container">
		// 	<div className="product-name">1</div>
		// 	<div className="product_detail">2</div>
		// 	<div className="sub-image">3</div>  
		// 	<div className="sub-image">4</div>
		// 	<div className="sub-image">5</div>
		// 	<div className="item6">6</div>
		// 	<div className="main-image">8</div>  
		// </div>


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
						<span style={{ display:"inline-block", marginTop:"80px"}}>
							<h4 style={{ marginBottom:"0px"}}>Smartphone</h4>
							<br/>
							<h1 style={{ marginTop:"0px"}}>iPhone X</h1>
							<br/>
							<p style={{ textAlign: "justify"}}>The iPhone X is Apple's new flagship 10th anniversary iPhone featuring a 5.8-inch OLED display, facial recognition and 3D camera functionality, a glass body, and an A11 Bionic processor.<br/><br/>Launched November 3, 2017.</p>
							<br/>
							<h4>Features :</h4>
							<ul style={{ paddingLeft:"15px"}}>
								<li>5.8" OLED display</li>
								<li>Faster A11 Bionic processor</li>
								<li>Edge-to-edge display</li>
								<li>Facial Recognition</li>
							</ul>
						</span>
					</Col>
				</div>
			</Grid>
			



		</div>

        );
    }
}
 
export default ProductDetails;