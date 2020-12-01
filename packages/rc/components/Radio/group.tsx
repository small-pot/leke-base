import * as React from 'react';
import Radio from './radio';
import { RadioGroupProps, RadioChangeEvent, RadioGroupButtonStyle } from './interface';
import { RadioGroupContextProvider } from './context';

function useControlledState (defaultStateValue,option) {
  const { value } = option;
  let val = value || defaultStateValue;
  function setValue(val){
    val = val;
  }
  return [ val, setValue]
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  
  const [value, setValue] = useControlledState(props.defaultValue, {
    value: props.value,
  });


  const onRadioChange = (ev: RadioChangeEvent) => {
    const lastValue = value;
    const val = ev.target.value;
    if (!('value' in props)) {
      setValue(val);
    }
    const { onChange } = props;
    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };

  const renderGroup = () => {
    const {
      prefixCls,
      options,
      optionType,
      disabled,
      children,
      style,
      id,
      onMouseEnter,
      onMouseLeave,
    } = props;
    let childrenToRender = children;
    if (options && options.length > 0) {
      const optionsPrefixCls = optionType === 'button' ? `${prefixCls}-button` : prefixCls;
      childrenToRender = options.map(option => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={option}
              prefixCls={optionsPrefixCls}
              disabled={disabled}
              value={option}
              checked={value === option}
            >
              {option}
            </Radio>
          );
        }
        // 此处类型自动推导为 { label: string value: string }
        return (
          <Radio
            key={`radio-group-value-options-${option.value}`}
            prefixCls={optionsPrefixCls}
            disabled={option.disabled || disabled}
            value={option.value}
            checked={value === option.value}
            style={option.style}
          >
            {option.label}
          </Radio>
        );
      });
    }
    return (
      <div
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id={id}
        ref={ref}
      >
        {childrenToRender}
      </div>
    );
  };

  return (
    <RadioGroupContextProvider
      value={{
        onChange: onRadioChange,
        value,
        disabled: props.disabled,
        name: props.name,
      }}
    >
      {renderGroup()}
  </RadioGroupContextProvider>
  );
});

RadioGroup.defaultProps = {
  buttonStyle: 'outline' as RadioGroupButtonStyle,
};

export default React.memo(RadioGroup);