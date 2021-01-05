import React from "react";
import Trigger,{triggerPropsType,refType} from "../Trigger";
import classNames from 'classnames';

export interface dropdownPropsType extends Omit<triggerPropsType, 'autoSize'|'placement'>{
    placement?:'bottomLeft'|'bottomCenter'|'bottomRight'|'topLeft'|'topCenter'|'topRight',
}
const Dropdown = React.forwardRef<refType,dropdownPropsType>(function (props,ref) {
    return (
        <Trigger
            ref={ref}
            {...props}
            popupClassName={classNames('leke-dropdown',props.popupClassName)}
            autoSize={true}
        />
    );
});
export default Dropdown;