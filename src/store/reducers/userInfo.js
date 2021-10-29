import {USER_INFO_ADD, USER_INFO_REMOVE} from "../constant";
import StorageUtil from "../../utils/StorageUtil";

const token = StorageUtil.getItem("token");
const user = StorageUtil.getItem("user") || {};


const initState = {
    user,
    token,
    isLogin: !!token
}

/**
 * userInfoReducer
 * @param preState  用户信息 token 是否登录
 * @param action    通过createAction创建的
 *                  根据action中的type确定需要将data如何处理 (匹配对应的case)
 * @returns {{isLogin: boolean, user: {}, token: string}}
 */
export default function userInfo(preState = initState, action) {
    const {type, data} = action;
    switch (type) {
        case USER_INFO_ADD:
            return data;
        case USER_INFO_REMOVE:
            return initState;
        default:
            return preState;
    }
}
