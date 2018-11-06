import React, { Component } from 'react';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import Header from './Header';
import CarouselBro from './Carousel';
import Karakteristik from './Karakteristik';
import Footer from './Footer';
import BrandCarousel from './BrandCarousel';
import SectionCategories from './SectionCategories';

class HomePage extends Component {
    render() {
        return(
            <div style={{ marginBottom: "50px" }}>
                <Header />
                <CarouselBro />
                <br/>
                <ScrollUpButton ContainerClassName="ScrollUpButton__Container" ShowAtPosition={300} style={{ border: "5px solid red" }}/>
                <div id="karakteristik">
                    {/* <hr/> */}
                    <Karakteristik />
                    {/* <hr/> */}
                </div>
                <br/>
                <br/>
                <BrandCarousel />
                <br/>
                <SectionCategories />
            </div>
        );
    }
}

export default HomePage;