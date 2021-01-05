import React, { useEffect, useRef, useState} from "react";

export interface OptionListPropsType<T=any> {
    options:T[],
    listHeight:number,
    itemHeight:number,
    renderItem:(item:T,index:number)=>React.ReactNode
}

export default function OptionList(props:OptionListPropsType) {
    const {options,listHeight,itemHeight,renderItem}=props;
    const [start,setStart]=useState(0);
    const scrollBarRef=useRef<HTMLDivElement>(null);
    const containerRef=useRef<HTMLDivElement>(null);
    const end=Math.min(start+Math.ceil(listHeight/itemHeight)+2,options.length);
    const totalHeight=itemHeight*options.length;
    const haveScrollBar=totalHeight>listHeight;
    function scroll(e){
        const start=Math.floor(e.target.scrollTop/itemHeight);
        setStart(start);
    }
    useEffect(()=>{
        if(haveScrollBar){
            function onWheel(e) {
                e.preventDefault();
                scrollBarRef.current.scrollTop=scrollBarRef.current.scrollTop+e.deltaY;
            }
            const container=containerRef.current;
            container.addEventListener('wheel',onWheel);
            return ()=>{
                container.removeEventListener('wheel',onWheel);
            };
        }
    },[scrollBarRef,containerRef,haveScrollBar]);
    return(
        <div ref={containerRef}  className='leke-option-container' style={{maxHeight:listHeight}}>
            <div className='leke-option-list'>
                {options.slice(start,end).map((item,index)=>renderItem(item,start+index))}
            </div>
            {haveScrollBar?
                <div ref={scrollBarRef} onScroll={scroll} className='leke-option-scrollBar' style={{maxHeight:listHeight,overflow:"auto"}}>
                    <div style={{height:totalHeight}}></div>
                </div>:null
            }
        </div>
    );
}
OptionList.defaultProps={
    itemHeight:32,
    listHeight:256
};