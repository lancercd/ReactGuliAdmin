import React, {Component} from 'react';
import LoginAuth from "../../annotation/Auth/LoginAuth";


@LoginAuth
class Home extends Component {

    render() {
        console.log("home render");
        return (
            <div>Home</div>
        );
    }
}

export default Home;
