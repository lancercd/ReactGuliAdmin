import React, {Component} from 'react';
import {Button, Card, Form, Input, message, Modal, Table} from "antd";
import {addCategoryApi, categoryListApi, modifyCategoryApi} from "../../../api/category";
import {CategoryNameRules} from "../../../rules/category";

class Category extends Component {

    state = {
        categoryList: [],       // 商品分类列表
        modalVisible: false,    // modal是否显示
        modalType: "添加",      // modal类型
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <div>{text}</div>,
        },
        {
            title: 'Action',
            width: "30%",
            align: "center",
            render: (text, record) => (
                <Button danger onClick={() => {this.handleModifyBtnClick(text, record)}}>修改</Button>
            ),
        },
    ];

    componentDidMount() {
        categoryListApi().then(res => {
            this.setState({
                categoryList: res.data
            })
        });
    }

    /**
     * 修改按钮点击
     * @param text
     * @param record
     */
    handleModifyBtnClick(text, record) {
        this.setState({modalVisible: true, modalType: "修改"});
    }

    /**
     * 添加按钮点击
     */
    handleAddBtnClick() {
        this.setState({modalVisible: true, modalType: "添加"});
    }

    /**
     * 弹出框取消按钮点击处理方法
     */
    handleModalCancel() {
        this.setState({modalVisible: false});
        this.resetModalFormValue();
    }

    /**
     * 弹出框缺人按钮点击处理方法
     */
    handleModalOk() {
        const {modalType} = this.state;
        this.formRef.validateFields(["name"]).then(values => {
            let api = null;
            if(modalType === "添加") {
                api = this.addCategory(values);
            }else {
                api = this.modifyCategory(values);
            }
            api.then(res => {
                console.log(res);
                this.setState({modalVisible: false});
                this.resetModalFormValue();
            }).catch(e => {
                console.log(e);
            })

        }).catch(e => {
            console.log(e);
            message.warning("类型名有误!");
        })
    }

    addCategory(name) {
        return addCategoryApi(name)
    }

    modifyCategory(values) {
        return modifyCategoryApi(values);
    }


    /**
     * 重置input框中的value
     * @param value
     */
    resetModalFormValue(value = "") {
        this.formRef.setFieldsValue({name: value});
    }

    render() {
        return (
            <>
                <Card title="Default size card"
                      extra={<Button type="primary" onClick={this.handleAddBtnClick.bind(this)}>添加</Button>}
                >
                    <Table
                        bordered
                        rowKey="id"
                        pagination={
                            {pageSize: 5}
                        }
                        columns={this.columns}
                        dataSource={this.state.categoryList}
                    />
                </Card>
                <Modal
                    title={this.state.modalType}
                    centered
                    cancelText="取消"
                    okText="确定"
                    visible={this.state.modalVisible}
                    onOk={this.handleModalOk.bind(this)}
                    onCancel={this.handleModalCancel.bind(this)}
                >
                    <Form
                        ref={formRef => this.formRef = formRef}
                        name="basic"
                        autoComplete="off"
                    >
                        <Form.Item
                            label="name"
                            name="name"
                            hasFeedback
                            rules={CategoryNameRules}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }

}

export default Category;
