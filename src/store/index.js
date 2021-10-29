import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import allReducers from "./reducers"


// 包含异步则需要使用applyMiddleware(thunk)  未使用浏览器插件debug
// export default createStore(allReducer, applyMiddleware(thunk));

// 包含异步任务 且 配合redux DevTools浏览器插件使用   composeWithDevTools


/**
 * 创建仓库
 *      将(结合 | 联合)的reducers放入仓库中
 *      使用中间件thunk处理异步任务 并且 结合浏览器插件对store进行查看debug
 */
export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));
