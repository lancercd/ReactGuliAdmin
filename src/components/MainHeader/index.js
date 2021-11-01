import React, {Component} from 'react';
import {Menu, Dropdown, Modal} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {withRouter} from "react-router-dom";
import {connect as ConnectRedux} from "react-redux";

import "./index.less";
import {remove_user_action} from "../../store/actions/userInfo";
import {USER_INFO_STORE_NAME} from "../../store/constant";


const mapStateToProps = (state) => ({username: state[USER_INFO_STORE_NAME].user.username});
const mapDispatchToProps = {
    logoutAction: remove_user_action
}

/**
 * 主页面上方header
 */
@ConnectRedux(mapStateToProps, mapDispatchToProps)
class MainHeader extends Component {

    /**
     * 退出提示框
     * @param e
     */
    logoutBtnClickHandler(e) {
        e.stopPropagation();
        Modal.confirm({
            content: "确认退出吗?",
            onOk:this.doLogout.bind(this),
            onCancel: () => {}
        });
    }

    /**
     * 确认退出
     */
    doLogout() {
        // 清除redux和LocalStorage中存储的用户信息 以及 token
        this.props.logoutAction();

        //跳转到login页面
        this.props.history.replace("/login");
    }

    renderHeaderMenu() {
        return (
            <Menu>
                <Menu.Item key="0">
                    <div onClick={this.logoutBtnClickHandler.bind(this)}>退出登录</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );
    }

    render() {
        return (
            <div className="MainHeader">
                <div className="header-top">
                    <span>欢迎, </span>
                    <Dropdown overlay={this.renderHeaderMenu()} trigger={['click']}>
                        <div className="ant-dropdown-link header-menu-btn" onClick={e => e.preventDefault()}>
                            {this.props.username}
                            <DownOutlined/>
                        </div>
                    </Dropdown>
                </div>
                <div className="header-bottom">
                    <div className="title">
                        柱状图
                    </div>
                    <div className="day-info">
                        <div className="time">
                            <div>2021-11-11</div>
                            <div>11:11:11</div>
                        </div>
                        <div className="img-box">
                            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气信息"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MainHeader);
