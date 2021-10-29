import React, {Component} from "react";
import { Menu } from 'antd';

import menuList from "../../config/menuConfig";
import {Link, withRouter} from "react-router-dom";

const { SubMenu, Item } = Menu;


/**
 * 左侧菜单
 */
class MainMenu extends Component{
    constructor(props) {
        super(props);
        this.currentPath = props.location.pathname;
    }


    state = {
        selectedMenuKeys: ["/home"],
    }

    renderMenuList(menuList) {
        return menuList.map(item => {

            // render submenu
            if(item.children && item.children.length !== 0){
                return (
                    <SubMenu key={item.path || item.title} icon={item.icon} title={item.title}>
                        {this.renderMenuList(item.children)}
                    </SubMenu>
                );
            }

            // render menu item
            return (
                <Item key={item.path} icon={item.icon}>
                    <Link to={item.path} >{item.title}</Link>
                </Item>
            );
        })
    }

    // UNSAFE_componentWillMount() {
    //
    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log("shouldComponentUpdate");
    //     return this.currentPath !== nextProps.location.pathname;
    // }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate");

        const pathName = nextProps.location.pathname;
        if (this.currentPath !== pathName) {
            this.currentPath = pathName;
            return true;
        }
        // return this.currentPath !== nextProps.location.pathname;
        return false;
    }

    render() {
        // this.currentPath = this.props.location.pathname;
        console.log("render MainMenu");
        return (
            <div style={{width: "100%"}}>
                <div style={{width: "100%", height: "64px", textAlign: "center", lineHeight: "64px"}}>
                    admin
                </div>
                <Menu
                    // defaultSelectedKeys={[this.props.location.pathname]}
                    selectedKeys={[this.currentPath]}
                    mode="inline"
                    theme="light"
                >
                    {this.renderMenuList(menuList)}
                    {/*<Item key="1" icon={<MailOutlined />}>*/}
                    {/*    <Link to="/home" >home</Link>*/}
                    {/*</Item>*/}
                    {/*<Item key="2" icon={<CalendarOutlined />}>*/}
                    {/*    <Link to="/admin" >admin</Link>*/}
                    {/*</Item>*/}
                    {/*<SubMenu key="sub1" icon={<AppstoreOutlined />} title="user">*/}
                    {/*    <Item key="3">*/}
                    {/*        <Link to="/user" >user</Link>*/}
                    {/*    </Item>*/}
                    {/*    <Item key="4">Option 4</Item>*/}
                    {/*    <SubMenu key="sub1-2" title="Submenu">*/}
                    {/*        <Item key="5">Option 5</Item>*/}
                    {/*        <Item key="6">Option 6</Item>*/}
                    {/*    </SubMenu>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">*/}
                    {/*    <Item key="7">Option 7</Item>*/}
                    {/*    <Item key="8">Option 8</Item>*/}
                    {/*    <Item key="9">Option 9</Item>*/}
                    {/*    <Item key="10">Option 10</Item>*/}
                    {/*</SubMenu>*/}
                    {/*<Item key="link" icon={<LinkOutlined />}>*/}
                    {/*    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">*/}
                    {/*        Ant Design*/}
                    {/*    </a>*/}
                    {/*</Item>*/}
                </Menu>
            </div>
        );
    }
}

export default withRouter(MainMenu);
