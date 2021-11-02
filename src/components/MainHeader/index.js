import React, {Component} from 'react';
import {Menu, Dropdown, Modal, Button} from 'antd';
import {DownOutlined, FullscreenExitOutlined, FullscreenOutlined} from '@ant-design/icons';
import {withRouter as WithRouter} from "react-router-dom";
import {connect as ConnectRedux} from "react-redux";
import screenFullPlugin from "screenfull";  // 页面全屏库 yarn add screenfull

import "./index.less";
import {remove_user_action} from "../../store/actions/userInfo";
import {USER_INFO_STORE_NAME} from "../../store/constant";
import HeaderTitle from "./HeaderTitle";
import HeaderDate from "./HeaderDate";


const mapStateToProps = (state) => ({username: state[USER_INFO_STORE_NAME].user.username});
const mapDispatchToProps = {
    logoutAction: remove_user_action
}

/**
 * 主页面上方header
 */
@ConnectRedux(mapStateToProps, mapDispatchToProps)
@WithRouter
class MainHeader extends Component {

    state = {
        // 当前是否为全屏状态
        isScreenFull: false
    }

    /**
     * 退出提示框
     * @param e Event
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

    /**
     * 页签全屏控制
     */
    doToggleScreenFull() {
        screenFullPlugin.toggle().then(() => {
            this.setState({
                isScreenFull: !this.state.isScreenFull
            })
        }).catch(e => {
            console.log(e);
        });
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
        console.log("MainHeader: render");
        return (
            <div className="MainHeader">
                <div className="header-top">
                    <span>
                        <Button size="small" onClick={this.doToggleScreenFull.bind(this)}>
                            {this.state.isScreenFull? <FullscreenExitOutlined /> : <FullscreenOutlined/>}
                        </Button>
                    </span>
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
                        <HeaderTitle />
                    </div>
                    <div className="day-info">
                        <HeaderDate />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainHeader;
