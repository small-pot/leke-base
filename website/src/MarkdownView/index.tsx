import React, {useCallback,useState} from 'react';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsx, javascript,css } from "react-syntax-highlighter/dist/esm/languages/prism";
import './index.less';
import ReactMarkdown from "react-markdown";
import {Down} from "@leke/icons";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);

interface propTypes {
    source:string,
    JSXComponent?:React.FC,
    css?:string
}
function JSXCoder({value,css}) {
    const [showCode,setShowCode]=useState(false);
    return(
        <div className='jsx-code-block'>
            <div className='code-btn-group' style={{borderBottom:showCode?'0':''}}>
                <span onClick={()=>setShowCode(bool=>!bool)} className='show-code-btn'>
                    code
                    <Down
                        className='icon-down'
                        style={{transform:`rotate(${showCode?180:0}deg)`}}
                    />
                </span>
            </div>
            {showCode?<div className='code-highlighter'>
                <SyntaxHighlighter language={'jsx'} style={coy}>
                    {value}
                </SyntaxHighlighter>
                {css?<SyntaxHighlighter language={'css'} style={coy}>
                    {css}
                </SyntaxHighlighter>:null}
            </div>:null}
        </div>
    );
}
export default function ({source,JSXComponent,css}:propTypes) {
    const codeBlock=useCallback(({value,language}:{value:string,language:string})=>{
        if(language==='jsx'&&JSXComponent){
            return(
                <div className='jsx-block'>
                    <style dangerouslySetInnerHTML={{__html:css}}/>
                    <div className='demo'><JSXComponent /></div>
                    <JSXCoder css={css} value={value}/>
                </div>
            );
        }
        return(
            <SyntaxHighlighter language={language} style={coy}>
                {value}
            </SyntaxHighlighter>
        );
    },[JSXComponent,css]);
    return (
        <ReactMarkdown
            source={source}
            escapeHtml={false}
            renderers={{
                code:codeBlock
            }}
        />
    );
}