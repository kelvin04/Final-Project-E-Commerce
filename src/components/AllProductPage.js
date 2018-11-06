import React, { Component } from 'react';
import queryString from 'query-string'
import SideTab from "./SideTab";

class AllProductPage extends Component {
    render(){
        const params = queryString.parse(this.props.location.search).searchResults;
        return(
            <div id="product-page-container">
                <span id="display-inline">
                    <SideTab params={params}/>
                </span>
                <br/>
            </div>
        );
    }
}

export default AllProductPage;