const babel=require('@babel/core');

module.exports={
    process(source,filename){
        const jsxCode=source.match(/(?<=```jsx)([\s\S]*?)(?=```)/g).join('\n');
        return babel.transformSync(jsxCode,{
            filename,
            "presets": [
                ["@babel/preset-env",{targets:{node:'current'}}],
                "@babel/preset-react"
            ]
        }).code;
    }
};