import React from "react";
import Trigger,{triggerPropsType} from "../Trigger";
import classNames from 'classnames';

export interface dropdownPropsType extends Omit<triggerPropsType, keyof 'autoFill'|'placement'>{
    placement?:'bottomLeft'|'bottomCenter'|'bottomRight'|'topLeft'|'topCenter'|'topRight',
}
export default function Dropdown(props:dropdownPropsType) {
    return (
        <Trigger
            {...props}
            popupClassName={classNames('leke-dropdown',props.popupClassName)}
            autoSize={true}
        />
    );
}