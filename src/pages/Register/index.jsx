import React, {Component} from 'react';
import LoginAuth from "../../annotation/Auth/LoginAuth";
import {connect as ConnectRedux} from "react-redux";
import {USER_INFO_STORE_NAME} from "../../store/constant";
import MyDiv from "./children/MyDiv";

const mapStateToProps = (state) => ({userInfo: state[USER_INFO_STORE_NAME]});
const mapDispatchToProps = {}



@LoginAuth
@ConnectRedux(mapStateToProps, mapDispatchToProps)
class Register extends Component {

    render() {
        return (
            <div>
                <h3>register</h3>
                <MyDiv />
            </div>
        );
    }
}

export default Register;
