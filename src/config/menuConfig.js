import React from "react";
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined,
} from '@ant-design/icons';




const menuList = [
    {
        title: "home",
        key: "home",
        path: "/home",
        icon: <MailOutlined />
    },
    {
        title: "admin",
        key: "admin",
        path: "/admin",
        icon: <CalendarOutlined />
    },
    {
        title: "user",
        key: "user",
        icon: <AppstoreOutlined />,
        children: [
            {
                title: "list",
                key: "list",
                path: "/user/list",
                icon: <CalendarOutlined />
            },
            {
                title: "Option 4",
                key: "Option",
                children: [
                    {
                        title: "5",
                        key: "5",
                        path: "/user/Option/5",
                    },
                    {
                        title: "6",
                        key: "6",
                        path: "/user/Option/6",
                    }
                ]
            }
        ]
    },
    {
        title: "product",
        key: "product",
        icon: <SettingOutlined />,
        children: [
            {
                title: "分类管理",
                key: "category",
                path: "/product/category",
            },
            {
                title: "商品管理",
                key: "goods",
                path: "/product/goods",
            },
        ]
    },
    {
        title: "role",
        key: "role",
        path: "/role",
        icon: <SettingOutlined />,
    },
    {
        title: "ant.design",
        key: "design",
        path: "/design",
        icon: <LinkOutlined />,
    }
]

export default menuList;
