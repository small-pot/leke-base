import React from "react";
import {useResolve} from '@leke/hooks';
import DemosNav from "./DemosNav";
import MarkdownView from "../MarkdownView";
import IconList from "./IconList";
import './index.less';

function getMds(type,name) {
    if(!name){
        return import(`../../../packages/${type}/index.md`).then(res=>[res]);
    }
    if(type==='rc'){
        return import(`../../../packages/rc/components/${name}/demos/index`).then(res=>res.default);
    }
    return import(`../../../packages/hooks/src/${name}/demos/index`).then(res=>res.default);
}
export default function View ({type,name}) {
    const {data,loading}=useResolve<any[]>(getMds,[type,name]);

    return (
        <div className='router-container'>
            {!loading&&(type==='rc'||type==='hooks')?<DemosNav mds={data}/>:null}
            {data?
                <div className='markdown-list'>
                    {data.map((item,index)=><MarkdownView key={index} {...item}  />)}
                </div>:null
            }
            {type==='icons'?<IconList />:null}
        </div>
    );
}