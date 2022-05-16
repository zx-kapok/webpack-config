const path = require("path")

/**
 * 
 * 生产环境配置
    1、提取公共代码
    2、压缩混淆(压缩混淆代码，清除代码空格，注释等信息使其变得难以阅读)　　　
    3、文件压缩/base64编码(压缩代码，减少线上环境文件包的大小)　　　
    4、去除无用的代码　　　　
 */

module.exports = {
  entry: [path.join(__dirname, "src/index.js")],
}
