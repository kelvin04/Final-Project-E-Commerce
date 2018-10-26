import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/nintendo.jpg';
import logo2 from '../images/chromebook-logo.png';

const cookies = new Cookies;

class CarouselBro extends Component {
    selectedProduct = (id) => {
        cookies.set('SelectedProduct', id, { path: '/' })
        console.log(id)
    }

    render() {
        return(
            <div>
                <Carousel className="container banner" indicators={true} interval={null}>
                    <Carousel.Item className="gambar-carousel" >
                        <Link to="/productdetails" onClick={() => this.selectedProduct(1)}>
                            <img height ="10000px" src={image1} />
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item className="gambar-carousel">
                        <Link to="/productdetails" onClick={() => this.selectedProduct(32)}>
                            <img height ="10000px" src={image2} />
                            <img src={logo2} id="z-index-1" />
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item className="gambar-carousel">
                        <Link to="/productdetails" onClick={() => this.selectedProduct(35)}>
                            <img height ="10000px" src={image3} />
                        </Link>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default CarouselBro;