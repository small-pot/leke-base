const babel=require('@babel/core');
const config=require('../babel.config');

module.exports=function (source) {
    let code=`
        export const source = ${JSON.stringify(source)}
    `;
    const jsxMatch=source.match(/(?<=```jsx)([\s\S]*?)(?=```)/g);
    if(jsxMatch){
        code+=jsxMatch.join('\n');
    }
    return babel.transformSync(code,config).code;
};