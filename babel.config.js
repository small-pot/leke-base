const path=require('path');
module.exports = {
    presets: [
        ["@babel/preset-env",{targets:{node:'current'}}],
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    plugins: [
        path.resolve(__dirname,'./packages/ssr/build/babel/plugin-node-style.js')
    ]
};