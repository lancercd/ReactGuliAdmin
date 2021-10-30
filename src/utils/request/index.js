import axios from "axios";
// import qs from "querystring";
import NProgress from "nprogress";  // yarn add nprogress  // 顶部显示加载条
import "nprogress/nprogress.css";
import {message} from "antd";

// const BASE_URL = "http://159.75.128.32:5000/api";
const BASE_URL = 'http://127.0.0.1:9527/api';

const index = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {}
});


index.interceptors.request.use(config => {
    // 顶部显示加载条开始
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

    // 顶部显示加载条结束
    NProgress.done();
    const {data} = res;

    return (data.errno === 0) ? data : Promise.reject(data);
}, err => {

    // 顶部显示加载条开始
    NProgress.done();
    // 显示错误信息
    message.error("网络中断...");

    // 避免api函数调用的时候处理
    return new Promise(() => {});
})


export default index;
