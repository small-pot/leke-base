const babel=require('@babel/core');
const config=require('../babel.config');

module.exports=function (source) {
    let code='';
    const cssMatch=source.match(/(?<=```css)([\s\S]*?)(?=```)/g);
    if(cssMatch){
        code+=`export const css = ${JSON.stringify(cssMatch.join('\n'))};\n`;
        source=source.replace(/```css([\s\S]*?)```/g,'');
    }
    code+=`export const source = ${JSON.stringify(source)};\n`;
    const jsxMatch=source.match(/(?<=```jsx)([\s\S]*?)(?=```)/g);
    if(jsxMatch){
        code+=jsxMatch.join('\n');
    }
    return babel.transformSync(code,config).code;
};