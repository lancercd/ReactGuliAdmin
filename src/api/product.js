import request from "../utils/request";


/**
 * 获取商品列表
 * @returns {Promise}
 */
export function productListApi(params = {}) {
    params.currentPageNum = params.currentPageNum || 1;
    params.pageSize = params.pageSize || 10;
    return request({
        url: `/product/list`,
        method: "GET",
        params
    })
}

/**
 * 商品上架下架
 * @param params {{id: number, status: boolean}}
 * @returns {Promise}
 */
export function productStateChangeApi(params) {
    return request({
        url: `/product/status`,
        method: "GET",
        params
    })
}
