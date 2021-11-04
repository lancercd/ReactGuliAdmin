import React, {Component} from 'react';
import {withRouter as WithRouter} from "react-router-dom";
import menuConfig from "../../../config/menuConfig";


@WithRouter
class HeaderTitle extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.location.pathname !== nextProps.location.pathname;
    }

    getTitle(menuList) {
        let path = this.props.location.pathname;
        for(const item of menuList) {
            if (Array.isArray(item.children) && item.children.length !== 0) {
                let title = this.getTitle(item.children);
                if(title) return title;
            }else {
                if(path === item.path) {
                    return item.title;
                }
            }
        }

        return null;
    }

    render() {
        console.log("render");
        return (
            <h5>
                {this.getTitle(menuConfig) || "default"}
            </h5>
        );
    }
}

export default HeaderTitle;
