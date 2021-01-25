import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";

export interface OptionListPropsType<T=any> {
    options:T[],
    listHeight:number,
    itemHeight:number,
    renderItem:(item:T,index:number)=>React.ReactNode
}
const OptionList=forwardRef(function (props:OptionListPropsType,ref) {
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
    useImperativeHandle(ref,()=>{
        return {
            scrollToIndex(index){
                const scrollBar=scrollBarRef.current
                if(scrollBar){
                    const maxScrollTop=totalHeight-listHeight
                    const oldScrollTop=scrollBar.scrollTop
                    const newScrollTop=Math.min(maxScrollTop,index*itemHeight)
                    function inView(top) {
                        return top>=oldScrollTop && top<=oldScrollTop+listHeight
                    }
                    if(!inView(newScrollTop) || !inView(newScrollTop+itemHeight)){
                        scrollBar.scrollTop=newScrollTop
                    }
                }
            }
        }
    },[haveScrollBar,itemHeight,listHeight,scrollBarRef])

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
        <div ref={containerRef}  className='leke-option-container'>
            <div className='leke-option-list' style={{maxHeight:listHeight}}>
                {options.slice(start,end).map((item,index)=>renderItem(item,start+index))}
            </div>
            {haveScrollBar?
                <div ref={scrollBarRef} onScroll={scroll} className='leke-option-scrollBar' style={{maxHeight:listHeight,overflow:"auto"}}>
                    <div style={{height:totalHeight}}></div>
                </div>:null
            }
        </div>
    );
})
OptionList.defaultProps={
    itemHeight:32,
    listHeight:256
};
export default OptionList