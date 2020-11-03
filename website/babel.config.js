module.exports = {
    presets: [
        "@babel/preset-env",
        //"@babel/preset-typescript",
        "@babel/preset-react"
    ],
    plugins: [
        ["import", {
            libraryName: "@leke/rc",
            libraryDirectory: "components",
            camel2DashComponentName: false,
            style(name) {
                return `${name}/index.less`;
            }
        }]
    ]
};