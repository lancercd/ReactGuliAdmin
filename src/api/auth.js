import index from "../utils/request";

/**
 * 用户登录api
 * @param data {username, password}
 * @returns {*}
 */
export function loginApi(data) {
    return index({
        url: '/auth/login',
        method: "post",
        data
    })
}
