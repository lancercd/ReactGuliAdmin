import React, {Component} from 'react';
import {withRouter as WithRouter} from "react-router-dom";
import menuConfig from "../../../config/menuConfig";


@WithRouter
class HeaderTitle extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.location.pathname !== nextProps.location.pathname;
    }

    getCurrentPath() {
        const {location, match} = this.props;
        console.log(location);
        console.log(match);
        return (match.path === '/')? location.pathname : match.path;
    }

    getTitle(menuList, currentPath) {
        console.log("currentPath", currentPath);
        for(const item of menuList) {
            if (Array.isArray(item.children) && item.children.length !== 0) {
                let title = this.getTitle(item.children, currentPath);
                if(title) return title;
            }else {

                if(currentPath === item.path) {
                    return item.title;
                }
            }
        }

        return null;
    }

    render() {
        return (
            <h5>
                {this.getTitle(menuConfig, this.getCurrentPath()) || "default"}
            </h5>
        );
    }
}

export default HeaderTitle;
