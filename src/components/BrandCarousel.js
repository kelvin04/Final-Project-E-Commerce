import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { API_URL_1 } from '../supports/api-url/apiurl';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../supports/css/components/brands.css';

const cookies = new Cookies;

class BrandCarousel extends Component {
	state = { products: [], selectedItem: 0 }

	componentWillMount() {
		this.getProductList();
	}
	
	getProductList = () => {
		axios.get(API_URL_1 + '/hotlist')
		.then((res) => {
		console.log(res);
		this.setState({ products: res.data, selectedItem: 0 })
		console.log(this.state.products);
		})
	}

	selectedProduct = (id) => {
		cookies.set('SelectedProduct', id, { path: '/' })
		console.log(id)
	}

  	renderOwlCarousel = () => {
		const list = this.state.products.map((item, index) => {
			return (
				<div key={index}>
					<img src={require('../images/' + item.Image1)} alt="" id="image-brand-carousel"/>
					<p style={{ fontWeight:"bold", marginTop:"20px" }}>{item.ProductName}</p>
					<p style={{ color:"blue", fontWeight:"bold"}}>New Product</p>
					<p className="sale-price">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</p>
					<Link to={`/productdetails?idProduct=${item.idProduct}`}>
						<input type="button" className="btn btn-success" value="Details" onClick={() => this.selectedProduct(item.idProduct)} style={{ outline: "none" }} />
					</Link>
				</div>
			);
		})
		return list;
	}

    render() {
        return(
			<div style={{ textAlign: "center" }}>
				<h2 style={{ fontWeight:"bold" }}>Hot List</h2>
				<br/>
				<Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} centerMode centerSlidePercentage={33.33} style={{styles}} showStatus={false} showIndicators={false} width={"100%"} centerMode={true} useKeyboardArrows={true} swipeable={false} >
					{this.renderOwlCarousel()}	
				</Carousel>
			</div>
        );
    }
}

export default BrandCarousel;