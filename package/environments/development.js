const webpack = require('webpack')
const Base = require('./base')
const devServer = require('../dev_server')
const { outputPath: contentBase, publicPath } = require('../config')

module.exports = class extends Base {
  constructor() {
    super()

    if (devServer.hmr) {
      this.plugins.append('HotModuleReplacement', new webpack.HotModuleReplacementPlugin())
      this.config.output.filename = '[name]-[hash].js'
    }

    this.config.merge({
      mode: 'development',
      cache: true,
      devtool: 'cheap-module-source-map',
      output: {
        pathinfo: true
      },
      devServer: {
        clientLogLevel: 'none',
        compress: devServer.compress,
        quiet: devServer.quiet,
        disableHostCheck: devServer.disable_host_check,
        host: devServer.host,
        port: devServer.port,
        https: devServer.https,
        hot: devServer.hmr,
        contentBase,
        inline: devServer.inline,
        useLocalIp: devServer.use_local_ip,
        public: devServer.public,
        publicPath,
        historyApiFallback: {
          disableDotRule: true
        },
        headers: devServer.headers,
        client: {
          overlay: devServer.overlay,
        },
        devMiddleware: {
          entrypoints: false,
          errorDetails: true,
          modules: false,
          moduleTrace: false
        },
        static: {
          watch: devServer.watch_options
        }
      }
    })
  }
}
