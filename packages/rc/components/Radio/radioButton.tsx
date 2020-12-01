import * as React from 'react';
import Radio from './radio';
import { RadioChangeEvent } from './interface';
import { AbstractCheckboxProps } from './interface';

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;

const RadioButton = (props: RadioButtonProps, ref: React.Ref<any>) => {


  return <Radio {...props}  />;
};
Radio.defaultProps = {
    type: 'radio',
};

export default React.forwardRef(RadioButton);
