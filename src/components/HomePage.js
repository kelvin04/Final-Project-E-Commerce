import React, { Component } from 'react';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Header from './Header';
import CarouselBro from './Carousel';
import Karakteristik from './Karakteristik';
import ProductList from './ProductList';
import Footer from './Footer';
import BrandCarousel from './BrandCarousel';

class HomePage extends Component {
    render() {
        return(
            <div>
                <Header />
                <CarouselBro />
                <br/>
                <ScrollUpButton ContainerClassName="ScrollUpButton__Container" ShowAtPosition={300} style={{ border: "5px solid red" }}/>
                <div id="karakteristik">
                    {/* <hr/> */}
                    <Karakteristik />
                    {/* <hr/> */}
                </div>
                
                <br/><br/>
                <ProductList />
                <br/>
                <BrandCarousel />
                <br/>
                <Footer />
            </div>
        );
    }
}

export default HomePage;