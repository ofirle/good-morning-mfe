const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require("compression-webpack-plugin");
const pkg = require('./package.json');

const artifactName = pkg.name.replace('/', '-');
module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx')
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@ant/design/icons/lib/dist$': path.resolve(__dirname, './src/antd-icons.js'),
    }
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
    "antd": "antd",
    "moment": "moment"
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      include: [path.resolve(__dirname, "src")],
      exclude: [
        '/node_modules/',
        '/dist/'
      ]
    }, {
      test: /\.svg$/,
      use: [
        {
          loader: "react-svg-loader"
        }
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
    }],
  },
  plugins: [
    new CompressionPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "package.json", to: "package.json" }
      ],
    }),
    // new BundleAnalyzerPlugin()
  ],
  output: {
    filename: 'index.js',
    library: {
      name: "MicroAppSeedMFE",
      type: "umd"
    },
    clean: true,
    path: path.resolve(__dirname, `dist/${artifactName}`)
  }
};