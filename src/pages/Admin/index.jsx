import React, {Component} from 'react';
import LoginAuth from "../../annotation/Auth/LoginAuth";
import {categoryListApi} from "../../api/category";

@LoginAuth
class Admin extends Component {

    componentDidMount() {
        categoryListApi().then(res => {
            console.log(res);
        })
    }

    render() {
        return (
            <div>admin</div>
        );
    }
}

export default Admin;
