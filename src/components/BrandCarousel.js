import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import brands1 from '../images/brands_1.jpg';
import brands2 from '../images/brands_2.jpg';
import brands3 from '../images/brands_3.jpg';
import brands4 from '../images/brands_4.jpg';
import brands5 from '../images/brands_5.jpg';
import brands6 from '../images/brands_6.jpg';
import brands7 from '../images/brands_7.jpg';
import brands8 from '../images/brands_8.jpg';
import '../supports/css/components/brands.css';

class BrandCarousel extends Component {
    render() {
        return(
			<div id="carousel-responsive-brand">
				<Carousel showThumbs={false}  centerMode centerSlidePercentage={20} emulateTouch style={{styles}}>
					<div style={{ }}>
						<img src={brands1} />
					</div>
				
					<div>
						<img src={brands2}/>
					</div>
					<div>
						<img src={brands3}/>
					</div>
					<div>
						<img src={brands4}/>
					</div>
					<div>
						<img src={brands5}/>
					</div>
					<div>
						<img src={brands6}/>
					</div>
					<div>
						<img src={brands7}/>
					</div>
					<div>
						<img src={brands8}/>
					</div>	
				</Carousel>
			</div>
        );
    }
}

export default BrandCarousel;