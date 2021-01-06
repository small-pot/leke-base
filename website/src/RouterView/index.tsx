import React from "react";
import {useResolve} from '@leke/hooks';
import DemosNav from "./DemosNav";
import MarkdownView from "../MarkdownView";
import IconList from "./IconList";
import {extend} from "../http";
import './index.less';

function getMds(type,name) {
    if(!name){
        return import(`../../../packages/${type}/index.md`).then(res=>[res]);
    }
    if(type==='rc'){
        return import(`../../../packages/rc/components/${name}/demos/index`).then(res=>{
            extend(res.mock);
            return res.default;
        });
    }
    if(type==='hooks'){
        return import(`../../../packages/hooks/src/${name}/demos/index`).then(res=>res.default);
    }
    if(type==='AV'){
        return import(`../../../packages/AV/src/${name}/demos/index`).then(res=>res.default);
    }
}
export default function View ({type,name}) {
    const {data,loading}=useResolve<any[]>(getMds,[type,name]);
    const haveNav=(type==='rc'||type==='hooks')&&name;
    return (
        <div className='router-container' style={{paddingRight:haveNav?'220px':''}}>
            {haveNav&&!loading?<DemosNav mds={data}/>:null}
            {data?
                <div className='markdown-list'>
                    {data.map((item,index)=><MarkdownView key={index} {...item}  />)}
                </div>:null
            }
            {type==='icons'?<IconList />:null}
        </div>
    );
}