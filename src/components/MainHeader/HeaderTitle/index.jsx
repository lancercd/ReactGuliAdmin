import React, {Component} from 'react';
import {withRouter as WithRouter} from "react-router-dom";
import menuConfig from "../../../config/menuConfig";


@WithRouter
class HeaderTitle extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.location.pathname !== nextProps.location.pathname;
    }

    getTitle(menuList, currentPath) {
        for(const item of menuList) {
            if (Array.isArray(item.children) && item.children.length !== 0) {
                let title = this.getTitle(item.children, currentPath);
                if(title) return title;
            }else {
                if(this.comparePath(item.path.split("/"), currentPath)) {
                    return item.title;
                }
            }
        }

        return null;
    }

    /**
     * 对比路径是否匹配
     * @param target    menuConfig中的路径
     * @param current   当前路由中的路径
     * @returns {boolean}
     */
    comparePath(target, current) {
        const lenA = target.length, lenB = current.length;

        if(lenB > lenA) return false;

        let cnt = 0;
        for (let i = 0; i < lenA; ++i) {
            if(target[i] && target[i][0] === ":") ++cnt;
        }

        if(lenB < (lenA - cnt)) return false;


        for (let i = 0; i < lenA; ++i) {
            if(target[i].startsWith(":")) break;

            if(target[i] !== current[i]) return false;
        }

        return true;
    }

    render() {
        return (
            <h5>
                {this.getTitle(menuConfig, this.props.location.pathname.split("/")) || "default"}
            </h5>
        );
    }
}

export default HeaderTitle;
