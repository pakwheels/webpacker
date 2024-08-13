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
        compress: devServer.compress,
        host: devServer.host,
        port: devServer.port,
        https: devServer.https,
        hot: devServer.hmr,
        allowedHosts: devServer.allowed_hosts,
        static: {
          publicPath,
          watch: devServer.watch_options
        },
        client: {
          logging: 'none',
          overlay: devServer.overlay,
        },
        devMiddleware: {
          publicPath: devServer.publicPath,
          entrypoints: false,
          errorDetails: true,
          modules: false,
        },
        historyApiFallback: {
          disableDotRule: true
        },
        headers: devServer.headers
      }
    }
    )
  }
}
