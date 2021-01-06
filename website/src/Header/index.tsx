import React, { useMemo, useRef, useState} from 'react';
import classNames from 'classnames';
import {componentRoutes,hookRoutes} from "../routes";
import Select from "@leke/rc/components/Select";
import "@leke/rc/components/Select/index.less";
import './index.less';

function filter(opt,text) {
    return opt.key.toLowerCase().indexOf(text)>-1||(opt.title&&opt.title.indexOf(text)>-1);
}
export default function Header({type}){
    const [visible,setVisible]=useState(false);
    const ref=useRef<HTMLDivElement>(null);
    const options=useMemo(()=>{
        const list=type==='rc'?componentRoutes:type==='hooks'?hookRoutes:[];
        return list.reduce((result,opt)=>{
            result.push(...opt.routes);
            return result;
        },[]);
    },[type]);
    function onSearch(content) {
        if(content){
            !visible&&setVisible(true);
        }else{
            visible&&setVisible(false);
        }
    }
    return(
        <div className='header' ref={ref}>
            <div className='header-inner'>
                <div className='header-left'>
                    <div className='logo'></div>
                    {options.length?
                        <Select
                            showSearch
                            icon={null}
                            visible={visible}
                            onSearch={onSearch}
                            className='header-search'
                            options={options}
                            filter={filter}
                            placeholder={type==='rc'?'搜索组件...':'搜索hooks...'}
                            getPopupContainer={()=>ref.current}
                            renderOption={
                                (item)=>(
                                    <a href={`#${type}/${item.key}`}>
                                        <span>{item.key}</span>
                                        <span style={{marginLeft:6}}>{item.title}</span>
                                    </a>
                                )
                            }
                            fieldNames={{
                                label:'title',
                                value:'key'
                            }}
                        />
                        :null}
                </div>
                <div className='nav'>
                    <a href="#rc" className={classNames(type==='rc'?'current':'')}>组件</a>
                    <a href="#hooks" className={classNames(type==='hooks'?'current':'')}>hooks</a>
                    <a href="#icons" className={classNames(type==='icons'?'current':'')}>icons</a>
                    <a href="#ssr" className={classNames(type==='ssr'?'current':'')}>SSR脚手架</a>
                    <a href="#store" className={classNames(type==='store'?'current':'')}>store</a>
                </div>
            </div>
        </div>
    );
}
