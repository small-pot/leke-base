import {useRef, RefObject, useLayoutEffect, useEffect} from "react";
import classNames from 'classnames';
import omit from 'omit.js';
interface useAnimationProps{
    ref:RefObject<HTMLElement>,
    type?:'transition'|'animation',
    open:boolean,
    enter?:string,
    entering?:string,
    entered?:string,
    exit?:string,
    exiting?:string,
    exited?:string
    onEnter?:()=>void,
    onEntering?:()=>void,
    onEntered?:()=>void,
    onExit?:()=>void,
    onExiting?:()=>void,
    onExited?:()=>void,
}
function getAnimationEventName(type='animation') {
    const el=document.body;
    if(el.style[type]!==undefined){
        return type+'end';
    }
    const webkitName='webkit'+type.replace(/^[a-z]/,($0)=>$0.toUpperCase());
    if(el.style[webkitName]!==undefined){
        return webkitName+'End';
    }
    return type+'end';
}
export default function useAnimation(params:useAnimationProps) {
    const {
        ref,
        open,
    }=params;
    const classNameRef=useRef(null);
    const omitRef=useRef(null);
    omitRef.current=omit(params,['ref','open']);
    useLayoutEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        if(classNameRef.current===null){
            classNameRef.current=el.className||'';
        }
        const {enter,exit,onEnter,onExit}=omitRef.current;
        if(open){
            el.className=classNames(classNameRef.current,enter);
            typeof onEnter==='function'&&onEnter();
        }else{
            el.className=classNames(classNameRef.current,exit);
            typeof onExit==='function'&&onExit();
        }
    },[open,ref,omitRef]);
    useEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        const {entering,entered,exiting,exited,onEntering,onEntered,onExiting,onExited,type}=omitRef.current;
        if(open){
            if(entering){
                el.className=classNames(classNameRef.current,entering);
            }
            typeof onEntering==='function'&&onEntering();
        }else{
            if(exiting){
                el.className=classNames(classNameRef.current,exiting);
            }
            typeof onExiting==='function'&&onExiting();
        }
        const eventName=getAnimationEventName(type);
        function eventCallback(){
            if(open){
                el.className=classNames(classNameRef.current,entered);
                typeof onEntered==='function'&&onEntered();
            }else{
                el.className=classNames(classNameRef.current,exited);
                typeof onExited==='function'&&onExited(el);
            }
            el.removeEventListener(eventName,eventCallback);
        }
        el.addEventListener(eventName,eventCallback);
    },[open,ref,omitRef]);
}