import React, { Component } from 'react';
import Header from './Header';
import CarouselBro from './Carousel';
import Karakteristik from './Karakteristik';
import ProductList from './ProductList';
import FooterNav from './FooterNav';
import Brands from './Brands';

class HomePage extends Component {
    render() {
        return(
            <div>
                <Header />
                <CarouselBro />
                <br/>
                <Karakteristik />
                <br/>
                <ProductList />
                <br/>
                <Brands />
                <br/>
                <FooterNav />
            </div>
        );
    }
}

export default HomePage;