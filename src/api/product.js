import request from "../utils/request";

const prefix = "/admin/goods";


/**
 * 获取商品详情
 * @returns {Promise}
 */
export function productDetailApi(id) {
    if(!id) throw new Error("商品id不能为空!");
    return request({
        url: `${prefix}/detail/${id}`,
        method: "GET"
    })
}


/**
 * 获取商品列表
 * @returns {Promise}
 */
export function productListApi(params = {}) {
    params.currentPageNum = params.currentPageNum || 1;
    params.pageSize = params.pageSize || 10;
    return request({
        url: `${prefix}/list`,
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
        url: `${prefix}/change/status`,
        method: "GET",
        params
    })
}
