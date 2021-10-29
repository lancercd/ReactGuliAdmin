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
        path: "/home",
        icon: <MailOutlined />
    },
    {
        title: "admin",
        path: "/admin",
        icon: <CalendarOutlined />
    },
    {
        title: "user",
        icon: <AppstoreOutlined />,
        children: [
            {
                title: "user",
                path: "/user",
                icon: <CalendarOutlined />
            },
            {
                title: "Option 4",
                children: [
                    {
                        title: "Option 5",
                        path: "/Option_5",
                    },
                    {
                        title: "Option 6",
                        path: "/Option_6",
                    }
                ]
            }
        ]
    },
    {
        title: "Navigation_Three",
        icon: <SettingOutlined />,
        children: [
            {
                title: "Option 7",
                path: "/Option_7"
            },
            {
                title: "Option 8",
                path: "/Option_8"
            },
            {
                title: "Option 9",
                path: "/Option_9"
            },
        ]
    },
    {
        title: "category",
        path: "/category",
        icon: <LinkOutlined />,
    },
    {
        title: "ant.design",
        path: "/ant/design",
        icon: <LinkOutlined />,
    }
]

export default menuList;
