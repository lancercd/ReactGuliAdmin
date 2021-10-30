import StringUtil from "../StringUtil";

class StorageUtil {

    /**
     * Storage设置数据
     * @param key
     * @param value
     */
    static setItem(key, value) {
        if(StringUtil.isEmpty(key)){
            throw Error("key is invalid");
        }
        if (value === null || value === undefined) {
            value = "";
        }
        value = JSON.stringify(value);
        window.localStorage.setItem(key, value);
    }

    /**
     * Storage获取数据
     * @param key
     * @returns {any}
     */
    static getItem(key) {
        if(StringUtil.isEmpty(key)){
            throw Error("key is invalid");
        }
        const data = window.localStorage.getItem(key);
        try {
            return JSON.parse(data);
        }catch (e) {
            return data;
        }
    }

    /**
     * 移除Storage中的数据
     * @param key
     */
    static removeItem(key) {
        if(StringUtil.isEmpty(key)){
            throw Error("key is invalid");
        }
        window.localStorage.removeItem(key);
    }

    /**
     * clear Storage
     */
    static clear() {
        window.localStorage.clear();
    }
}


export default StorageUtil;
