/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-03-02 16:58:46
 * @LastEditTime: 2021-03-03 19:26:08
 */
import React,{useState,useRef} from 'react';
import classNames from 'classnames';
import Input from './Input';
import {omit} from './utils';
import {Button,Select} from '@leke/rc';
import {Search as SearchIcon} from '@leke/icons';

interface SearchProps{
  size: 'middle' | 'large',
  enterButton:React.ReactNode,
  onSearch:(value)=>void,
}


const baseCls = 'leke-input-search';
const Search:React.FC<SearchProps> = (props) => {
    const {size,onSearch,enterButton} = props;
    const inputValueRef = useRef<string>('');
    let searchButton;
    if (enterButton) {
        if (typeof enterButton ==='string') {
            searchButton =  (
                <Button 
                    className="search-button"
                    onClick={()=>{
                        onSearch&&onSearch(inputValueRef.current);
                    }}
                    type="main"
                    size={size}
                >{enterButton}</Button>
            );
        }else{
            searchButton =  (
                <Button 
                    className="search-button"
                    onClick={()=>{
                        onSearch&&onSearch(inputValueRef.current);
                    }}
                    type="main"
                    size={size}
                    icon={enterButton}
                />
            );
        }
        
    }else{
        searchButton =  (
            <Button 
                className="search-button"
                onClick={()=>{
                    onSearch&&onSearch(inputValueRef.current);
                }}
                type="main"
                size={size}
                icon={<SearchIcon/>}
            />
        );
    }


    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        inputValueRef.current = e.target.value;
    };

    const onCustomSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(inputValueRef.current);
        }
    };

    const options=[
        {label:'1-1',value:'1-1'},
        {label:'1-2',value:'1-2'},
        {label:'1-3',value:'1-3'},
    ];

    return (
        <div className={classNames(baseCls)}>
            <Input 
                {...omit(props,['className','size','addonAfter','onChange','onSearch','onPressEnter','enterButton'])}
                className="search-input" 
                size={size}
                addonAfter={searchButton}
                onChange={onChange}
                onPressEnter={onCustomSearch}
            />
        </div>
    );
};
Search.defaultProps={
    size:'middle',
    // enterButton:'搜索'
};

export default Search;
