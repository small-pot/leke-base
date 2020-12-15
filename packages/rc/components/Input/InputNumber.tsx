import React from 'react';
import classNames from "classnames";
import { omit,getPrecision } from './utils';
import { SizeType } from "./interface";
import {Down} from "@leke/icons";
interface InputNumberProps{
  className?:string,
  defaultValue?:number,
  disabled?:boolean,
  max?:number,
  min?:number,
  size?:SizeType,
  step?:number,
  value?:number | '',
  onBlur?:()=>void,
  onChange?:(val:string)=>void,
  onFocus?:()=>void,
  parser?:(val:string)=>string,
  formatter?:(val:string)=>string
}


const baseCls = 'leke-input-number';

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;

const defaultParser = (str:string)=>{
    return str.replace(/[^\w.-]+/g, '');
};

const InputNumber:React.FC<InputNumberProps> = (props) => {
    const {
        className,
        disabled,
        defaultValue,
        max:maxValue,
        min:minValue,
        step,
        size,
        value,
        onBlur,
        onFocus,
        onChange,
        formatter,
        parser
    } = props;

    const [focus, setFocus] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(()=>defaultValue?String(defaultValue):'');
    const displayInputValue = React.useMemo(() => {
        let formatValue = inputValue;
        if (formatter) {
            formatValue = formatter(formatValue);
        }
        return formatValue;
    },[inputValue,formatter]);
    const maxPrecision = React.useMemo(() => {
        return Math.max(
            getPrecision(+value),
            getPrecision(step),
            getPrecision(maxValue),
            getPrecision(minValue),
            getPrecision(+inputValue));
    }, [value,step, minValue, maxValue,inputValue]);

    React.useEffect(() => {
        // if (value!==undefined||value!==null) {
        //     setInputValue(String(value));
        // }
    }, [value]);

    const getInputClassName:()=>string = () => {
        const inputClassName = classNames(className,{
            [`${baseCls}-sm`]:size==="small",
            [`${baseCls}-lg`]:size==="large",
            [`${baseCls}-disabled`]:disabled,
            [`${baseCls}-focus`]:focus
        });
        return inputClassName;
    };

    const onInputNumberFocus:React.FocusEventHandler = (e) => {
        setFocus(true);
        onFocus&&onFocus();
    };
    const onInputNumberBlur:React.FocusEventHandler = (e) => {
        setFocus(false);
        onBlur&&onBlur();
        // 失焦时修正 input 值
        handleValueChange(inputValue,true);
    };

    const onStepClk:(type:string)=>React.MouseEventHandler =(type)=> (e) => {
        let _inputValue = Number.parseFloat(inputValue);
        if (type==='up') {
            // 当数字框为空时，用一个合适的值作为初始值
            if (inputValue === '') return handleValueChange(String(Math.max(minValue,0)),true);
            if (+inputValue>=maxValue) return;
            _inputValue = +inputValue+step;
        }else if(type==='down'){
            if (inputValue === '') return handleValueChange(String(Math.min(maxValue,100)),true);
            if (+inputValue<=minValue) return;
            _inputValue = +inputValue-step;
        }
        handleValueChange(Number(_inputValue).toFixed(maxPrecision));
    };

    const onInputChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        handleValueChange(parser(e.target.value));
    };

    const handleValueChange:(value:string,strict?:boolean)=>void = (value,strict=false) => {
        let result = value;
        if (strict) {
            result = getValidateValue(value);
        }
        setInputValue(pre=>{
            if (pre!==result) onChange&&onChange(result);
            return result;
        });
    };

    const getValidateValue:(value:any,min?:number,max?:number)=>string = (value,min=minValue,max=maxValue) => {
        const validValue = Number.parseFloat(value);
        if (Number.isNaN(validValue)) return '';
        if(validValue<min) return String(min);
        if(validValue>max) return String(max);
        return String(validValue);
    };

    return(
        <div className={classNames(`${baseCls}`,getInputClassName())}>
            <div className={`${baseCls}-handle-wrap`}>
                <span 
                    className={classNames(`${baseCls}-handle-up`,{
                        [`${baseCls}-handle-up-disabled`]:+inputValue>=maxValue && inputValue!==''
                    })}
                    onClick={onStepClk('up')}>
                    {/* TODO 替换图标 */}
                    <Down />
                </span>
                <span
                    className={classNames(`${baseCls}-handle-down`,{
                        [`${baseCls}-handle-down-disabled`]:+inputValue<=minValue && inputValue!==''
                    })}
                    onClick={onStepClk('down')}>
                    {/* TODO 替换图标 */}
                    <Down />
                </span>
            </div>
            <input
                {...omit(props,['className','placeholder','defaultValue','formatter','type','value','onBlur','onChange','onFocus','parser'])}
                className='input-number'
                type='text'
                value={displayInputValue}
                onChange={onInputChange}
                onFocus={onInputNumberFocus}
                onBlur={onInputNumberBlur}
            />
        </div>
    );
};
InputNumber.defaultProps={
    step:1.238,
    // defaultValue:'',
    max:MAX_SAFE_INTEGER,
    min:-MAX_SAFE_INTEGER,
    parser:defaultParser,
    formatter:(val)=>`& ${val}`,
    onChange:(val)=>{console.log('onchange',val);}
};

export default InputNumber;
