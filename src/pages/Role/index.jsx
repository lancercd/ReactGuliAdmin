import React, {Component} from 'react';
import LoginAuth from "../../annotation/Auth/LoginAuth";


@LoginAuth
class Role extends Component {
    render() {
        return (
            <div>Role</div>
        );
    }
}

export default Role;
