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
        title: "category",
        key: "category",
        path: "/category",
        icon: <SettingOutlined />,
    },
    {
        title: "product",
        key: "product",
        path: "/product",
        icon: <SettingOutlined />,
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
