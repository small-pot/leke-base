/* eslint-disable react-hooks/rules-of-hooks */
import {useRef, RefObject, useLayoutEffect} from "react";
import classNames from 'classnames';
interface useAnimationProps{
    ref:RefObject<HTMLElement>,
    open:boolean,
    enterClassName?:string,
    afterEnterClassName?:string,
    leaveClassName?:string,
    afterLeaveClassName?:string,
    onEnd?:(visible:boolean,el:HTMLElement)=>void
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
        enterClassName,
        afterEnterClassName,
        leaveClassName,
        afterLeaveClassName,
        onEnd
    }=params;
    const classNameRef=useRef(null);
    const noDepProps={enterClassName,leaveClassName,afterEnterClassName,afterLeaveClassName,onEnd};
    const propsRef=useRef(noDepProps);
    propsRef.current=noDepProps;
    useLayoutEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        const {enterClassName,leaveClassName,afterEnterClassName,afterLeaveClassName,onEnd}=propsRef.current;
        if(classNameRef.current===null){
            classNameRef.current=el.className||'';
        }
        el.className=classNames(classNameRef.current,open?enterClassName:leaveClassName);
        const eventName=getAnimationEventName();
        function eventCallback(){
            el.className=classNames(classNameRef.current,open?afterEnterClassName:afterLeaveClassName);
            typeof onEnd==='function'&&onEnd(open,el);
            el.removeEventListener(eventName,eventCallback);
        }
        el.addEventListener(eventName,eventCallback);
    },[open,ref]);
}