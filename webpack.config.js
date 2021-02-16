const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const path = require('path');

// keep it simple for now
module.exports = {
    target: 'web',
    entry: [
        'babel-polyfill', './src/Games/BubbleNinja/app.ts'
    ],
    output: {
        path: path.resolve(__dirname+ '/dist'),
        filename: 'app.js',
        publicPath: './dist/',
    },
    resolve: {
        modules: ['./app/', './node_modules/', './front-v2/'],
        extensions: [ '.tsx', '.ts', '.js' ]
        // alias: {
        //     '@': path.resolve(__dirname+ '/front-v2'),
        //     '~@': path.resolve(__dirname+ '/front-v2')
        // }
    },
    devServer: {
        contentBase: "./",
        historyApiFallback: true,
        noInfo: true,
        port: '8080',
        proxy: {
            '/secure**': {
                target: 'http://127.0.0.1:8002',
                changeOrigin: true,
                cookieDomainRewrite: "localhost",
                onProxyReq: (proxyReq) => {
                  if (proxyReq.getHeader("origin")) {
                    proxyReq.setHeader("origin", 'http://127.0.0.1:8002');
                  }
                },
            }
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    ],
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {useBuiltIns: "entry", targets: "> 0.25%, not dead"}]]
                }
            }
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            exclude: /node_modules/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false
                }
              },
            ],
          },
          {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
          },
        ]
    },
};

