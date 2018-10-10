import React, { Component } from 'react';
import Footer from './Footer';
import { connect } from 'react-redux';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { productSearch } from '../actions';

class SearchPage extends Component {
    state = { }

    renderSearchResult = () => {
        const list = this.props.searchResult.searchResult.map((item) => {
            return(
                <Col xs={12} md={4} lg={3}>
                  <Thumbnail src={require('../images/' + item.Image1)} alt="242x200" style={{ textAlign:"center" }}>
                    <h4 style={{ fontWeight:"bold" }}>{item.ProductName}</h4>
                    <h5 className="normal-price">Rp. {(parseInt(item.NormalPrice)).toLocaleString('id')},-</h5>
                    <h4 className="sale-price">Rp. {(parseInt(item.SalePrice)).toLocaleString('id')},-</h4>
                    <h4 style={{ textAlign:"center" }}>
                      <Button bsStyle="success">Add To Cart</Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button href="/productdetails" bsStyle="default" onClick={() => this.selectedProduct(item.idProduct)} >Details</Button>
                    </h4>
                  </Thumbnail>
                </Col>
            );
        })
        return list;
    }

    render() {
        console.log(this.props.searchResult.searchResult) 
        return (
            <div id="product-page-container">
                <Grid>
                    <Row>
                        {this.renderSearchResult()}
                    </Row>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const searchResult = state.searchResult

    return { searchResult };
}
 
export default connect(mapStateToProps, { productSearch })(SearchPage);