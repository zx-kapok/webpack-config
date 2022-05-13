const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer") // 性能分析插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const os = require("os")

const smp = new SpeedMeasurePlugin()

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name]-[fullhash:10].js",
    chunkFilename: "js/[name]-[contenthash:10].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: os.cpus().length,
              workerParallelJobs: 50,
              poolTimeout: 2000,
              poolParallelJobs: 50,
            },
          },
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ["less-loader", "style-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "a test program",
      template: "./src/index.html",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "server", // 可以是 server、static、json、disabled。在server模式下，分析器将启动HTTP服务器来显示软件包报告。在“静态”模式下，会生成带有报告的单个HTML文件。在disabled模式下，你可以使用这个插件来将generateStatsFile设置为true来生成Webpack Stats JSON文件。
      analyzerHost: "127.0.0.1", // 将在“服务器”模式下使用的端口启动HTTP服务器
      analyzerPort: 1234, // 端口号
      reportFilename: "report.html", // 路径捆绑，将在static模式下生成的报告文件。相对于捆绑输出目录
      defaultSizes: "parsed", // 默认显示在报告中的模块大小匹配方式。应该是stat，parsed或者gzip中的一个
      openAnalyzer: false, // 在默认浏览器中是否自动打开报告，默认 true
      generateStatsFile: false, // 如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
      statsFilename: "stats.json", // 相对于捆绑输出目录
      statsOptions: null, //stats.toJson()方法的选项。例如，您可以使用source：false选项排除统计文件中模块的来源。在这里查看更多选项：https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      logLevel: "info", // 日志级别，可以是info, warn, error, silent
      excludeAssets: null, // 用于排除分析一些文件
    }),
  ],
  optimization: {
    usedExports: true, // 是否启用 tree shaking
  },
}
