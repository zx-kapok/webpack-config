const devConfig = require("./webpack.config.dev")
const proConfig = require("./webpack.config.pro")
const commonConfig = require("./webpack.config.common")
const webpackMerge = require("webpack-merge")

module.exports = (env, args) => {
  switch (args.mode) {
    case "development":
      return webpackMerge.merge(commonConfig, devConfig)
    case "production":
      return webpackMerge.merge(commonConfig, proConfig)
    default:
      throw new Error("Please check your config!")
  }
}
