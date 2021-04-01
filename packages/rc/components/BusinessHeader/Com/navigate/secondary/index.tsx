import React, { Component } from 'react';
import config from './config';
import './index.module.less';

interface Props{
    roleId?:number;
    title?:string;
}
class Secondary extends Component<Props>{
    constructor(props){
        super(props);
    }

    mapList = () =>{
        const { roleId, title } = this.props;
        const list = config[roleId];
        return list.map((item, index)=>{
            return (
                <a className={`item ${title === item.title ? 'active' : ''}`}
                    href = { item.url }
                    key = { index }
                >
                    { item.title }
                </a>
            );
        });
    }

    render(){
        const module = (
            <div className="secondary" id='secondary'>
                { this.mapList() }
            </div>
        );

        return module;
    }
}

export default Secondary;