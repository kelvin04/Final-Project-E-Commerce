import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

class SortFilterAll extends Component {
    state = { products: [], selectedValue: 0 }

    // componentWillMount() {
    //     this.getBrandsList();
    // }

    // getBrandsList = () => {
    //     axios.get('http://localhost:1989/brands')
    //     .then((res) => {
    //         this.setState({ products: res.data })
    //         console.log(this.state.products)
    //     })
    // }

    render() { 
        const Brand = [
            { label: "Apple", value: 1 },
            { label: "OPPO", value: 2 },
            { label: "Samsung", value: 3 },
            { label: "Xiaomi", value: 4 },
        ];

        const Sort = [
            { label: "Name", value: 1 },
            { label: "Price", value: 2 },
        ];

        const SortBy = [
            { label: "Ascending", value: 1 },
            { label: "Descending", value: 2 },
        ]; 

        return (
            <div style={{ marginBottom:"35px" }}>
                <Grid>
                    <Row>
                        <Col xs={12} md={4}>
                            <div style={{fontWeight:"bold"}}>
                            Filter by Brand :
                            </div>
                            <Select options={Brand} onChange={opt => console.log(opt.label, opt.value)}/>
                        </Col>

                        <Col xs={6} md={4}>
                            <div style={{fontWeight:"bold"}}>
                            Sort by :
                            </div>
                            <Select options={Sort} onChange={opt => console.log(opt.label, opt.value)}/>
                        </Col>

                        <Col xs={6} md={4}>
                            <div style={{fontWeight:"bold"}}>
                            Ascending / Descending
                            </div>
                            <Select options={SortBy} onChange={opt => console.log(opt.label, opt.value)}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
 
export default SortFilterAll;