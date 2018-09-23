import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../images/iphone-x.png';
import image2 from '../images/iphone-x-front.jpg';
import image3 from '../images/iphone-x-side.jpg';

class CarouselProduct extends Component {
    state = {  }
    render() { 
        return ( 
            <Carousel showArrows={false} showIndicators={false} showStatus={false} transitionTime={0} style={{styles}} >
                <div>
                    <img src={image1}/>
                </div>
                <div>
                    <img src={image2}/>
                </div>
                <div>
                    <img src={image3}/>
                </div>
            </Carousel>
        );
    }
}
 
export default CarouselProduct;
