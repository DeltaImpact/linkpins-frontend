var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // build: {
    //     assetsPublicPath: '/',
    //     assetsSubDirectory: 'src/static'
    // },

    devtool: 'eval-source-map',

    entry: './src/index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: newFunction(),
                exclude: /node_modules/,
                loader: 'file-loader?name=img/[path][name].[ext]&context=./assets'
                // loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({
            filename: "style.css",
            allChunks: true
        }),
        new CopyWebpackPlugin([ 
            {from:'src/static/images',to:'images'}, 
            {from:'src/static/styles',to:'styles'}, 
            {from:'src/static/css',to:'css'}, 
            {from:'src/static/js',to:'js'}, 
         ]),
    ],
    devServer: {
        historyApiFallback: true,
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://localhost:5001',
        })
    }
}

function newFunction() {
    return /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/;
}
