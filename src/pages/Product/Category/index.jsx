import React, {Component} from 'react';
import {Button, Card, Form, Input, message, Modal, Table} from "antd";
import {addCategoryApi, categoryListApi, modifyCategoryApi} from "../../../api/category";
import {CategoryNameRules} from "../../../rules/category";

class Category extends Component {

    state = {
        categoryList: [],       // 商品分类列表
        modalVisible: false,    // modal是否显示
        modalType: "add",      // modal类型
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
        this.getCategoryList();
    }

    getCategoryList() {
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
        this.setState({modalVisible: true, modalType: "modify"}, () =>{
            this.resetModalFormValue(text.name, text.id);
        });

    }

    /**
     * 添加按钮点击
     */
    handleAddBtnClick() {
        this.setState({modalVisible: true, modalType: "add"});
    }

    /**
     * 弹出框取消按钮点击处理方法
     */
    handleModalCancel() {
        this.setState({modalVisible: false}, () => {
            this.resetModalFormValue();
        });
    }

    /**
     * 弹出框缺人按钮点击处理方法
     */
    handleModalOk() {
        const {modalType} = this.state;
        this.formRef.validateFields(["name", "id"]).then(values => {
            if(modalType === "add") {
                this.addCategory(values);
            }else {
                this.modifyCategory(values);
            }

        }).catch(e => {
            console.log(e);
            message.warning("类型名有误!", 1);
        })
    }

    addCategory(values) {
        addCategoryApi({name: values.name}).then(res => {

            this.getCategoryList();
            this.resetModalFormValue();
            this.setState({modalVisible: false});
        }).catch(e => {
            message.warning(e.status, 1);
            console.log(e);
        })
    }

    modifyCategory(values) {
        modifyCategoryApi(values).then(res => {
            this.getCategoryList();
            this.resetModalFormValue();
            this.setState({modalVisible: false});
        }).catch(e => {
            message.warning(e.status, 1);
            console.log(e);
        })
    }


    /**
     * 重置input框中的value
     * @param name
     * @param id
     */
    resetModalFormValue(name = "", id = 0) {
        this.formRef.setFieldsValue({name, id});
    }

    render() {
        return (
            <>
                <Card extra={<Button type="primary" onClick={this.handleAddBtnClick.bind(this)}>添加</Button>}>
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
                    title={this.state.modalType === "add" ? "添加" : "修改"}
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
                            hidden
                            name="id"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="类型名"
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
