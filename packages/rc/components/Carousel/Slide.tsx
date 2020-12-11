import React, {useCallback, useMemo, useRef} from 'react';
import classNames from 'classnames';

interface SlideProps{
    children:React.ReactElement<HTMLElement>[],
    currentIndex:number,
    direction:'left'|'right'|'up'|'down',
    className:string
}
export default function Slide({children,currentIndex,direction,className}:SlideProps) {
    const dataRef=useRef({oldIndex:currentIndex,height:0,});

    const property=useMemo(()=>{
        return (direction==='up'||direction==='down')?'height':'width';
    },[direction]);

    const modifyChildren=useMemo(()=>{
        return React.Children.map(children,(child,index)=>{
            return React.cloneElement(child,{
                style:Object.assign({},child.props.style,{width:'100%',height:'100%',[property]:100/children.length+'%'}),
                key:index,
                className:classNames(
                    'leke-carousel-item',
                    child.props.className
                )});
        });
    },[children,property]);
    const length=modifyChildren.length;

    const wrapStyle:React.CSSProperties=useMemo(()=>{
        let left=null;
        let top=null;
        const {height}=dataRef.current;
        switch (direction) {
        case "up":
            top=-currentIndex*height;
            break;
        case "down":
            top=currentIndex*height;
            break;
        case "left":
            left=-currentIndex*100+'%';
            break;
        case "right":
            left=currentIndex*100+'%';
            break;
        }
        return {
            [property]:(length*100)+'%',
            left,
            top
        };
    },[currentIndex,length,direction,property,dataRef]);

    dataRef.current.oldIndex=currentIndex;
    const refCallback=useCallback((node)=>{
        if(node){
            dataRef.current.height=node.clientHeight/length;
        }
    },[length]);
    return <div ref={refCallback} className={classNames("leke-carousel-wrap",className)} style={wrapStyle}>{modifyChildren}</div>;
}