// 本文档中的配置最终会和node_modules里面的配置合并，本文章中的别名在项目中可以方便写入路径。
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // alias:another name
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}