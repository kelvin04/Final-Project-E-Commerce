import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/nintendo.jpg';


class CarouselBro extends Component {
    render() {
        return(
            <div>
                <Carousel className="container banner" >
                    <Carousel.Item className="gambar-carousel">
                        <img height ="10000px" src={image1} />
                        {/* <Carousel.Caption>
                            <h3>iPhone X</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption> */}
                    </Carousel.Item>
                    <Carousel.Item className="gambar-carousel">
                        <img src={image2} />
                        <Carousel.Caption>
                            <h3>All New Chrome Book</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="gambar-carousel">
                        <img src={image3} />
                        <Carousel.Caption id="black-font">
                        <h2>Nintendo Switch</h2>
                        <p>Freedom to have fun. Wherever. Whenever.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default CarouselBro;