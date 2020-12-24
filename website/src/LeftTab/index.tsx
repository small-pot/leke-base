import React from 'react';
import classNames from 'classnames';
import {componentRoutes,hookRoutes} from "../routes";
import './index.less';


export default function LeftTab({type,name}){
    const routes=type==='rc'?componentRoutes:type==='hooks'?hookRoutes:null;
    if(!routes){
        return null;
    }
    return (
        <div className='left-container'>
            <ul className='left-tab'>
                <span className='group-title'>开发指南</span>
                <li className={classNames('tab-item',!name?'current':'')}>
                    <a href={'#'+type}>安装与配置</a>
                </li>
                {routes.map(item=>(
                    <li key={item.title} className='tab-group'>
                        <span className='group-title'>{item.title}</span>
                        <ul className='tab-list'>
                            {item.routes.map((route:{key:string,title?:string})=>(
                                <li key={route.key} className={classNames('tab-item',route.key===name?'current':'')}>
                                    <a href={`#${type}/${route.key}`}>
                                        <span>{route.key}</span>
                                        {route.title?<span className='tab-item-name'>{route.title}</span>:null}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
