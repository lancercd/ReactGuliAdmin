import axios from "axios";
// import qs from "querystring";
import NProgress from "nprogress";  // yarn add nprogress  // 顶部显示加载条
import "nprogress/nprogress.css";

// const BASE_URL = "http://159.75.128.32:5000/api";
const BASE_URL = 'http://127.0.0.1:9527/api';

const index = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {}
});


index.interceptors.request.use(config => {
    NProgress.start();
    const {method, data} = config;

    // 若是POST请求
    if(method && method.toLowerCase() === "post") {
        // 若传递过来的参数是对象形式
        if (data instanceof Object) {
            // 转为x-www-form-urlencoded编码  其Content-Type会自动变为 application/x-www-form-urlencoded
            // config.data = qs.stringify(data);
        }
    }

    return config;
}, err => {
    console.log('err', err);
});


index.interceptors.response.use(res => {
    NProgress.done();
    const {data} = res;

    return (data.errno === 0) ? data : Promise.reject(data);
}, err => {
    NProgress.done();
    console.log("网络错误？", err);

    return new Promise(() => {});
})


export default index;
