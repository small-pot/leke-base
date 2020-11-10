const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const isProduction=process.env.NODE_ENV==='production';
const {cssModules,modifyVars,postcssConfig,browsers}=require('../resolveConfig');

const modulesOption={
    modules:{
        localIdentName: '[local]_[hash:base64:5]',
        auto:/^((?!node_modules).)+$/
    }
};
const postcss={loader:'postcss-loader',options:postcssConfig||{
    postcssOptions: {
        plugins: [
            [
                'postcss-preset-env',
                {
                    browsers,
                    autoprefixer:{grid: true}
                }
            ],
        ],
    }
}};
const clientCSSConfig=[
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
const clientStyleConfig = [
    {
        test: /\.css$/,
        use: clientCSSConfig
    },
    {
        test: /\.less$/,
        use: [
            ...clientCSSConfig,
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
const severCssConfig=[
    {
        loader: 'css-loader',
        options: {...modulesOption,onlyLocals: true}
    }
];
const serverStyleConfig = [
    {
        test: /\.css$/,
        use: severCssConfig
    },
    {
        test: /\.less$/,
        use: [
            ...severCssConfig,
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
    clientStyleConfig,
    serverStyleConfig
};
