import React, {useCallback, useMemo, useRef, useState} from "react";
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
    searchValue?:string,
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
        showSearch,
        filter,
        empty,
        icon,
        disabled
    }=props;
    const inputRef=useRef<HTMLInputElement>(null);
    const selectorRef=useRef<HTMLDivElement>(null);
    const optionListRef=useRef(null);
    const selectedOptionsRef=useRef([]);
    const [searchValue,setSearchValue]=useControl(props.searchValue,props.onSearch,'');
    const [visible,setVisible]=useControl(props.visible,props.onVisibleChange,false);
    const [value,onChange]=useControl<valueType>(props.value,props.onChange,props.defaultValue);
    const [activeIndex,setActiveIndex]=useState(-1);
    const {label,value:valueKey,disabled:disabledKey}=Object.assign({},defaultFieldNames,fieldNames);
    const values=toArray(value);
    const list=useMemo(()=>{
        return options.filter(opt=>{
            return typeof filter==='function'?filter(opt,searchValue):opt[label].indexOf(searchValue)>-1;
        });
    },[options,searchValue,filter,label]);

    if(value!==undefined){
        selectedOptionsRef.current.splice(0,values.length);
        values.forEach((v,index)=>{
            const opt=selectedOptionsRef.current[index];
            if(!opt||v!==opt[valueKey]){
                selectedOptionsRef.current[index]=options.find(o=>o[valueKey]===v)||{[valueKey]:v};
            }
        });
    }else{
        selectedOptionsRef.current=[];
    }

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
            setSearchValue('');
        }else if(item[valueKey]!==value){
            selectedOptionsRef.current=[item];
            onChange(item[valueKey],item);
            inputRef.current.blur();
        }else{
            inputRef.current.blur();
        }
    }
    function renderItem(item,index) {
        const selected=value===item[valueKey]||(Array.isArray(value)&&value.indexOf(item[valueKey])!==-1);
        const active=activeIndex===index;
        return (
            <div
                className={classNames('leke-option',active?'leke-option-active':'',selected?'leke-option-selected':'',item[disabledKey]?'leke-option-disabled':'')}
                key={item[valueKey]}
                onMouseEnter={()=>{
                    setActiveIndex(index);
                }}
                onClick={()=>{
                    if(item[disabledKey]){
                        return;
                    }
                    handle(item);
                }}
            >
                {typeof renderOption==='function'?renderOption(item,searchValue):item[label]}
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
        if(searchValue){
            return null;
        }
        if(selectedOptions.length===1){
            const item=selectedOptions[0];
            return <div key={item[valueKey]} className='leke-select-text'>{item[label]}</div>;
        }
        return <div className='leke-select-placeholder'>{placeholder}</div>;
    }

    const onVisibleChange=useCallback((show)=>{
        setVisible(show);
        if(!show){
            setSearchValue('');
        }
    },[setSearchValue,setVisible]);

    function onMouseDown(e) {
        e.preventDefault();
        if(!inputRef.current){
            return;
        }
        if(document.activeElement!==inputRef.current){
            inputRef.current.focus();
        }
        const searchBox:HTMLDivElement=selectorRef.current.querySelector('.leke-select-search-content');
        searchBox.style.maxWidth=selectorRef.current.offsetWidth+'px';
    }
    function onKeyDown(e) {
        if(!visible||!optionListRef.current || options.findIndex(item=>!item[disabledKey])===-1){
            return;
        }
        const keyCode=e.keyCode;
        const maxIndex=options.length-1;
        if(keyCode===38){
            e.preventDefault();
            const newIndex=(function () {
                let index=activeIndex;
                do{
                    index=index-1<0?maxIndex:index-1;
                } while (options[index][disabledKey]);
                return index;
            }());
            setActiveIndex(newIndex);
            optionListRef.current.scrollToIndex(newIndex);
        }else if(keyCode===40){
            e.preventDefault();
            const newIndex=(function () {
                let index=activeIndex;
                do{
                    index=index+1>maxIndex?0:index+1;
                } while (options[index][disabledKey]);
                return index;
            }());
            setActiveIndex(newIndex);
            optionListRef.current.scrollToIndex(newIndex);
        }else if(keyCode===13){
            const item=options[activeIndex];
            if(item){
                e.preventDefault();
                handle(item);
            }
        }
    }
    const readOnly=!showSearch||disabled;
    return(
        <Dropdown
            placement='bottomLeft'
            eventType={eventType}
            popupStyle={popupStyle}
            getPopupContainer={getPopupContainer}
            visible={visible}
            onVisibleChange={onVisibleChange}
            disabled={disabled}
            popupClassName={popupClassName}
            popup={
                list.length?<OptionList
                    ref={optionListRef}
                    options={list}
                    renderItem={renderItem}
                    listHeight={listHeight}
                    itemHeight={itemHeight}
                />:empty
            }
        >
            <div
                className={classNames('leke-select',multiple?'leke-select-multiple':'',visible?'leke-select-open':'',disabled?'leke-select-disabled':'',className)}
                style={style}
                onMouseDown={onMouseDown}
            >
                <div className='leke-select-flex'>
                    <div ref={selectorRef} className='leke-select-selector' style={{marginLeft:values.length&&multiple?4:''}}>
                        {renderSelector()}
                        <div className='leke-select-search'>
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchValue}
                                onChange={(e)=>setSearchValue(e.target.value)}
                                onKeyDown={onKeyDown}
                                readOnly={readOnly}
                                style={{opacity:readOnly?'0':''}}
                            />
                            <div className='leke-select-search-content'>{searchValue}</div>
                        </div>
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