import React, {Component} from 'react';
import {idRegExp} from "../../../rules/product";
import {Button, Card as Container, Form, Input, message, Select} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";

import "./index.less";
import {categoryListApi} from "../../../api/category";
import UploadImage from "../../../components/UploadImage";
import RichTextEditor from "../../../components/RichTextEditor";
import {productAddApi, productDetailApi, productUpdateApi} from "../../../api/product";


class AddOrUpdate extends Component {

    state = {
        goods: {
            name: "",
            description: "",
            price: "",
            status: false

        },
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
        if (this.isUpdate) {
            this.getGoodsDetail();
        }

        this.getCategoryList();
    }

    getGoodsDetail() {
        productDetailApi(this.id).then(res => {
            console.log(res);
            this.setState({
                goods: res.data
            }, () => {
                this.onReset();
            });
        }).catch( e => {
            message.warn(e.msg);
        });
    }

    onReset() {
        if(this.formRef){
            this.formRef.resetFields();
        }
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


    sendRequest(values) {

        if (this.isUpdate) {
            values.id = this.id;
            return productUpdateApi(values);
        }
        return productAddApi(values);
    }


    onFinish(values) {
        console.log(values);
        this.sendRequest(values).then(res => {
            message.success(res.msg);
            this.goToGoodsPage();
        }).catch(e => {
            message.warn(e.msg);
        })
    }


    goToGoodsPage() {
        this.props.history.push("/product/goods", this.props.location.state);
    }


    renderTitle() {
        return (
            <Button type="link" onClick={this.goToGoodsPage.bind(this)}>
                <ArrowLeftOutlined />返回商品详情
            </Button>
        );
    }


    render() {
        if(!this.isValidate) return null;
        console.log("render AddOrUpdate");
        const {goods, categoryList} = this.state;
        return (
            <Container title={this.renderTitle()}>
                <Form
                    ref={formRef => this.formRef = formRef}
                    name="add-update-form"
                    {...this.formItemLayout}
                    className="add-update-form"
                    initialValues={goods}
                    scrollToFirstError={true}
                    onFinish={this.onFinish.bind(this)}
                    // onFinishFailed={this.onFinishFailed.bind(this)}
                    // onValuesChange={this.onValuesChange.bind(this)}
                >
                    <Form.Item
                        name="name"
                        label="名称"
                        rules={[{required: true}]}
                    >
                        <Input value={goods.name || ""}/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                        hasFeedback
                        rules={[{required: true}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="价格"
                        hasFeedback
                        rules={[{required: true}]}
                    >
                        <Input
                            prefix="￥"
                            suffix="元"
                            type="number"
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item name="categoryId" label="分类" rules={[{required: true}]}>
                        <Select
                            placeholder="选择商品分类!"
                            allowClear
                        >
                            {
                                categoryList.map(item =>
                                    (<Select.Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Select.Option>)
                                )
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item name="images"
                               // initialValue={["http://127.0.0.1:10086/storage/fetch/2021/11/23/dfc45f494c3647b0b2e14d2cd97e5790.jpg"]}
                               label="商品图片"
                               valuePropName="images"
                               rules={[{required: true}]}
                               getValueFromEvent={data => data}
                    >
                        <UploadImage
                            name="images"
                            max={4}
                        />
                    </Form.Item>

                    <Form.Item name="detail"
                               rules={[{required: true}]}
                               label="详情描述"
                               valuePropName="value"
                               getValueFromEvent={data => data}
                    >
                        <RichTextEditor />
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
