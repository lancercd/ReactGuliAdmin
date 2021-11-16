import React, {Component} from 'react';
import {idRegExp} from "../../../rules/product";
import {Button, Card as Container, Form, Input, message, Select} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";

import "./index.less";
import {categoryListApi} from "../../../api/category";
import UploadImage from "../../../components/UploadImage";


const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};


class AddOrUpdate extends Component {

    state = {
        categoryList: []
    }

    formItemLayout = {
        labelCol: {
            span: 3,
        },
        wrapperCol: {
            span: 14,
        },
    };

    constructor(props) {
        super(props);

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

        this.getCategoryList();
    }

    /**
     * 获取商品所有分类
     */
    getCategoryList() {
        categoryListApi().then(res => {
            this.setState({
                categoryList: res.data
            })
        });
    }


    onFinish(values) {
        console.log(values);
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
                    {...this.formItemLayout}
                    className="add-update-form"
                    initialValues={{remember: true}}
                    scrollToFirstError={true}
                    onFinish={this.onFinish.bind(this)}
                    // onFinishFailed={this.onFinishFailed.bind(this)}
                    // onValuesChange={this.onValuesChange.bind(this)}
                >
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                        hasFeedback
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="价格"
                        hasFeedback
                        rules={[{ required: true }]}
                    >
                        <Input
                            prefix="￥"
                            suffix="元"
                            type="number"
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item name="category" label="分类" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            {
                                this.state.categoryList.map(item =>
                                    (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
                                )
                            }
                        </Select>
                     </Form.Item>

                    <Form.Item name="images"
                          label="商品图片"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                    >
                        <UploadImage
                            ref={images => this.imagesEL = images}
                            urls={["http://127.0.0.1:9527/image/9f976a7d-e3f3-460a-a0ed-b9084586ea3e.jpg"]}
                            max={4}
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Container>
        );
    }
}

export default AddOrUpdate;
