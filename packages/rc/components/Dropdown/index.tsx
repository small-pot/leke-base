import React from "react";
import Trigger,{triggerPropsType,refType} from "../Trigger";
import classNames from 'classnames';

export interface dropdownPropsType extends Omit<triggerPropsType, 'autoSize'|'placement'>{
    placement?:'bottomLeft'|'bottomCenter'|'bottomRight'|'topLeft'|'topCenter'|'topRight',
}
const Dropdown = React.forwardRef<refType,dropdownPropsType>(function (props,ref) {
    const {popupClassName,...otherProps}=props;
    return (
        <Trigger
            ref={ref}
            popupClassName={classNames('leke-dropdown',popupClassName)}
            autoSize={true}
            {...otherProps}
        />
    );
});
export default Dropdown;