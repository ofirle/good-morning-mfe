const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

const plugins = [];
if (process.env.ANALYZE) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx')
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@ant/design/icons/lib/dist$': path.resolve(__dirname, './src/antd-icons.js')
    }
  },
  externals: [
    {
      lodash: 'lodash',
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM',
      ReactRouterDOM: 'ReactRouterDOM',
      antd: 'antd',
      moment: 'moment',
      axios: 'axios',
      // 'silk-carousel': 'silk-carousel',
      'prop-types': 'PropTypes'
    }
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: ['/node_modules/', '/dist/', '/styles/']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                // If you are using less-loader@5 please spread the lessOptions to options directly
                modifyVars: {},
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              } // translates CSS into CommonJS
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/
      }
    ]
  },
  plugins: [
    new CompressionPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'package.json', to: 'package.json' }]
    })
  ].concat(plugins),
  output: {
    filename: 'index.js',
    library: {
      name: 'goodMorningApp',
      type: 'umd'
    },
    clean: true,
    path: path.resolve(__dirname, 'dist/@supersonic-good-morning-mfe')
  }
};