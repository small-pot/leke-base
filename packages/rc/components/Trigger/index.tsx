import React, {
    CSSProperties,
    useLayoutEffect,
    useRef,
    useReducer, useImperativeHandle
} from 'react';
import classNames from 'classnames';
import {useAnimation,useControl} from '@leke/hooks';
import {setPopupPosition,placementType} from './util';
import Popup from './Popup';

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
    eventType?:Array<'focus'|'hover'>,
    popup:React.ReactNode,
    popupStyle?:CSSProperties,
    popupClassName?:string,
    getPopupContainer?:(HTMLElement)=>HTMLElement,
    placement?:placementType,
    autoSize?:boolean,
    disabled?:boolean
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
export interface refType {
    resetPosition:()=>void,
    blur:()=>void
}
function elementBlur(el) {
    const activeElement=document.activeElement as HTMLElement;
    if(contains(el,activeElement)){
        activeElement.blur();
    }
}
const Trigger=React.forwardRef<refType,triggerPropsType>(function (props,ref) {
    const {children,eventType,popup,popupStyle,popupClassName,getPopupContainer,placement,autoSize,disabled}=props;
    const [visible,setVisible]=useControl(props.visible,props.onVisibleChange,false);
    const triggerRef=useRef<HTMLElement>(null);
    const popupRef=useRef<HTMLDivElement>(null);
    const [portalContainer,setPortalContainer]=useReducer(()=>getPopupContainer(triggerRef.current),null);
    const child=React.Children.only(children);
    const childProps:childPropsType=child.props;
    const includeFocus=eventType.indexOf('focus')!==-1;
    const includeHover=eventType.indexOf('hover')!==-1;

    useImperativeHandle(ref,()=>{
        return {
            resetPosition(){
                if(popupRef.current&&triggerRef.current&&portalContainer){
                    setPopupPosition(popupRef.current,triggerRef.current,portalContainer,placement);
                }
            },
            blur(){
                if(includeFocus){
                    elementBlur(triggerRef.current);
                }
            }
        };
    },[triggerRef,popupRef,portalContainer,includeFocus,placement]);
    const popupProps:popupPropsType={
        ref:popupRef,
        style:popupStyle,
        className:classNames('leke-popup',`leke-popup-${placement}`,visible?'leke-popup-open':'',popupClassName)
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
    if(!disabled){
        if(includeFocus){
            cloneProps.onFocus=(e)=>{
                !visible&&setVisible(true);
                childProps.onFocus?.(e);
            };
            cloneProps.onBlur=(e)=>{
                visible&&setVisible(false);
                if(e.target===document.activeElement){
                    e.target.blur();
                }
                childProps.onBlur?.(e);
            };
            cloneProps.tabIndex=-1;
            popupProps.onMouseDown=mousedown;
        }
        if(includeHover){
            cloneProps.onMouseEnter=(e)=>{
                !visible&&setVisible(true);
                childProps.onMouseEnter?.(e);
            };
            cloneProps.onMouseLeave=(e)=>{
                visible&&setVisible(false);
                childProps.onMouseLeave?.(e);
            };
            popupProps.onMouseEnter=(e)=>{
                setVisible(true);
            };
            popupProps.onMouseLeave=(e)=>{
                setVisible(false);
            };
        }
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
            {portalContainer?
                <Popup portalContainer={portalContainer} visible={visible}>
                    <div {...popupProps}>{popup}</div>
                </Popup>
                :null}
        </>
    );
});
Trigger.defaultProps={
    placement:'bottomLeft',
    getPopupContainer:()=>document.body,
    eventType:['hover']
};
export default Trigger;