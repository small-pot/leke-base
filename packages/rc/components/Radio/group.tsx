import * as React from 'react';
import classNames from 'classnames';
import Radio from './radio';
import { RadioGroupProps, RadioChangeEvent, RadioGroupButtonStyle } from './interface';
import { RadioGroupContextProvider } from './context';
import { useControl } from "@leke/hooks";

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {

    const [value, setValue] = useControl(props.value,'',props.defaultValue);

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
            className = '',
            options,
            optionType,
            buttonStyle,
            disabled,
            children,
            size,
            style,
            id,
            onMouseEnter,
            onMouseLeave,
        } = props;
        const mergedSize = size || 'middle';
        const groupPrefixCls = prefixCls || 'leke-group';
        let childrenToRender = children;
        if (options && options.length > 0) {
            const optionsPrefixCls = optionType === 'button' ? `${groupPrefixCls}-button` : groupPrefixCls;
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
        const classString = classNames(
            groupPrefixCls,
            `${groupPrefixCls}-${buttonStyle}`,
            {
                [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
            },
            className,
        );
        return (
            <div
                className={classString}
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