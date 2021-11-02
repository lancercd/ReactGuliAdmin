import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {usernameRules, passwordRules} from "../../../rules/user";
import {loginApi} from "../../../api/auth";
import {connect as ConnectRedux} from "react-redux";
import {add_user_action} from "../../../store/actions/userInfo";


const Item = Form.Item;

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
    loginAction: add_user_action
}


@ConnectRedux(mapStateToProps, mapDispatchToProps)
class LoginForm extends Component {

    /**
     * on form submit
     * @param values form data
     */
    onFinish(values) {
        loginApi(values).then(res => {
            const {data} = res;

            // 存入redux 仓库中
            this.props.loginAction({
                user: data.user,
                token: data.token,
                isLogin: true
            });

            message.success("登录成功");
            this.props.history.replace("/home");
        }).catch(e => {
            console.log("catch", e);
            message.error(e.status);
        })
    };

    onValuesChange(changedValues, allValues) {
    }

    onFinishFailed({ values, errorFields, outOfDate }) {
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                scrollToFirstError={true}
                onFinish={this.onFinish.bind(this)}
                onFinishFailed={this.onFinishFailed.bind(this)}
                onValuesChange={this.onValuesChange.bind(this)}
            >
                <Item
                    name="username"
                    hasFeedback
                    rules={usernameRules}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Item>
                <Item
                    name="password"
                    hasFeedback
                    rules={passwordRules}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Item>
                <Item>
                    <Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Item>

                    <span className="login-form-forgot">
                        Forgot password
                    </span>
                </Item>

                <Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Item>
            </Form>
        );
    }
}


export default LoginForm;
