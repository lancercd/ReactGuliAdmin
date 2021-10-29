
/**
 * String工具类
 */
class StringUtil {

    /**
     * 是否为空字符串
     * @param str
     * @returns {boolean}
     */
    static isEmpty(str) {
        return (str === null || str === undefined || typeof str !== "string" || str.trim().length === 0);
    }

}


export default StringUtil;
