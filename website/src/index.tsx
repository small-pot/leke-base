import React, {useEffect, useMemo, useState} from 'react';
import ReactDOM from 'react-dom';
import {componentRoutes,hookRoutes} from "./routes";
import './index.less';
import MarkdownView from "./MarkdownView";
import configure from "../../packages/rc/components/configure";
import http,{extend} from './http';
import classNames from 'classnames';
import IconList from "./IconList";

configure({http});


function App(){
    const [mds,setMds]=useState([]);
    const [icons,setIcons]=useState<object>({});

    useEffect(()=>{
        function hashChange(){
            const [type,key]=window.location.hash.replace(/^#/,'').split('/');
            if(type==='component'){
                if(!key){
                    import('../../packages/rc/index.md').then(res=>{
                        setMds([res]);
                    });
                }else if(key==='icons'){
                    Promise.all([
                        import('@leke/icons'),
                        import('@leke/icons/index.md')
                    ]).then(([icons,md])=>{
                        setIcons(icons);
                        setMds([md]);
                    });
                }else {
                    import(`../../packages/rc/components/${key}/demos/index.ts`).then(res=>{
                        extend(res.mock);
                        setMds(res.default);
                    });
                }
            }else if(type==='hooks'){
                if(!key){
                    import('../../packages/hooks/index.md').then(res=>{
                        setMds([res]);
                    });
                }else {
                    import(`../../packages/hooks/src/${key}/demos/index.ts`).then(res=>{
                        extend(res.mock);
                        setMds(res.default);
                    });
                }
            }
        }
        if(!window.location.hash){
            window.location.href='#component';
        }
        hashChange();
        window.addEventListener('hashchange',hashChange);
        return ()=>{
            window.removeEventListener('hashchange',hashChange);
        };
    },[setMds,setIcons]);
    const [type,key]=window.location.hash.replace(/^#/,'').split('/');
    const routes=useMemo(()=>{
        return type==='component'?componentRoutes:hookRoutes;
    },[type]);
    return(
        <>
            <div className='header'>
                <div className='logo'>
                </div>
                <div className='nav'>
                    <a href="#component" className={classNames(type==='component'?'current':'')}>组件</a>
                    <a href="#hooks" className={classNames(type==='hooks'?'current':'')}>hooks</a>
                </div>
            </div>
            <div className='main'>
                <ul className='left-tab'>
                    <li className={classNames('tab-item',!key?'current':'')}>
                        <a href={'#'+type}>安装与配置</a>
                    </li>
                    {routes.map(item=>(
                        <li key={item.title} className='tab-group'>
                            <span className='group-title'>{item.title}</span>
                            <ul className='tab-list'>
                                {item.keys.map(name=>(
                                    <li key={name} className={classNames('tab-item',name===key?'current':'')}>
                                        <a href={`#${type}/${name}`}>{name}</a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <div className='router-container'>
                    {mds.map((item,index)=><MarkdownView key={index} source={item.source} JSXComponent={item.default} />)}
                    {key==='icons'&& icons? <IconList icons={icons}/>:null}
                </div>
            </div>
        </>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);
if(module.hot){
    module.hot.accept();
}