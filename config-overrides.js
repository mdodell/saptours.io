const { override, fixBabelImports, addLessLoader } = require('customize-cra');

const theme = {
    'primary-color': '#002E6C',
};

module.exports = override(
    fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
}),
 addLessLoader({
       javascriptEnabled: true,
       modifyVars: theme,
 }),
);