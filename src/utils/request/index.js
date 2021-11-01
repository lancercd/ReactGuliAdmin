import axios from "axios";
import NProgress from "nprogress";  // yarn add nprogress  // 顶部显示加载条
import "nprogress/nprogress.css";
import {message} from "antd";
import store from "../../store";
import {USER_INFO_STORE_NAME} from "../../store/constant";

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

    // 添加token在header里面
    const token = store.getState()[USER_INFO_STORE_NAME].token;
    if(token) config.headers["Authorization"] = "lancercd_" + token;

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

    let data = null;
    if (res.config && res.config.needAll === true) {
        data = res;
    }else {
        data = res.data;
    }

    return (res.data.errno === 0) ? data : Promise.reject(data);
}, err => {
    // 顶部显示加载条开始
    NProgress.done();
    if(err.config && err.config.needAll === true) {
        return Promise.reject({config: err.config, request: err.request, response: err.response});
    }

    if (err.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        if(err.response.status === 401) {
            // 没有权限
            console.error("没有权限!");
            message.error("没有权限!");

        }

    } else if (err.request) {
        /*
            The request was made but no response was received
            error.request` is an instance of XMLHttpRequest in the browser and an instance of
            http.ClientRequest in node.js
         */
        // 显示错误信息
        message.error("网络中断...");

    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err.message);
    }
    console.log(err.config);

    // 避免api函数调用的时候处理
    return new Promise(() => {});
})


export default index;
