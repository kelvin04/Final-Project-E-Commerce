import React, { Component } from 'react';
import '../supports/css/components/section-categories.css';
import image1 from '../images/product01.png';
import image2 from '../images/product08.png';
import image3 from '../images/product03.png';

class SectionCategories extends Component {
    render() { 
        return ( 
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-xs-6">
                            <div className="shop">
                                <div className="shop-img" style={{ textAlign:"center" }}>
                                    <img src={image1} style={{ width:"250px" }}/>
                                </div>
                                <div className="shop-body">
                                    <h3>Smartphone<br/>Collection</h3>
                                    <a href="/smartphonepage" className="cta-btn" style={{ textDecoration:"none" }}>Shop now <i className="fa fa-arrow-circle-right" ></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4 col-xs-6">
                            <div className="shop">
                            <div className="shop-img" style={{ textAlign:"center" }}>
                                    <img src={image2} style={{ width:"250px" }}/>
                                </div>
                                <div className="shop-body">
                                    <h3>Laptop<br/>Collection</h3>
                                    <a href="#" className="cta-btn" style={{ textDecoration:"none" }}>Shop now <i className="fa fa-arrow-circle-right" ></i></a>
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-md-4 col-xs-6">
                            <div className="shop">
                            <div className="shop-img" style={{ textAlign:"center" }}>
                                    <img src={image3} style={{ width:"250px" }}/>
                                </div>
                                <div className="shop-body">
                                    <h3>Game Console<br/>Collection</h3>
                                    <a href="#" className="cta-btn" style={{ textDecoration:"none" }}>Shop now <i className="fa fa-arrow-circle-right" ></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SectionCategories;