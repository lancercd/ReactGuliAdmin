import React, {Component} from 'react';
import {connect as ConnectRedux} from "react-redux";

import Css from "./index.module.css";
import LoginForm from "./LoginForm";
import {USER_INFO_STORE_NAME} from "../../store/constant";
import {Redirect} from "react-router-dom";


const mapStateToProps = (state) => ({isLogin: state[USER_INFO_STORE_NAME].isLogin});
const mapDispatchToProps = {}


@ConnectRedux(mapStateToProps, mapDispatchToProps)
class Login extends Component {

    render() {
        const isLogin = this.props.isLogin;

        // 已经登录
        if(isLogin === true) {
            return (<Redirect to="/" />);
        }

        // 未登录
        return (
            <div className={Css.loginFormBox}>
                <div className={Css.title}>登录</div>
                <LoginForm history={this.props.history} test-data={"lancercd"} />
            </div>
        );
    }
}

export default Login;
