import React, {Component} from 'react';

import Css from "./index.module.css";
import LoginForm from "./LoginForm";

class Login extends Component {

    render() {
        return (
            <div className={Css.loginFormBox}>
                <div className={Css.title}>登录</div>
                <LoginForm history={this.props.history} test-data={"lancercd"} />
            </div>
        );
    }
}

export default Login;
