
const path = require('path')
const pxToViewport = require('postcss-px-to-viewport')

module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src'),
            '@scss': path.resolve(__dirname, 'src/assets/styles')
        },
    },
    // react-scripts 4.0 的写法：
    style: {
        postcss: {
            plugins: [
                pxToViewport({
                    // 视口宽度，就是基准尺寸，一般使用 375px（设计师的设计稿一般也按该宽度来设计）
                    viewportWidth: 375
                })
            ]
        }
    },
    // react-scripts 5.0 的写法：
    // style: {
    //     postcss: {
    //         mode: "extends",
    //         loaderOptions: {
    //             postcssOptions: {
    //                 ident: "postcss",
    //                 plugins: [pxToViewport({ viewportWidth: 375 })],
    //             },
    //         },
    //     },
    // },
}