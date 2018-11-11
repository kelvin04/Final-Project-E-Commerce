import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/nintendo.jpg';
import logo2 from '../images/chromebook-logo.png';

class CarouselBro extends Component {
    render() {
        return(
            <div>
                <Carousel className="container banner" indicators={true} interval={null}>
                    <Carousel.Item className="gambar-carousel" >
                        <Link to={`/productdetails?idProduct=${1}`}>
                            <img height ="10000px" alt=""src={image1} />
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item className="gambar-carousel">
                        <Link to={`/productdetails?idProduct=${32}`}>
                            <img height ="10000px" alt="" src={image2} />
                            <img src={logo2} alt="" id="z-index-1" />
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item className="gambar-carousel">
                        <Link to={`/productdetails?idProduct=${35}`}>
                            <img height ="10000px" alt="" src={image3} />
                        </Link>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default CarouselBro;