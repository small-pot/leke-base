import React, {
    ReactNode,
    CSSProperties,
    useLayoutEffect,
    useRef,
    useReducer
} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames';
import {useAnimation,useControl} from '@leke/hooks';

function getPosition(trigger:HTMLElement,container:HTMLElement) {
    let left=0,top=0;
    let offsetElement=trigger;
    while (offsetElement&&offsetElement!==container){
        left+=offsetElement.offsetLeft;
        top+=offsetElement.offsetTop;
        offsetElement=offsetElement.offsetParent as HTMLElement;
    }
    return {
        left,
        top,
        bottom:top+trigger.offsetHeight,
        right:left+trigger.offsetWidth
    };
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
export interface dropdownProps {
    visible?:boolean,
    onVisibleChange?:(boolean)=>void,
    getPopupContainer:(HTMLElement)=>HTMLElement,
    trigger:ReactNode,
    triggerStyle?:CSSProperties,
    triggerClassName?:string,
    popup:ReactNode,
    popupStyle?:CSSProperties,
    popupClassName?:string,
    placement:'bottomLeft'|'bottomCenter'|'bottomRight'|'topLeft'|'topCenter'|'topRight',
    triggeredEvent:('focus'|'hover')[]
}
export interface childProps {
    ref:React.RefObject<HTMLDivElement>
    tabIndex?:number,
    className:string,
    style?:CSSProperties,
    onFocus?:(e)=>void,
    onMouseDown?:(e)=>void,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
    onBlur?:(e)=>void
}
const enter='leke-slide-open';
const exit='leke-slide-close';
function mousedown(e) {
    e.preventDefault();
}
export default function Dropdown(props:dropdownProps) {
    const {trigger,triggerClassName,triggerStyle,getPopupContainer,popup,popupClassName,popupStyle,placement,triggeredEvent}=props;
    const [visible,setVisible]=useControl(props.visible,props.onVisibleChange);
    const popupRef=useRef(null);
    const triggerRef=useRef(null);
    const [portalContainer,setPortalContainer]=useReducer(()=>getPopupContainer(triggerRef.current),null);
    const toBottom=placement.indexOf('bottom')===0;
    useAnimation({
        ref:popupRef,
        open:portalContainer?visible:false,
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
        const triggerElement=triggerRef.current;
        const container=popupRef.current;
        if(portalContainer!==document.body&&window.getComputedStyle(portalContainer).position==='static'){
            portalContainer.style.position='relative';
        }
        const {left,top,bottom}=getPosition(triggerElement,portalContainer);
        switch (placement) {
        case "bottomLeft":
            container.style.top = bottom + 'px';
            container.style.left = left + 'px';
            break;
        case "bottomRight":
            container.style.top = bottom + 'px';
            container.style.left=left+triggerElement.offsetWidth-container.offsetWidth + 'px';
            break;
        case "bottomCenter":
            container.style.top = bottom + 'px';
            container.style.left = (triggerElement.offsetWidth-container.offsetWidth)/2+left + 'px';
            break;
        case "topLeft":
            container.style.top = top  - container.offsetHeight + 'px';
            container.style.left = left + 'px';
            break;
        case "topRight":
            container.style.top = top  - container.offsetHeight + 'px';
            container.style.left=left+triggerElement.offsetWidth-container.offsetWidth + 'px';
            break;
        case "topCenter":
            container.style.top = top  - container.offsetHeight + 'px';
            container.style.left = (triggerElement.offsetWidth-container.offsetWidth)/2+left + 'px';
            break;
        }
    },[triggerRef,popupRef,visible,placement,portalContainer,setPortalContainer]);
    function show() {
        if(popupRef.current&&popupRef.current.className.indexOf(exit)!==-1){
            return;
        }
        setVisible(true);
    }
    function hide() {
        setVisible(false);
    }
    const triggerProps:childProps={
        ref:triggerRef,
        className:classNames('leke-trigger',triggerClassName),
        style:triggerStyle
    };
    const popupProps:childProps={
        ref:popupRef,
        className:classNames('leke-dropdown',toBottom?'leke-dropdown-direction-down':'leke-dropdown-direction-up',popupClassName),
        style:Object.assign({minWidth:triggerRef.current?triggerRef.current.offsetWidth:null},popupStyle)
    };
    if(triggeredEvent.indexOf('focus')!==-1){
        triggerProps.onFocus=show;
        triggerProps.onBlur=()=>{
            const activeElement=document.activeElement as HTMLElement;
            if(contains(triggerRef.current,activeElement)){
                activeElement.blur();
            }
            hide();
        };
        triggerProps.tabIndex=-1;
        popupProps.onMouseDown=mousedown;
    }
    if(triggeredEvent.indexOf('hover')!==-1){
        triggerProps.onMouseEnter=show;
        triggerProps.onMouseLeave=hide;
    }
    return (
        <span {...triggerProps}>
            {trigger}
            {portalContainer?createPortal(
                <div style={{position:'absolute',top:0,left:0,width:'100%'}}>
                    <div {...popupProps}>{popup}</div>
                </div>,
                portalContainer
            ):null}
        </span>
    );
}
Dropdown.defaultProps={
    getPopupContainer:()=>document.body,
    placement:'bottomLeft',
    triggeredEvent:['focus']
};