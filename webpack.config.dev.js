const path = require("path")

/**
 * 开发环境配置
  1、 模块热更新（本地开启服务，实时更新）
  2、 sourceMap (方便调试，定位问题)
  3、接口代理(配置proxyTable解决开发环境中的跨域问题)
  4、代码规范检查 (代码规范检查工具)
 */

module.exports = {
  devServer: {
    ip: "10.1.141.87",
    port: "9527",
    hot: true,
    open: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
}
