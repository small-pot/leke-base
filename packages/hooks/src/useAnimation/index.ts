/* eslint-disable react-hooks/rules-of-hooks */
import {useRef,useEffect,useLayoutEffect,RefObject} from "react";
import classNames from 'classnames';
interface useAnimationProps {
    ref:RefObject<HTMLElement>,
    visible:boolean,
    timeout?:number,
    beforeEnterClass?:string,
    enterClass?:string,
    afterEnterClass?:string,
    beforeLeaveClass?:string,
    leaveClass?:string,
    afterLeaveClass?:string,
    onBeforeEnter?:(HTMLElement)=>void,
    onEnter?:(HTMLElement)=>void,
    onAfterEnter?:(HTMLElement)=>void,
    onBeforeLeave?:(HTMLElement)=>void,
    onLeave?:(HTMLElement)=>void,
    onAfterLeave?:(HTMLElement)=>void
}
export default function useAnimation(params:useAnimationProps) {
    if(typeof window==='undefined') return;
    const {
        ref,
        visible,
        timeout=200,
        beforeEnterClass,
        enterClass,
        afterEnterClass,
        beforeLeaveClass,
        leaveClass,
        afterLeaveClass,
        onBeforeEnter,
        onEnter,
        onAfterEnter,
        onBeforeLeave,
        onLeave,
        onAfterLeave
    }=params;
    const lifeCycle=useRef(null);
    const className=useRef(null);
    lifeCycle.current={
        timeout,
        beforeEnterClass,
        enterClass,
        afterEnterClass,
        beforeLeaveClass,
        leaveClass,
        afterLeaveClass,
        onBeforeEnter,
        onEnter,
        onAfterEnter,
        onBeforeLeave,
        onLeave,
        onAfterLeave
    };
    
    useLayoutEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        className.current=el.className||'';
    },[ref]);
    useLayoutEffect(()=>{
        const el=ref.current;
        if(!el){
            return;
        }
        if(className.current===null){
            className.current=el.className||'';
        }
        const {beforeEnterClass,onBeforeEnter,beforeLeaveClass,onBeforeLeave}=lifeCycle.current;
        if(visible){
            if(beforeEnterClass){
                el.className=classNames(className.current,beforeEnterClass);
            }
            if(typeof onBeforeEnter==='function'){
                onBeforeEnter(el);
            }
        }else{
            if(beforeLeaveClass){
                el.className=classNames(className.current,beforeLeaveClass);
            }
            if(typeof onBeforeLeave==='function'){
                onBeforeLeave(el);
            }
        }
    },[visible,ref]);
    useEffect(()=>{
        const el=ref.current;
        const {
            timeout,
            enterClass,
            onEnter,
            leaveClass,
            onLeave,
            afterEnterClass='',
            onAfterEnter,
            afterLeaveClass='',
            onAfterLeave
        }=lifeCycle.current;
        if(!el){
            return;
        }
        if(visible){
            if(enterClass){
                el.className=classNames(className.current,enterClass);
            }
            if(typeof onEnter==='function'){
                onEnter(el);
            }
            if(typeof onAfterEnter==='function' || afterEnterClass){
                setTimeout(()=>{
                    if(afterEnterClass){
                        el.className=classNames(className.current,afterEnterClass);
                    }
                    typeof onAfterEnter==='function'&&onAfterEnter(el);
                },timeout);
            }
        }else{
            if(leaveClass){
                el.className=classNames(className.current,leaveClass);
            }
            if(typeof onLeave==='function'){
                onLeave(el);
            }
            if(typeof onAfterLeave==='function' || afterLeaveClass){
                setTimeout(()=>{
                    el.className=classNames(className.current,afterLeaveClass);
                    typeof onAfterLeave==='function'&&onAfterLeave(el);
                },timeout);
            }
        }
    },[visible,ref]);
}