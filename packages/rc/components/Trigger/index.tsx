import React, {
    CSSProperties,
    useLayoutEffect,
    useRef,
    useReducer, useMemo, ReactElement
} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames';
import {useAnimation,useControl} from '@leke/hooks';
import {setPopupPosition,placementType} from './util';

export interface childPropsType {
    ref?:React.RefObject<HTMLElement>|React.RefCallback<HTMLElement>,
    tabIndex?:number,
    onFocus?:(e)=>void,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
    onBlur?:(e)=>void
}
export interface popupPropsType {
    ref:React.RefObject<HTMLDivElement>,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
    onMouseDown?:(e)=>void,
    className:string,
    style?:CSSProperties
}
export interface triggerPropsType {
    visible?:boolean,
    onVisibleChange?:(boolean)=>void,
    children:React.ReactElement<HTMLElement>,
    event?:('focus'|'hover')[],
    popup:ReactElement,
    popupStyle?:CSSProperties,
    popupClassName?:string,
    getPopupContainer?:(HTMLElement)=>HTMLElement,
    placement:placementType,
    autoSize?:boolean
}
const enter='leke-open';
const exit='leke-close';
function mousedown(e) {
    e.preventDefault();
}
function contains (container:HTMLElement,target:HTMLElement){
    if(typeof container.contains==='function'){
        return container.contains(target);
    }
    while (target&&target!==document.body){
        if (target === container){
            return true;
        }
        target = target.parentElement;
    }
    return false;
}
export default function Trigger(props:triggerPropsType) {
    const {children,event,popup,popupStyle,popupClassName,getPopupContainer,placement,autoSize}=props;
    const [visible,setShow]=useControl(props.visible,props.onVisibleChange);
    const triggerRef=useRef<HTMLElement>(null);
    const popupRef=useRef<HTMLDivElement>(null);
    const [portalContainer,setPortalContainer]=useReducer(()=>getPopupContainer(triggerRef.current),null);
    const child=React.Children.only(children);
    const childProps:childPropsType=child.props;
    const setVisible=useMemo(()=>{
        let timer=null;
        let show;
        return (val)=>{
            if(timer){
                clearTimeout(timer);
                timer=null;
            }
            timer=setTimeout(()=>{
                if(show!==val){
                    show=val;
                    setShow(val);
                }
                timer=null;
            },50);
        };
    },[setShow]);
    const popupProps:popupPropsType={
        ref:popupRef,
        style:popupStyle,
        className:classNames('leke-popup',`leke-popup-${placement}`,popupClassName)
    };
    const cloneProps:childPropsType={
        ref(node){
            const childRef=(child as any).ref;
            if(typeof childRef==='function'){
                childRef(node);
            }else if(Object.prototype.toString.call(childRef)==='[object Object]'){
                childRef.current=node;
            }
            triggerRef.current=node;
        }
    };
    if(event.indexOf('focus')!==-1){
        cloneProps.onFocus=(e)=>{
            childProps.onFocus?.(e);
            setVisible(true);
        };
        cloneProps.onBlur=()=>{
            const activeElement=document.activeElement as HTMLElement;
            if(contains(triggerRef.current,activeElement)){
                activeElement.blur();
            }
            setVisible(false);
        };
        cloneProps.tabIndex=-1;
        popupProps.onMouseDown=mousedown;
    }
    if(event.indexOf('hover')!==-1){
        cloneProps.onMouseEnter=(e)=>{
            childProps.onMouseEnter?.(e);
            setVisible(true);
        };
        cloneProps.onMouseLeave=(e)=>{
            childProps.onMouseLeave?.(e);
            setVisible(false);
        };
        popupProps.onMouseEnter=(e)=>{
            setVisible(true);
        };
        popupProps.onMouseLeave=(e)=>{
            setVisible(false);
        };
    }
    useAnimation({
        ref:popupRef,
        open:portalContainer?visible:false,
        onEnter(){
            const {position}=window.getComputedStyle(portalContainer);
            if(portalContainer!==document.body&&(!position||position==='static')){
                portalContainer.style.position='relative';
            }
            if(autoSize){
                if(placement.indexOf('bottom')===0||placement.indexOf('top')===0){
                    popupRef.current.style.minWidth=triggerRef.current.offsetWidth+'px';
                }else{
                    popupRef.current.style.minHeight=triggerRef.current.offsetHeight+'px';
                }
            }
            setPopupPosition(popupRef.current,triggerRef.current,portalContainer,placement);
        },
        enter,
        exit,
        exited:'leke-hide'
    });
    useLayoutEffect(()=>{
        if(!visible){
            return;
        }
        if(!portalContainer){
            return setPortalContainer();
        }
    },[triggerRef,popupRef,visible,placement,portalContainer,setPortalContainer]);
    return(
        <>
            {React.cloneElement(child,cloneProps)}
            {portalContainer?createPortal(
                <div style={{position:'absolute',top:0,left:0,width:'100%'}}>
                    <div {...popupProps}>{popup}</div>
                </div>,
                portalContainer
            ):null}
        </>
    );
}
Trigger.defaultProps={
    placement:'bottomLeft',
    getPopupContainer:()=>document.body,
    event:['hover']
};