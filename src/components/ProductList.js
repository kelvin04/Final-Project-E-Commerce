import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import image1 from '../images/iphone-x.png';
import image2 from '../images/chromebook.jpg';
import image3 from '../images/rsz_2nintendo.jpg';

class ProductList extends Component {
    render() {
        return(
            <Grid>
              <Row>
                <Col xs={12} md={3}>
                  <Thumbnail src={image1} alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p style={{ textAlign:"center" }}>
                      <Button bsStyle="success">Add To Cart</Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/productdetails"><Button bsStyle="default">Details</Button></Link>
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={12} md={3}>
                  <Thumbnail src={image2} alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>
                      &nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={12} md={3}>
                  <Thumbnail src={image3} alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>
                      &nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={12} md={3}>
                  <Thumbnail src={image3} alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>
                      &nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </Col>
                <Col xs={12} md={3}>
                  <Thumbnail src={image3} alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>
                      &nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </Col><Col xs={12} md={3}>
                  <Thumbnail src={image3} alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>
                      &nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </Col><Col xs={12} md={3}>
                  <Thumbnail src={image3} alt="242x200">
                    <h3>Thumbnail label</h3>
                    <p>Description</p>
                    <p>
                      <Button bsStyle="primary">Button</Button>
                      &nbsp;
                      <Button bsStyle="default">Button</Button>
                    </p>
                  </Thumbnail>
                </Col>
              </Row>
            </Grid>
          );
      }
  }

export default ProductList;