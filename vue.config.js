const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  devServer: {
    historyApiFallback: true,
    allowedHosts: 'all'
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
    // module: {
    //   rules: [
    //     {
    //       test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    //       use: [
    //         {
    //           loader: 'url-loader',
    //           options: {
    //             limit: 10000, // 小于10kb的图片将被转换成base64编码
    //             name: 'img/[name].[hash:7].[ext]'
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // }
  }
}
)
