import React, {Component} from 'react';
import LoginAuth from "../../annotation/Auth/LoginAuth";


@LoginAuth
class User extends Component {
    render() {
        return (
            <div>User</div>
        );
    }
}

export default User;
