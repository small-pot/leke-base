/* eslint-disable react-hooks/rules-of-hooks */
import {useRef, RefObject, useLayoutEffect} from "react";
import setClassName from 'classnames';
interface useAnimationProps{
    ref:RefObject<HTMLElement>,
    open:boolean,
    classNames:{
        enter?:string,
        enterEnd?:string,
        leave?:string,
        leaveEnd?:string
    },
    onEnterEnd?:(el:HTMLElement)=>void,
    onLeaveEnd?:(el:HTMLElement)=>void,
}
function getAnimationEventName() {
    const el=document.body;
    if(el.style['animation']!==undefined){
        return 'animationend';
    }
    if(el.style['webkitAnimation']!==undefined){
        return 'webkitAnimationEnd';
    }
    return 'animationend';
}
export default function useAnimation(params:useAnimationProps) {
    if(typeof window==='undefined') return;
    const {
        ref,
        open,
        classNames,
        onEnterEnd,
        onLeaveEnd
    }=params;
    const classNameRef=useRef(null);
    const noDepProps={classNames,onEnterEnd,onLeaveEnd};
    const propsRef=useRef(noDepProps);
    propsRef.current=noDepProps;
    useLayoutEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        const {classNames:{enter,enterEnd,leave,leaveEnd},onEnterEnd,onLeaveEnd}=propsRef.current;
        if(classNameRef.current===null){
            classNameRef.current=el.className||'';
        }
        el.className=setClassName(classNameRef.current,open?enter:leave);
        const eventName=getAnimationEventName();
        function eventCallback(){
            if(open){
                el.className=setClassName(classNameRef.current,enterEnd);
                typeof onEnterEnd==='function'&&onEnterEnd(el);
            }else{
                el.className=setClassName(classNameRef.current,leaveEnd);
                typeof onLeaveEnd==='function'&&onLeaveEnd(el);
            }
            el.removeEventListener(eventName,eventCallback);
        }
        el.addEventListener(eventName,eventCallback);
    },[open,ref]);
}