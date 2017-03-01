const webpack = require('webpack');
const path = require('path');

const files = {
    js: {
        dev: {
            'public-dev/js/modules/board/select-opponent': "./resources/ts/modules/board/select-opponent/Main.ts"
        },
        dist: {
            'public/js/modules/board/select-opponent': "./resources/ts/modules/board/select-opponent/Main.ts"
        }
    }
};

module.exports = [
    {
        entry: files.js.dev,
        output: {
            filename: '[name].js',
            path: './'
        },
        resolve: {
            root: path.resolve('./resources/assets/ts/core'),
            extensions: ['', '.ts']
        },
        module: {
            loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                {test: /\.tsx?$/, loader: 'ts-loader'}
            ]
        }
    },
    {
        entry: files.js.dist,
        output: {
            filename: '[name].js',
            path: './'
        },
        resolve: {
            root: path.resolve('./resources/assets/ts/core'),
            extensions: ['', '.ts']
        },
        module: {
            loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
                // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                {test: /\.tsx?$/, loader: 'ts-loader'}
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    }

];