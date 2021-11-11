import React, {Component} from 'react';
import {Button, Card, message} from "antd";
import {withRouter as WithRouter} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";


import "./index.less";
import {idRegExp} from "../../../rules/product";



@WithRouter
class Detail extends Component {
    constructor(props) {
        super(props);

        this.id = props.match.params.id;

        // 判断是否为数字  非数字跳转到商品列表
        this.isValidate = idRegExp.test(this.id);
        if(!this.isValidate) {
            message.warn("商品id不合法!");
            this.props.history.replace("/product/goods");
        }
    }

    renderTitle() {
        return (
            <Button type="link" onClick={() => {this.props.history.push("/product/goods", {search:{type: "description", key: "手"}});}}>
                <ArrowLeftOutlined />返回商品详情
            </Button>
        );
    }

    componentDidMount() {
        if(!this.isValidate) return;
        console.log("Detail: DidMount");
    }


    render() {
        if(!this.isValidate) return null;
        console.log("Detail: render");

        return (
            <Card title={this.renderTitle()}>
                <div>111</div>
                <div>111</div>
                <div>111</div>
            </Card>
        );
    }
}

export default Detail;
