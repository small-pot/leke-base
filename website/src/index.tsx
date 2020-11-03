import React, { useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {routes} from "./Router/config";
import './index.less';
import MarkdownView from "./MarkdownView";
import configure from "../../packages/rc/components/configure";
import http,{extend} from './http';
import classNames from 'classnames';
import IconList from "./IconList";

configure({http});

const keys=routes.reduce((result,item)=>{
    result.push(...item.keys);
    return result;
},[]);

function App(){
    const [mds,setMds]=useState([]);
    const [icons,setIcons]=useState<any>();
    const keyRef=useRef('');
    useEffect(()=>{
        function hashChange(){
            const key=window.location.hash.replace(/^#/,'');
            if(!key||key==='introduce'){
                import('../../packages/rc/introduce.md').then(res=>{
                    keyRef.current='introduce';
                    setMds([res]);
                });
            }else if(key==='icons'){
                Promise.all([
                    import('@leke/icons'),
                    import('@leke/icons/index.md')
                ]).then(([icons,md])=>{
                    keyRef.current=key;
                    setIcons(icons);
                    setMds([md]);
                });
            }else if(keys.includes(key)){
                import(`../../packages/rc/components/${key}/demos/index.ts`).then(res=>{
                    extend(res.mock);
                    keyRef.current=key;
                    setMds(res.default);
                });
            }
        }
        hashChange();
        window.addEventListener('hashchange',hashChange);
        return ()=>{
            window.removeEventListener('hashchange',hashChange);
        };
    },[setMds,setIcons]);
    return(
        <div className='main'>
            <ul className='left-tab'>
                <li className={classNames('tab-item',keyRef.current==='introduce'?'current':'')}>
                    <a href='#introduce'>安装与配置</a>
                </li>
                {routes.map(item=>(
                    <li key={item.title} className='tab-group'>
                        <span className='group-title'>{item.title}</span>
                        <ul className='tab-list'>
                            {item.keys.map(key=>(
                                <li key={key} className={classNames('tab-item',keyRef.current===key?'current':'')}>
                                    <a href={'#'+key}>{key}</a>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <div className='router-container'>
                {mds.map((item,index)=><MarkdownView key={index} source={item.source} JSXComponent={item.default} />)}
                {keyRef.current==='icons'? <IconList icons={icons}/>:null}
            </div>
        </div>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);
if(module.hot){
    module.hot.accept();
}