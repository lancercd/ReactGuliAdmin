import React, {Component} from 'react';
import LoginAuth from "../../annotation/Auth/LoginAuth";


@LoginAuth
class Product extends Component {
    render() {
        return (
            <div>Product</div>
        );
    }
}

export default Product;
