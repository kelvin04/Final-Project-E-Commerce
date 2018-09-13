import React, { Component } from 'react';
import image1 from '../images/brands_1.jpg';
import '../supports/css/components/brands.css';

class BrandCarousel extends Component {
    render() {
        return(
            <div>
                <div className="brands">
		<div className="container">
			<div className="row">
				<div className="col">
					<div className="brands_slider_container">
						

						<div className="owl-carousel owl-theme brands_slider">
							
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src={image1} alt=""/></div></div>
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src={image1} alt=""/></div></div>
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src="images/brands_3.jpg" alt=""/></div></div>
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src="images/brands_4.jpg" alt=""/></div></div>
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src="images/brands_5.jpg" alt=""/></div></div>
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src="images/brands_6.jpg" alt=""/></div></div>
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src="images/brands_7.jpg" alt=""/></div></div>
							<div className="owl-item"><div className="brands_item d-flex flex-column justify-content-center"><img src="images/brands_8.jpg" alt=""/></div></div>

						</div>
						
						<div className="brands_nav brands_prev"><i className="fas fa-chevron-left"></i></div>
						<div className="brands_nav brands_next"><i className="fas fa-chevron-right"></i></div>

					</div>
				</div>
			</div>
		</div>
	</div>
            </div>
        );
    }
}

export default BrandCarousel;