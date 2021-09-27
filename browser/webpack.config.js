'use strict';

const [resolve, VueLoader, CleanWP, ExtractTextWP, UglifyjsWP] = [
    require('path').resolve,
    require('vue-loader/lib/plugin'),
    require('clean-webpack-plugin'),
    require('extract-text-webpack-plugin'),
    require('uglifyjs-webpack-plugin')
];

const prod = /^production$/i.test(process.env.NODE_ENV);

const conf = module.exports = {
    entry: {
        'work-stream': './src/app.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        publicPath: 'dist',
        filename: '[name].js'
    },
    devtool: prod ? false : 'source-map',
    devServer: { historyApiFallback: { index: './index.html' } },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: ['babel-loader'],
                exclude: /node_modules/i
            },
            {
                test: /\.vue$/i,
                loader: ['vue-loader']
            },
            {
                test: /\.css$/i,
                loader: prod ? ExtractTextWP.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                }) : ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/i,
                loader: prod ? ExtractTextWP.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader', 'less-loader']
                }) : ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(?:png|gif|svg|ico|jp(?:e?g|e))$/i,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: prod ? '/resource' : '',
                            name: '[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(?:eot|ttf|woff2?)$/i,
                loader: ['url-loader']
            }
        ]
    },
    plugins: [new VueLoader()]
};

if(prod) {
    conf.plugins.push(
        new CleanWP(['./dist']),
        new ExtractTextWP('work-stream.css')
    );
    conf.optimization = {
        minimizer: [
            new UglifyjsWP({
                sourceMap: false,
                test: /\.js$/i
            })
        ]
    };
}