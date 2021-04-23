import React, { Children, ReactElement, CSSProperties, useRef, useEffect } from "react";
import Trigger from "../Trigger";
import { setPopupPosition } from "./util";

export interface childPropsType {
    ref?:React.RefObject<HTMLElement>|React.RefCallback<HTMLElement>,
    tabIndex?:number,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
}
export interface dropdownPropsType {
    popup: ReactElement | string,
    children: React.ReactElement<HTMLElement>,
    color?: string,
    visible?: boolean,
    popupClassName?: string,
    defaultVisible?: boolean;
    popupStyle?: CSSProperties,
    arrowPointAtCenter?: boolean
    onVisibleChange?: (boolean) => void,
    eventType?: Array<'focus'|'hover'|'click'>,
    getPopupContainer?: (HTMLElement) => HTMLElement,
    placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'leftCenter' | 'leftTop' | 'leftBottom' | 'rightCenter' | 'rightTop' | 'rightBottom',
}
export default function Tooltip(props: dropdownPropsType) {
    const { color, popup, placement, children, arrowPointAtCenter = false} = props;
    const arrowPoint = useRef<HTMLDivElement>(null);
    const colorArray = ['white', 'green', 'red', 'orange', 'purple', 'yellow', 'blue', 'geekblue', 'purple', 'magenta', 'volcano', 'gold', 'lime', 'polargreen'];
    const isColorType = colorArray.includes(color) ? true : false;
    const triggerRef=useRef<HTMLElement>(null);
    const child=Children.only(children);
    const modifyProps={
        ref:arrowPoint,
        className: 'leke-modifyStyle'
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
    const TooltipContent = () => {
        const popupRef: {current: any} = useRef();
        useEffect(() => {
            if(arrowPointAtCenter && popupRef.current){
                const popup = popupRef.current;
                const trigger = triggerRef.current;
                setPopupPosition(popup, trigger, placement);
            }
        }, [popupRef]);
        return (
            <div ref={popupRef} className={`leke-tooltip-container`} >
                <div {...modifyProps}>
                    <span className={`leke-modifyStyle-content`}
                        style={{ background: color && !isColorType ? color : ''}}></span>
                </div>
                <div className={`leke-contentStyle`}
                    style={{ background: color && !isColorType ? color : '' }}>
                    {typeof popup === 'string' ? <span className={`leke-contentSpanSty`}>{popup}</span> : popup}
                </div>
            </div>
        );
    };
    
    return (
        <>
            <Trigger
                {...props}
                popup={<TooltipContent />}
                popupClassName={`leke-popup-shadowRewrite${color && isColorType ? ' leke-popup-' + color : ''}`}
            >
                {React.cloneElement(child,cloneProps)}
            </Trigger>
        </>
    );
}