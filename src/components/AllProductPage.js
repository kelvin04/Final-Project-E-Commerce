import React, { Component } from 'react';
import ProductList from './ProductList';
import CategoryTab from './CategoryTab';
import NavCategoryList from './NavCategoryList';
import NewFooterNav from './NewFooterNav';
import Sidebar from "./sidebar";

class AllProductPage extends Component {
    render(){
        return(
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                {/* <div id="product-list-category">
                    <div id="category-tab-column">
                        <CategoryTab />
                    </div>
                    <div id="product-list-column">
                        <ProductList />
                    </div>
                </div> */}

                <NavCategoryList />
                <br/>
                <Sidebar />
                <ProductList />
                <br/>
                <NewFooterNav />

                <br />

                
            </div>
        );
    }
}

export default AllProductPage;