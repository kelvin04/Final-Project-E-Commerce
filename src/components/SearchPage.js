// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import queryString from 'query-string'
// import { Link } from 'react-router-dom';
// // import Cookies from 'universal-cookie';
// import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { API_URL_1 } from '../supports/api-url/apiurl';
// import { productSearch } from '../actions';
// import notFound from '../images/product_not_found.png';

// // const cookies = new Cookies;

// class SearchPage extends Component {
    
//     // selectedProduct = (id) => {
//     //     cookies.set('SelectedProduct', id, { path: '/' })
//     //     console.log(id)
//     // }

//     // =============================== Search with Redux ================================================
//     // renderSearchResult = () => {
//     //     if(this.props.searchResult.searchResult.length == 0) {
//     //         return(
//     //             <div style={{ marginTop:"10px", textAlign:"center" }}>
//     //                 <img src={notFound} style={{ width:"100%", maxWidth:"600px", height:"auto" }}/>
//     //                 <h1 style={{ fontSize:"3.5vw" }}>Sorry, Product Not Found</h1>
//     //             </div>
//     //         );
//     //     }
//     //     return this.props.searchResult.searchResult.map((item) => {    
//     //         return(
//     //             <Col xs={12} md={4} lg={3}>
//     //               <Thumbnail src={require('../images/' + item.Image1)} alt="242x200" style={{ textAlign:"center" }}>
//     //                 <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
//     //                 <h5 className="normal-price">Rp. {(parseInt(item.NormalPrice)).toLocaleString('id')},-</h5>
//     //                 <h4 className="sale-price">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
//     //                 <h4 style={{ textAlign:"center" }}>
//     //                 <Link to={`/productdetails?idProduct=${item.idProduct}`}>
//     //                     <Button bsStyle="success" onClick={() => this.selectedProduct(item.idProduct)} style={{ outline: 'none' }}>Details</Button>
//     //                 </Link>
//     //                 </h4>
//     //               </Thumbnail>
//     //             </Col>
//     //         );
//     //     })
//     // }
    

//     // ======================================= Search With Query String ===================================================
//     state = { products: [] }
   
//     componentWillMount () {
//         this.getSearchResults();
//     }

//     getSearchResults = () => {
//         let params = queryString.parse(this.props.location.search).searchResults
//         console.log(params)
//         axios.get(API_URL_1 + '/searchresults/' + params)
//         .then((res) => {
//             this.setState({ products: res.data })
//             console.log(this.state.products.length)
//         })
//     }

//     renderSearchResult = () => {
//         if(this.state.products.length == 0) {
//             return(
//                 <div style={{ marginTop:"10px", textAlign:"center" }}>
//                     <img src={notFound} style={{ width:"100%", maxWidth:"600px", height:"auto" }}/>
//                     <h1 style={{ fontSize:"3.5vw" }}>Sorry, Product Not Found</h1>
//                 </div>
//             );
//         }
//         return this.state.products.map((item, index) => {    
//             return(
//                 <Col xs={12} md={4} lg={3} key={index}>
//                     <Thumbnail src={require('../images/' + item.Image1)} alt="242x200" style={{ textAlign:"center" }}>
//                     <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
//                     <h5 className="normal-price">Rp. {(parseInt(item.NormalPrice)).toLocaleString('id')},-</h5>
//                     <h4 className="sale-price">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
//                     <h4 style={{ textAlign:"center" }}>
//                     <Link to={`/productdetails?idProduct=${item.idProduct}`}>
//                         <Button bsStyle="success" style={{ outline: 'none' }}>Details</Button>
//                     </Link>
//                     </h4>
//                     </Thumbnail>
//                 </Col>
//             );
//         })
//     }

//     render() {
//         console.log(queryString.parse(this.props.location.search).searchResults)
//         return (
//             <div id="product-page-container">
//                 <Grid>
//                     <Row>
//                         {this.renderSearchResult()}
//                     </Row>
//                 </Grid>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     const searchResult = state.searchResult

//     return { searchResult };
// }
 
// export default connect(mapStateToProps, { productSearch })(SearchPage);