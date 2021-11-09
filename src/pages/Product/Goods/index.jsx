import React, {Component} from 'react';
import {Button, Menu, Card as Container, Input, Select, Switch, Table, Dropdown, message} from "antd";
import {productListApi, productStateChangeApi} from "../../../api/product";

const {Option} = Select;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);

class Goods extends Component {

    state = {
        goodsList: [],      // 商品列表
        search: {
            type: "name",
            key: ""
        },
        page: {
            total: 0,           // 数据总长度
            pageSize: 5,        // 每页显示多少条数据
            currentPageNum: 1,  // 当前在哪一页
        },
        modalVisible: false,// modal是否显示
        modalType: "add",   // modal类型
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            align: "center",
            render: text => <div>{text}</div>,
        },
        {
            title: 'Description',
            dataIndex: "description",
            align: "center",
            width: "50%",
            render: text => <div style={{textAlign: "left"}}>{text}</div>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: "center",
            width: "5%",
            render: text => <div>￥{parseFloat(text).toFixed(2)}</div>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            align: "center",
            width: 60,
            render: (text, record) => (
                <Switch
                    style={{width: 60}}
                    checkedChildren="上架"
                    unCheckedChildren="下架"
                    defaultChecked={text}
                    loading={record.isLoading}
                    onChange={
                        (checked, e) => {
                            this.handleGoodsStatusChange(checked, text, record, e)
                        }
                    }
                />
            )
        },
        {
            title: 'Actions',
            key: "actions",
            align: "center",
            width: "10%",
            render: (text, record) => (
                <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                    <Button>bottomCenter</Button>
                </Dropdown>
            ),
        },
    ];

    componentDidMount() {
        // 挂载时发送请求
        const {currentPageNum, pageSize} = this.state.page;
        this.getGoodsList(currentPageNum, pageSize);
    }


    /**
     * 调用获取商品列表接口
     */
    getGoodsList(currentPageNum = 1, pageSize = 5) {
        const {type, key} = this.state.search;
        const searchData = {currentPageNum, pageSize};
        if(!(key === "" || key.trim() === "")) {
            searchData.type = type;
            searchData.key = key;
        }

        productListApi(searchData).then(res => {
            const {list, total} = res.data;

            list.forEach(item => item.isLoading = false);
            this.setState({
                goodsList: list,
                page: {
                    total,
                    pageSize,
                    currentPageNum
                }
            });
        }).catch(e => {
            console.log(e);
        })
    }

    handleAddBtnClick() {

    }


    handleSearchBtnClick() {
        const key = this.searchInputEl.input.value.trim();
        const newSearch = {...this.state.search, key};
        this.setState({
            search: newSearch
        }, () => {
            const {page} = this.state;
            this.getGoodsList(1, page.pageSize);
        })
    }


    /**
     * 商品上架下架动画开关
     * @param id 商品id
     */
    goodsStatusLoadingSwitch(id) {
        this.setState({
            goodsList: this.state.goodsList.map(item => {
                if (item.id === id) item.isLoading = !item.isLoading;
                return item;
            })
        })
    }


    /**
     * 商品上架下架处理
     */
    handleGoodsStatusChange(checked, text, record, e) {

        // 显示loading动画
        this.goodsStatusLoadingSwitch(record.id);
        productStateChangeApi({id: record.id, status: checked}).then(res => {
            message.success("成功!", 1);
            this.goodsStatusLoadingSwitch(record.id);
        }).catch(e => {
            message.warning(e.status, 1);
            this.goodsStatusLoadingSwitch(record.id);
        })
    }


    /**
     * 当页码发生改变
     * @param page  当前在第几页
     * @param pageSize  每页显示多少条数据
     */
    onPageChange(page, pageSize) {
        this.getGoodsList(page, pageSize);
    }

    renderTitle() {

        return (
            <div>
                <Select
                    defaultValue="name"
                    style={{ width: 120 }}
                    onChange={value => {this.setState({search: {...this.state.search, type: value}})}}
                >
                    <Option value="name">by name</Option>
                    <Option value="description">by description</Option>
                </Select>
                <Input
                    style={{minWidth: 100, maxWidth: "20%"}}
                    allowClear
                    placeholder="请输入搜索关键字"
                    ref={el => this.searchInputEl = el}
                    // onChange={(e) => {
                    //     this.setState({search: {...this.state.search, key: e.target.value.trim()}})
                    // }}
                />
                <Button type="primary" onClick={this.handleSearchBtnClick.bind(this)} >搜索</Button>
            </div>
        );
    }

    render() {
        return (
            <Container title={this.renderTitle()}
                  extra={<Button type="primary" onClick={this.handleAddBtnClick.bind(this)}>添加</Button>}
            >
                <Table
                    bordered
                    rowKey="id"
                    pagination={{
                        pageSize: this.state.page.pageSize,  // 每页展示多少条数据
                        current: this.state.page.currentPageNum,// 当前在第几页
                        total: this.state.page.total,         // 总共多少条数据
                        onChange: this.onPageChange.bind(this)
                    }}
                    columns={this.columns}
                    dataSource={this.state.goodsList}
                />
            </Container>
        );
    }
}

export default Goods;
