import React, { Component } from 'react';
import Footer from './Footer';
import Page from "./Page";
import SideTab from "./SideTab";

class AllProductPage extends Component {
    render(){
        return(
            <div id="product-page-container">
                <span id="display-inline"><SideTab /></span>
                <br/>

                {/* <div class="text-center">
                    <ul class="pagination">
                        <li><a href="?p=0" data-original-title="" title="">1</a></li> 
                        <li><a href="?p=1" data-original-title="" title="">2</a></li> 
                    </ul>
                </div> */}

                {/* <div class="text-center">
                    <Page />
                </div> */}
            
                <Footer />
            </div>
        );
    }
}

export default AllProductPage;