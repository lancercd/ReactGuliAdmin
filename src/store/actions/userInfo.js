import {USER_INFO_ADD, USER_INFO_REMOVE} from "../constant";
import StorageUtil from "../../utils/StorageUtil";

/**
 * userInfo actions creator
 */


/**
 * 添加用户信息action
 * @param data userInfoObject
 * @returns {{data, type: string}}
 */
export function add_user_action(data) {

    // 利用LocalStorage做持久化
    StorageUtil.setItem("token", data.token);
    StorageUtil.setItem("user", data.user);
    return {type: USER_INFO_ADD, data};
}


/**
 * 移除用户信息action
 * @returns {{data: {isLogin: boolean, user: {}, token: string}, type: string}}
 */
export function remove_user_action() {

    // 移除LocalStorage中保存的数据
    StorageUtil.removeItem("token");
    StorageUtil.removeItem("user");
    return {type: USER_INFO_REMOVE, data: {user: {}, token: "", isLogin: false}}
}
