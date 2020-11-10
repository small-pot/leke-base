const {clientStyleConfig, serverStyleConfig} = require('./styleConfig');
const getBabelConfig = require("../babel");
//const exclude = /node_modules(\/|\\)(?!@leke\/ssr)/
const exclude = /node_modules/;
const isProd = process.env.NODE_ENV === 'production';
const name = isProd ? 'img/[name]_[hash].[ext]' : 'img/[name].[ext]';
module.exports = function (env = 'client') {
    const rules = [
        {
            test: /\.(png|jpe?g|gif|svg|mp3)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                name,
                emitFile: env === 'client'
            }
        },
        {
            test: /\.tsx?$/,
            use: [
                {
                    loader: "babel-loader",
                    options: getBabelConfig(env, true)
                },

            ],
            exclude
        },
        {
            test: /\.(js|jsx)$/,
            use: [
                {
                    loader: "babel-loader",
                    options: getBabelConfig(env, false)
                },
            ],
            exclude
        }
    ];
    return rules.concat(env === 'client' ? clientStyleConfig : serverStyleConfig);
};