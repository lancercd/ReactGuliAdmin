import React, {Component} from 'react';
import {Menu, Dropdown, Modal} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import "./index.less";
import {withRouter} from "react-router-dom";
import StorageUtil from "../../utils/StorageUtil";
import Connect from "../../utils/decorators/Connect";


@Connect
class MainHeader extends Component {

    /**
     * 组件卸载前调用
     */
    componentWillUnmount() {

    }


    logoutBtnClickHandler(e) {
        e.stopPropagation();
        Modal.confirm({
            content: "确认退出吗?",
            onOk:() => {
                // 删除保存的用户数据
                StorageUtil.removeItem("token");
                StorageUtil.removeItem("username");

                //跳转到login
                this.props.history.replace("/login");
            },
            onCancel: () => {}
        });
        console.log("logout");
    }

    renderHeaderMenu() {
        return (
            <Menu>
                <Menu.Item key="0">
                    <div onClick={this.logoutBtnClickHandler.bind(this)}>1st menu item</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );
    }

    render() {
        return (
            <div className="MainHeader">
                <div>
                    <span>欢迎, </span>
                    <Dropdown overlay={this.renderHeaderMenu()} trigger={['click']}>
                        <div  className="ant-dropdown-link header-menu-btn" onClick={e => e.preventDefault()}>
                            admin <DownOutlined />
                        </div>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default withRouter(MainHeader);
