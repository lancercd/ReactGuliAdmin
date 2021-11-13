import React, {Component} from 'react';
import {idRegExp} from "../../../rules/product";
import {message} from "antd";

class AddOrUpdate extends Component {

    constructor(props) {
        super(props);
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
    }


    render() {
        if(!this.isValidate) return null;
        console.log("render AddOrUpdate");
        return (
            <div>
                <h3>addOrUpdate</h3>
                <span>
                    id:{this.props.match.params.id}
                </span>
            </div>
        );
    }
}

export default AddOrUpdate;
