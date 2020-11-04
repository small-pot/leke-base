import React, {useCallback, useState} from 'react';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsx, javascript } from "react-syntax-highlighter/dist/esm/languages/prism";
import './index.less';
import ReactMarkdown from "react-markdown";
import {Down} from "@leke/icons";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);

interface propTypes {
    source:string,
    JSXComponent?:React.FC
}

export default function ({source,JSXComponent}:propTypes) {
    const codeBlock=React.useCallback(({value,language}:{value:string,language:string})=>{
        const [showCode,setShowCode]=useState(false);
        const click=useCallback(()=>{
            setShowCode(bool=>!bool);
        },[setShowCode]);
        if(language==='jsx'&&JSXComponent){
            return(
                <div className='jsx-block'>
                    <div className='component-box'><JSXComponent /></div>
                    <div className='code-btn-group'>
                        <span onClick={click} className='show-code-btn'>
                            code
                            <Down
                                className='icon-down'
                                style={{transform:`rotate(${showCode?180:0}deg)`}}
                            />
                        </span>
                    </div>
                    {showCode?<div className='code-highlighter'>
                        <SyntaxHighlighter language={language} style={cb}>
                            {value}
                        </SyntaxHighlighter>
                    </div>:null}
                </div>
            );
        }
        return(
            <SyntaxHighlighter language={language} style={cb}>
                {value}
            </SyntaxHighlighter>
        );
    },[JSXComponent]);
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