import request from "../utils/request";

export function categoryListApi() {
    return request({
        url: "/admin/category/list",
        method: "post"
    });
}

/**
 * 添加
 * @param data {{name}}
 * @returns {Promise}
 */
export function addCategoryApi(data) {
    return request({
        url: "/admin/category/add",
        method: "post",
        data
    })
}

/**
 * 修改
 * @param data {{id, name}}
 * @returns {Promise}
 */
export function modifyCategoryApi(data) {
    return request({
        url: "/admin/category/modify",
        method: "post",
        data
    })
}
