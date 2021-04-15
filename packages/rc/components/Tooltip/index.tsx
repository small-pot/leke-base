import React, { Children, ReactElement, CSSProperties, useRef, useEffect } from "react";
import Trigger from "../Trigger";
import { setPopupPosition } from "./util";

export interface tooltipPropsType {
    popup: ReactElement,
    defaultVisible?: boolean;
    visible?: boolean,
    onVisibleChange?: (boolean) => void,
    children: React.ReactElement<HTMLElement>,
    event?: ('focus' | 'hover')[],
    popupStyle?: CSSProperties,
    popupClassName?: string,
    getPopupContainer?: (HTMLElement) => HTMLElement,
    arrowPointAtCenter?: boolean;
}
export interface childPropsType {
    ref?:React.RefObject<HTMLElement>|React.RefCallback<HTMLElement>,
    tabIndex?:number,
    onMouseEnter?:(e)=>void,
    onMouseLeave?:(e)=>void,
}
export interface dropdownPropsType extends Omit<tooltipPropsType, keyof 'autoFill' | 'placement'> {
    placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'leftCenter' | 'leftTop' | 'leftBottom' | 'rightCenter' | 'rightTop' | 'rightBottom',
    fontColor?: string,
    color?: string,
}
export default function Tooltip(props: dropdownPropsType) {
    const { color = '', popup, placement = "topCenter", children, arrowPointAtCenter = false} = props;
    const arrowPoint = useRef<HTMLDivElement>(null);
    const colorArray = ['white', 'cyan', 'red', 'orange', 'purple', 'yellow'];
    const isColorType = colorArray.indexOf(color) !== -1 ? true : false;
    const triggerRef=useRef<HTMLElement>(null);
    const child=Children.only(children);
    const modifyProps={
        ref:arrowPoint,
        className: 'modifyStyle'
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
            <div ref={popupRef} className="tooltip-container" >
                <div {...modifyProps}>
                    <span className="modifyStyle-content" 
                        style={{ background: color && !isColorType ? color : ''}}></span>
                </div>
                <div className={`contentStyle arrowCenter-contentStyle`}
                    style={{ background: color && !isColorType ? color : '' }}>
                    {typeof popup === 'string' ? <span className="contentSpanSty">{popup}</span> : popup}
                </div>
            </div>
        );
    };
    console.log(props);
    
    return (
        <>
            <Trigger
                {...props}
                popupClassName={`leke-popup-shadowRewrite  ${color && isColorType ? 'leke-popup-' + color : ''}`}
                popup={<TooltipContent />}
            >
                {React.cloneElement(child,cloneProps)}
            </Trigger>
        </>
    );
}