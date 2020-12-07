/*
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert组件
 * @Date: 2020-12-03 11:38:17
 * @LastEditTime: 2020-12-07 15:37:55
 */
import React, { FC, useState, useRef, useMemo } from "react";
import { IAlertProps, IAlertState } from "./type";
import { useAnimation } from "@leke/hooks";
import classNames from "classnames";
import {
    CheckCircleFill,
    CloseCircleFill,
    ExclamationcCircleFill,
    InfoCircleFill,
    Close,
} from "@leke/icons";
const prefixCls = "leke-alert";

// 通过type获取对应的图表
const getIconByType = (type: IAlertProps["type"]) => {
    switch (type) {
    case "success":
        return <CheckCircleFill />;
    case "info":
        return <InfoCircleFill />;
    case "error":
        return <CloseCircleFill />;
    case "warning":
        return <ExclamationcCircleFill />;
    default:
        return <InfoCircleFill />;
    }
};
// 通过type获取对应的图表
const getClassByType = (type: IAlertProps["type"]) => {
    switch (type) {
    case "success":
        return type;
    case "info":
        return type;
    case "error":
        return type;
    case "warning":
        return type;
    default:
        return "info";
    }
};

const Alert: FC<IAlertProps> = ({
    className,
    style,
    type,
    closeIcon,
    title,
    message,
    action,
    icon,
    children,
    afterClose,
}) => {
    const [{ closed, isStartAnimation }, setState] = useState<IAlertState>({
        isStartAnimation: true,
        closed: false,
    });
    const wrapRef = useRef<HTMLDivElement>(null);
    const isHasTitle = useMemo(() => typeof title !== "undefined", [title]);
    const isHasMessage = useMemo(() => typeof message !== "undefined", [message]);
    useAnimation({
        ref: wrapRef,
        open: isStartAnimation,
        classNames: {
            leave: `${prefixCls}-close`,
        },
        onLeaveEnd: (e) => {
            setState((prevState) => ({ ...prevState, closed: true }));
            afterClose?.();
        },
    });

    const handleClose = () => {
        setState((prevState) => ({ ...prevState, isStartAnimation: false }));
    };

    // 渲染ICON
    const renderIconNode = () => {
        const iconBoxClass = classNames(`${prefixCls}-icon-box`, {
            [`${prefixCls}-has-title-icon-box`]: isHasTitle,
        });
        return icon !== null ? (
            <div className={iconBoxClass}>
                {typeof icon === "undefined" ? getIconByType(type) : icon}
            </div>
        ) : null;
    };

    // 渲染ACTION
    const renderActioneNode = () => {
        return action ? (
            <div className={`${prefixCls}-action-box`}>
                {action}
            </div>
        ) : null;
    };

    // 渲染消息内容与标题
    const renderContextNode = () => {
        return (
            <div className={`${prefixCls}-context`}>
                {isHasTitle && <div className={`${prefixCls}-title`}>{title}</div>}
                {isHasMessage && <div className={`${prefixCls}-message`}>{message}</div>}
                {children}
            </div>
        );
    };

    // 渲染CLOSEICON
    const renderCloseIconNode = () => {
        const closeIconBoxClass = classNames(`${prefixCls}-close-box`, {
            [`${prefixCls}-has-title-close-box`]: isHasTitle,
        });
        return closeIcon !== null ? (
            <div className={closeIconBoxClass} onClick={handleClose}>
                {typeof closeIcon === 'undefined' ? <Close /> : closeIcon}
            </div>
        ) : null;
    };

    // 样式className
    const wrapClassName = classNames(
        `${prefixCls}-container`,
        `${prefixCls}-container-${getClassByType(type)}`,
        {
            [`${prefixCls}-has-title-container`]: isHasTitle,
        },
        className
    );

    return !closed ? (
        <div ref={wrapRef} style={style} className={wrapClassName}>
            {renderIconNode()}
            {renderContextNode()}
            {renderActioneNode()}
            {renderCloseIconNode()}
        </div>
    ) : null;
};

Alert.displayName = "Alert";

Alert.defaultProps = {
    type: "info",
};

export default Alert;
