import {Redirect} from "react-router-dom";
import store from "../../store";
import getDisplayName from "../../utils/getDisplayName";
import {USER_INFO_STORE_NAME} from "../../store/constant";


/**
 * 登录权限注解
 *      只有登录了才能访问
 *      若未登录则重定向到登录页面
 * @param TargetComponent   组件或容器
 * @returns {{WrappedComponent}|Component} 组件或容器
 * @author lancercd
 */
function LoginAuth(TargetComponent) {
    // 从容器中提取组件
    const Component = getComponentAdapter(TargetComponent);
    // 获取该组件的render函数
    const render = Component.prototype.render;

    // 将原本的render函数包装
    function WrappedRenderFn() {

        // 获取redux仓库中获取登录信息
        const state = store.getState(),
              isLogin = state[USER_INFO_STORE_NAME].isLogin;

        console.warn(isLogin ? "已登录" : "未登录");

        // 判断是否登录 未登录则重定向到登录页面
        if(isLogin !== true) return (<Redirect to="/login" />);

        // 渲染原本的render 并改变this指向  这里的this指向调用该函数的[组件实例]
        return render.call(this);
    }

    // 重写render函数
    Component.prototype.render = WrappedRenderFn;

    Component.displayName = getDisplayName(TargetComponent);

    // 将处理后的容器或则组件返回回去
    return TargetComponent;
}

/**
 * 获取组件适配器
 *      这里只写了从redux容器中获取组件 以及本身就为组件的情况
 *      根据需要改写适配器 从而获取主要组件
 * @param Target 目标容器、组件等
 * @returns {Component}
 * @author lancercd
 */
function getComponentAdapter(Target) {
    return Target.WrappedComponent? Target.WrappedComponent : Target;
}


export default LoginAuth;

/*
// 继承Component 方式
function LoginAuth(TargetComponent) {
    const component = TargetComponent.WrappedComponent? TargetComponent.WrappedComponent : TargetComponent;

    class LoginAuthComponent extends component {

        render() {
            console.log(this.props);
            const isLogin = store.getState()[USER_INFO_STORE_NAME].isLogin;
            if(isLogin !== true) {
                return (<Redirect to="/login" />);
            }

            // 渲染原本的render
            return super.render();
        }
    }
    LoginAuthComponent.displayName = getDisplayName(TargetComponent);
    if (TargetComponent.WrappedComponent) {
        TargetComponent.WrappedComponent = LoginAuthComponent;
    }else {
        TargetComponent = LoginAuthComponent;
    }
    return TargetComponent;
}
*/

/*
// https://www.ddhigh.com/2019/07/26/react-decorator-example.html
function Component<T extends { new(...args: any[]): any }>(component: T) { // 泛型限定
    return class extends component {
        handleClick() { // 劫持onClick
            super.handleClick()
            console.log('child clicked');
        }
        render() {
            const parent = super.render()
            // 劫持onClick
            return React.cloneElement(parent, { onClick: this.handleClick })
        }
    }
}
*/
