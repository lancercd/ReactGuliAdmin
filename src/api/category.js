import request from "../utils/request";

export function categoryListApi() {
    return request({
        url: "/manage/category/list",
        method: "post"
    });
}
