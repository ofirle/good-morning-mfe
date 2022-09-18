const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'index.tsx'),
  },
  target: 'web',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    ReactRouterDOM: 'ReactRouterDOM',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: ['/node_modules/', path.join(__dirname, 'src'), path.join(__dirname, 'dist')],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle[hash].js',
    path: path.resolve(__dirname, 'web'),
    library: {
      type: 'umd',
    },
  },
  devServer: {
    contentBasePublicPath: '/partners',
    contentBase: path.join(__dirname),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/v1': {
        // target: process.env.API_SERVICE_URL || 'https://super-api-staging.supersonic.com',
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: path.join(__dirname, 'index.html'),
      cssPath: process.env.CSS_PATH || 'https://ui-assets.supersonic.com/css/local/antd.css'
    }),
  ],
};
