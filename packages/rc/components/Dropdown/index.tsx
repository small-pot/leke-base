import React, {ReactNode, CSSProperties, useLayoutEffect, useRef, useEffect} from 'react';
import {createPortal} from 'react-dom';
import classNames from 'classnames';
import {useAnimation,useControl} from '@leke/hooks';

function getPosition(trigger:HTMLElement,container:HTMLElement) {
    let left=0,top=0;
    let offsetElement=trigger;
    while (offsetElement!==container){
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
export default function Dropdown(props:dropdownProps) {
    const {trigger,triggerClassName,triggerStyle,getPopupContainer,popup,popupClassName,popupStyle,placement,triggeredEvent}=props;
    const [visible,setVisible]=useControl(props.visible,props.onVisibleChange);
    const portalContainerRef=useRef<HTMLElement>(null);
    const popupRef=useRef(null);
    const triggerRef=useRef(null);
    if(visible&&!portalContainerRef.current&&typeof window==='object'){
        portalContainerRef.current=getPopupContainer(triggerRef.current);
    }
    const enterClassName=placement.indexOf('bottom')===0?'leke-slide-down':'leke-slide-up';
    const leaveClassName=placement.indexOf('bottom')===0?'leke-slide-up':'leke-slide-down';
    useAnimation({
        ref:popupRef,
        open:visible,
        enterClassName,
        leaveClassName,
        afterLeaveClassName:'leke-hide'
    });
    useLayoutEffect(()=>{
        if(!visible){
            return;
        }
        const portalContainer=portalContainerRef.current;
        if(portalContainer){
            const triggerElement=triggerRef.current;
            const container=popupRef.current;
            if(portalContainer!==document.body&&window.getComputedStyle(portalContainer).position==='static'){
                portalContainer.style.position='relative';
            }
            const {left,top,bottom,right}=getPosition(triggerElement,portalContainer);
            const containerHeight=container.offsetHeight;
            switch (placement) {
            case "bottomLeft":
                container.style.top = bottom + 'px';
                container.style.bottom='';
                container.style.left = left + 'px';
                container.style.right='';
                break;
            case "bottomRight":
                container.style.top = bottom + 'px';
                container.style.bottom='';
                container.style.left='';
                container.style.right=portalContainer.offsetWidth-right+'px';
                break;
            case "bottomCenter":
                container.style.top = bottom + 'px';
                container.style.bottom='';
                container.style.left = (triggerElement.offsetWidth-container.offsetWidth)/2+left + 'px';
                container.style.right='';
                break;
            case "topLeft":
                container.style.top = top  - containerHeight + 'px';
                container.style.bottom='';
                container.style.left = left + 'px';
                container.style.right='';
                break;
            case "topRight":
                container.style.top = top  - containerHeight + 'px';
                container.style.bottom='';
                container.style.left='';
                container.style.right=portalContainer.offsetWidth-right+'px';
                break;
            case "topCenter":
                container.style.top = top  - containerHeight + 'px';
                container.style.bottom='';
                container.style.left = (triggerElement.offsetWidth-container.offsetWidth)/2+left + 'px';
                container.style.right='';
                break;
            }
        }
    },[triggerRef,portalContainerRef,popupRef,visible,placement]);
    function show() {
        if(popupRef.current&&popupRef.current.className.indexOf(leaveClassName)!==-1){
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
        className:classNames('leke-dropdown',popupClassName),
        style:popupStyle
    };
    if(triggeredEvent.indexOf('focus')!==-1){
        triggerProps.onFocus=show;
        triggerProps.onBlur=hide;
        triggerProps.tabIndex=-1;
        popupProps.onMouseDown=(e)=>e.preventDefault();
    }
    if(triggeredEvent.indexOf('hover')!==-1){
        triggerProps.onMouseEnter=show;
        triggerProps.onMouseLeave=hide;
    }
    return (
        <span {...triggerProps}>
            {trigger}
            {portalContainerRef.current?createPortal(
                <div style={{position:'absolute',top:0,left:0,width:'100%'}}>
                    <div {...popupProps}>{popup}</div>
                </div>,
                portalContainerRef.current
            ):null}
        </span>
    );
}
Dropdown.defaultProps={
    getPopupContainer:()=>document.body,
    placement:'bottomLeft',
    triggeredEvent:['focus']
};