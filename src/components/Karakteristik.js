import React, { Component } from 'react';
import image1 from '../images/char_1.png'
import image2 from '../images/char_2.png'
import image3 from '../images/char_3.png'
import image4 from '../images/char_4.png'

class Karakteristik extends Component {
    render() {
        return(
            <div>
                <div className="characteristics">
                    <div className="container">
                        <div className="row" >

                            <div className="col-lg-3 col-md-6 char_col">
                                <div className="char_item d-flex flex-row align-items-center justify-content-start" style={{backgroundColor: "white"}}>
                                    <div className="char_icon"><img src={image1} alt="" /></div>
                                    <div className="char_content">
                                        <div className="char_title">Free Delivery</div>
                                        <div className="char_subtitle">Min. Purchase<br/>IDR 150.000</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 char_col">
                                <div className="char_item d-flex flex-row align-items-center justify-content-start" style={{backgroundColor: "white"}}>
                                    <div className="char_icon"><img src={image2} alt="" /></div>
                                    <div className="char_content">
                                        <div className="char_title">Official Warranty</div>
                                        <div className="char_subtitle">Terms and Conditions<br/>Apply</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 char_col">
                                <div className="char_item d-flex flex-row align-items-center justify-content-start" style={{backgroundColor: "white"}}>
                                    <div className="char_icon"><img src={image3} alt="" /></div>
                                    <div className="char_content">
                                        <div className="char_title">Best Price</div>
                                        <div className="char_subtitle">Best Value for Money</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 char_col">
                                <div className="char_item d-flex flex-row align-items-center justify-content-start" style={{backgroundColor: "white"}}>
                                    <div className="char_icon"><img src={image4} alt="" /></div>
                                    <div className="char_content">
                                        <div className="char_title">Discount up to 25%</div>
                                        <div className="char_subtitle">Specific Products Only</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Karakteristik;