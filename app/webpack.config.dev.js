const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'index.tsx')
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: {
    react: 'react',
    reactDOM: 'react-dom',
    ReactRouterDOM: 'react-router-dom'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          '/node_modules/',
          path.join(__dirname, 'src'),
          path.join(__dirname, 'dist')
        ]
      }, {
        test: /\.less$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
              modifyVars: {},
              javascriptEnabled: true,
            },
          },
        }],
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'web'),
    library: {
      type: "system"
    },
  },
  devServer: {
    contentBasePublicPath: '/partners',
    contentBase: path.join(__dirname, 'web'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        target: 'https://super-api-staging.supersonic.com',
        changeOrigin: true,
        secure: false,
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: path.join(__dirname, 'index.html')
    })
  ]
}