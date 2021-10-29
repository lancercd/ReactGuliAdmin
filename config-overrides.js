const {override, fixBabelImports, addLessLoader, addDecoratorsLegacy} = require('customize-cra');

module.exports = override(
    // antd按需引入
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    // 修改antd主题
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: {'@primary-color': '#1DA57A'},
    }),
    addDecoratorsLegacy()
);
