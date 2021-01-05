import React, { useLayoutEffect, useMemo, useRef, useState} from "react";
import Dropdown,{dropdownPropsType} from "../Dropdown";
import OptionList from './OptionList';
import classNames from 'classnames';
import {DownFill,Close} from '@leke/icons';
import {useControl} from "@leke/hooks";

type valueType= Array<number|string> | string | number
export interface selectPropsType<T=any> extends Omit<dropdownPropsType, 'popup'|'children'|'eventType'>{
    defaultValue?:valueType,
    value?:valueType,
    placeholder?:string,
    multiple?:boolean,
    options:T[],
    fieldNames?:{
        label?:string,
        value?:string,
        disabled?:string
    },
    renderOption?:(item:T,searchContent:string)=>React.ReactNode,
    listHeight?:number,
    itemHeight?:number,
    onChange?:(v:valueType,opt:any)=>void,
    style?:React.CSSProperties,
    className?:string,
    showSearch?:boolean,
    onSearch?:(v:string)=>void,
    filter?:(opt:T,v:string)=>void,
    empty?:React.ReactNode,
    icon?:React.ReactNode,
    disabled?:boolean
}
const defaultFieldNames={
    label:'label',
    value:'value',
    disabled:'disabled'
};
function toArray(v) {
    return Array.isArray(v)?v:v!==undefined?[v]:[];
}

const eventType:Array<'focus'>=['focus'];
export default function Select(props:selectPropsType) {
    const {
        placeholder,
        multiple,
        options,
        fieldNames,
        renderOption,
        listHeight,
        itemHeight,
        style,
        className,
        popupStyle,
        popupClassName,
        getPopupContainer,
        onSearch,
        showSearch,
        filter,
        empty,
        icon,
        disabled
    }=props;
    const triggerRef=useRef(null);
    const inputRef=useRef<HTMLInputElement>(null);
    const selectorRef=useRef<HTMLDivElement>(null);
    const selectedOptionsRef=useRef([]);
    const [searchContent,setSearchContent]=useState('');
    const [visible,setVisible]=useControl(props.visible,props.onVisibleChange,false);
    const [value,onChange]=useControl<valueType>(props.value,props.onChange,props.defaultValue);
    const {label,value:valueKey,disabled:disabledKey}=Object.assign({},defaultFieldNames,fieldNames);
    const values=toArray(value);
    const list=useMemo(()=>{
        return options.filter(opt=>{
            return typeof filter==='function'?filter(opt,searchContent):opt[label].indexOf(searchContent)>-1;
        });
    },[options,searchContent,filter,label]);

    if(value!==undefined){
        selectedOptionsRef.current.splice(0,values.length);
        values.forEach((v,index)=>{
            const opt=selectedOptionsRef.current[index];
            if(!opt||v!==opt[valueKey]){
                selectedOptionsRef.current[index]=options.find(o=>o[valueKey]===v);
            }
        });
    }else{
        selectedOptionsRef.current=[];
    }
    useLayoutEffect(()=>{
        triggerRef.current.resetPosition();
    },[value,searchContent,triggerRef]);

    function handle(item) {
        if(multiple){
            const newValues=[...values];
            const index=newValues.indexOf(item[valueKey]);
            if(index!==-1){
                newValues.splice(index,1);
                selectedOptionsRef.current.splice(index,1);
            }else{
                newValues.push(item[valueKey]);
                selectedOptionsRef.current.push(item);
            }
            onChange(newValues,selectedOptionsRef.current);
            searchChange('');
        }else if(item[valueKey]!==value){
            selectedOptionsRef.current=[item];
            onChange(item[valueKey],item);
            triggerRef.current.blur();
        }
    }
    function renderItem(item) {
        const selected=value===item[valueKey]||(Array.isArray(value)&&value.indexOf(item[valueKey])!==-1);
        return (
            <div
                className={classNames('leke-option',selected?'leke-option-selected':'',item[disabledKey]?'leke-option-disabled':'')}
                key={item[valueKey]}
                onClick={()=>{
                    if(item[disabledKey]){
                        return;
                    }
                    handle(item);
                }}
            >
                {typeof renderOption==='function'?renderOption(item,searchContent):item[label]}
            </div>
        );
    }
    function renderSelector() {
        const selectedOptions=selectedOptionsRef.current;
        if(multiple&&selectedOptions.length){
            return selectedOptions.map(item=>{
                return (
                    <span className='leke-select-tag' key={item[valueKey]}>
                        <span className='leke-select-tag-text'>{item[label]}</span>
                        <Close
                            className='leke-icon-close'
                            onMouseDown={e=>e.preventDefault()}
                            onClick={()=>handle(item)}
                        />
                    </span>
                );
            });
        }
        if(searchContent){
            return null;
        }
        if(selectedOptions.length===1){
            const item=selectedOptions[0];
            return <div key={item[valueKey]} className='leke-select-text'>{item[label]}</div>;
        }
        return <div className='leke-select-placeholder'>{placeholder}</div>;
    }
    function searchChange(val) {
        onSearch&&onSearch(val);
        setSearchContent(val);
    }
    function onFocus() {
        if(!inputRef.current){
            return;
        }
        if(document.activeElement!==inputRef.current){
            inputRef.current.focus();
        }
        const searchBox:HTMLDivElement=selectorRef.current.querySelector('.leke-select-search-content');
        searchBox.style.maxWidth=selectorRef.current.offsetWidth+'px';
    }

    return(
        <Dropdown
            ref={triggerRef}
            placement='bottomLeft'
            eventType={eventType}
            popupStyle={popupStyle}
            getPopupContainer={getPopupContainer}
            visible={visible}
            onVisibleChange={setVisible}
            disabled={disabled}
            popupClassName={classNames('leke-select-popup',popupClassName)}
            popup={
                list.length?<OptionList
                    options={list}
                    renderItem={renderItem}
                    listHeight={listHeight}
                    itemHeight={itemHeight}
                />:empty
            }
        >
            <div
                className={classNames('leke-select',visible?'leke-select-open':'',disabled?'leke-select-disabled':'',className)}
                style={style}
                onFocus={onFocus}
                onBlur={()=>searchChange('')}
            >
                <div className='leke-select-flex'>
                    <div ref={selectorRef} className='leke-select-selector' style={{marginLeft:values.length&&multiple?4:''}}>
                        {renderSelector()}
                        {showSearch&&!disabled?<div className='leke-select-search'>
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchContent}
                                onChange={(e)=>searchChange(e.target.value)}
                            />
                            <div className='leke-select-search-content'>{searchContent}</div>
                        </div>:null}
                    </div>
                    {icon===undefined?<DownFill className='leke-icon-down'/>:icon}
                </div>
            </div>
        </Dropdown>
    );
}
Select.defaultProps={
    listHeight:256,
    itemHeight:32,
    empty:<div className='leke-select-empty'>暂无数据</div>
};