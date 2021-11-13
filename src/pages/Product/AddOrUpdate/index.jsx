import React, {Component} from 'react';
import {idRegExp} from "../../../rules/product";
import {Button, Card as Container, Checkbox, Form, Input, message} from "antd";
import {passwordRules, usernameRules} from "../../../rules/user";
import {ArrowLeftOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";

import "./index.less";


const Item = Form.Item;


class AddOrUpdate extends Component {

    constructor(props) {
        super(props);
        console.log("addOrUpdate");
        console.log(this.props);

        this.id = props.match.params.id;

        this.isAdd = true;
        this.isUpdate = false;
        this.isValidate = true;

        if(this.id) {
            // 如果为更新 修改
            this.isAdd = false;
            this.isUpdate = true;

            // 判断是否为数字  非数字跳转到商品列表
            this.isValidate = idRegExp.test(this.id);
            if(!this.isValidate) {
                message.warn("商品id不合法!");
                this.props.history.replace("/product/goods");
            }
        }

    }
    componentDidMount() {
        if(!this.isValidate) return;
        console.log("AddOrUpdate: didMount");

        console.log(this.isAdd ? "新增" : "修改");
    }

    renderTitle() {
        return (
            <Button type="link" onClick={() => {this.props.history.push("/product/goods", this.props.location.state);}}>
                <ArrowLeftOutlined />返回商品详情
            </Button>
        );
    }


    render() {
        if(!this.isValidate) return null;
        console.log("render AddOrUpdate");
        return (
            <Container title={this.renderTitle()}>
                <Form
                    name="add-update-form"
                    className="add-update-form"
                    initialValues={{remember: true}}
                    scrollToFirstError={true}
                    // onFinish={this.onFinish.bind(this)}
                    // onFinishFailed={this.onFinishFailed.bind(this)}
                    // onValuesChange={this.onValuesChange.bind(this)}
                >
                    <Item
                        name="username"
                        label="商品名称"
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
            </Container>
        );
    }
}

export default AddOrUpdate;
