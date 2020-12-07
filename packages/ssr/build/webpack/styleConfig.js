const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const isProduction=process.env.NODE_ENV==='production';
const {cssModules,modifyVars,postcssConfig,browsers}=require('../resolveConfig');
const postcssPresetEnv=require('postcss-preset-env');

const modulesOption={
    modules:{
        localIdentName: '[local]_[hash:base64:5]',
        auto:/^((?!node_modules).)+$/
    }
};
const config={
    postcssOptions: {
        plugins: [
            postcssPresetEnv({browsers,autoprefixer:{}})
        ],
    }
};
if(typeof postcssConfig==='function'){
    postcssConfig(config);
}
const postcss={loader:'postcss-loader',options:config};
const webCSSConfig=[
    {
        loader: MiniCssExtractPlugin.loader,
        options:{hmr:!isProduction,reloadAll:true}
    },
    {
        loader: 'css-loader',
        options: Object.assign({},cssModules?modulesOption:null)
    },
    postcss
];
const webStyleConfig = [
    {
        test: /\.css$/,
        use: webCSSConfig
    },
    {
        test: /\.less$/,
        use: [
            ...webCSSConfig,
            {
                loader: "less-loader",
                options: {
                    modifyVars,
                    javascriptEnabled: true
                }
            }
        ]
    }
];
const nodeCssConfig=[
    {
        loader: 'css-loader',
        options: {...modulesOption,onlyLocals: true}
    }
];
const nodeStyleConfig = [
    {
        test: /\.css$/,
        use: nodeCssConfig
    },
    {
        test: /\.less$/,
        use: [
            ...nodeCssConfig,
            {
                loader: "less-loader",
                options: {
                    javascriptEnabled: true
                }
            }
        ]
    }
];
module.exports={
    webStyleConfig,
    nodeStyleConfig
};
