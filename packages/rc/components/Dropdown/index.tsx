import React from "react";
import Trigger,{triggerPropsType} from "../Trigger";
import classNames from 'classnames';

export interface dropdownPropsType extends Omit<triggerPropsType, 'autoSize'|'placement'>{
    placement?:'bottomLeft'|'bottomCenter'|'bottomRight'|'topLeft'|'topCenter'|'topRight',
}

export default function Dropdown(props:dropdownPropsType) {
    const {popupClassName,popupStyle,...otherProps}=props;
    return (
        <Trigger
            popupClassName={classNames('leke-dropdown',popupClassName)}
            autoSize={true}
            {...otherProps}
        />
    );
};