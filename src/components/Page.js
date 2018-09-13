import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

class Page extends Component {
    render() {
        let active = 7;
        let items = [];
        for (let number = 1; number <= 10; number++) {
          items.push(
            <Pagination.Item active={number === active}>{number}</Pagination.Item>
          );
        }
        return ( 
            <Pagination bsSize="medium" >{items}</Pagination>
        );
    }
}
 
export default Page;