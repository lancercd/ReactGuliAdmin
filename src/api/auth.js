import request from "../utils/request";

/**
 * 用户登录api
 * @param data {username, password}
 * @returns {*}
 */
export function loginApi(data) {
    return request({
        url: '/admin/auth/login',
        method: "post",
        data
    })
}
