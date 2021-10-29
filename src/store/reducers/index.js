import {combineReducers} from "redux";
import {USER_INFO_STORE_NAME} from "../constant";
import userInfo from "./userInfo";


/**
 * reducers仓库
 *      将各各reducer结合 | 联合 起来统一暴露出去
 */
export default combineReducers({
    [USER_INFO_STORE_NAME]: userInfo,
});

