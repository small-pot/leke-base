import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import configure from "../../packages/rc/components/configure";
import http from './http';
import classNames from 'classnames';
import RouterView from './RouterView';
import LeftTab from "./LeftTab";
import './index.less';

configure({http});

function getHash() {
    return window.location.hash.replace(/^#/,'');
}

function App(){
    const [hash,setHash]=useState(getHash());
    useEffect(()=>{
        function hashChange(){
            setHash(getHash());
        }
        window.addEventListener('hashchange',hashChange);
        return ()=>{
            window.removeEventListener('hashchange',hashChange);
        };
    },[setHash]);
    const [type,name]=hash.split('/');
    return(
        <>
            <div className='header'>
                <div className='logo'>
                </div>
                <div className='nav'>
                    <a href="#rc" className={classNames(type==='rc'?'current':'')}>组件</a>
                    <a href="#hooks" className={classNames(type==='hooks'?'current':'')}>hooks</a>
                    <a href="#icons" className={classNames(type==='icons'?'current':'')}>icons</a>
                    <a href="#ssr" className={classNames(type==='ssr'?'current':'')}>SSR脚手架</a>
                    <a href="#store" className={classNames(type==='store'?'current':'')}>store</a>
                </div>
            </div>
            <div className='main'>
                <LeftTab type={type} name={name} />
                <RouterView type={type} name={name} />
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