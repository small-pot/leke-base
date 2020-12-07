/*
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert组件
 * @Date: 2020-12-03 11:38:17
 * @LastEditTime: 2020-12-07 13:44:09
 */
import React, { FC, useState, useRef, useEffect, useMemo } from "react";
import { IAlertProps, IAlertState } from "./type";
import { useAnimation } from "@leke/hooks";
import classNames from "classnames";
import { CheckCircleFill, CloseCircleFill, ExclamationcCircleFill, InfoCircleFill, Close } from "@leke/icons";
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
        return 'info';
    }
};

const Alert: FC<IAlertProps> = ({
    className,
    style,
    type,
    isShowCloseIcon,
    renderCloseIcon,
    title,
    isOmitTitle,
    message,
    action,
    isOmitMessage,
    isShowIcon,
    renderIcon,
    isShowBorder,
    children,
    afterClose,
}) => {
    const [{ closed, isStartAnimation }, setState] = useState<IAlertState>({
        isStartAnimation: true,
        closed: false,
    });
    // Alert元素
    const wrapRef = useRef<HTMLDivElement>(null);
    // 是否存在title message
    const isHasTitle = useMemo(() => typeof title !== "undefined", [title]);
    const isHasMessage = useMemo(() => typeof message !== "undefined", [message]);
    // 点击close时使用过渡动画
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
        return isShowIcon ? (
            <div className={iconBoxClass}>
                {renderIcon ? renderIcon : getIconByType(type)}
            </div>
        ) : null;
    };

    // 渲染ACTION
    const renderActioneNode = () => {
        return action ? (
            <div className={`${prefixCls}-action-box`}>
                {React.Children.map(action, (item) => {
                    return <div className={`${prefixCls}-action-item`}>{item}</div>;
                })}
            </div>
        ) : null;
    };


    // 渲染消息内容与标题
    const renderContextNode = () => {
        const titleClass = classNames(`${prefixCls}-title`,{['ellipsis'] : isOmitTitle});
        const messageClass = classNames(`${prefixCls}-message`, {[`${prefixCls}-message-ellipsis`] : isOmitMessage});
        return (
            <div className={`${prefixCls}-context`}>
                {isHasTitle && (<div className={titleClass}>{title}</div>)}
                {isHasMessage && (<div className={messageClass}>{message}</div>)}
                {children}
            </div>
        );
    };

    // 渲染CLOSEICON
    const renderCloseIconNode = () => {
        const closeIconBoxClass = classNames(`${prefixCls}-close-box`, {
            [`${prefixCls}-has-title-close-box`]: isHasTitle,
        });
        return isShowCloseIcon ? (
            <div className={closeIconBoxClass} onClick={handleClose}>
                {renderCloseIcon ? renderCloseIcon : <Close />}
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

    // 内联
    const wrapStyle: React.CSSProperties = {
        borderRadius: !isShowBorder ? 0 : undefined,
        ...style,
    };

    return !closed ? (
        <div ref={wrapRef} style={wrapStyle} className={wrapClassName}>
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
    isShowCloseIcon: false,
    isOmitTitle: false,
    isOmitMessage: false,
    isShowIcon: false,
    isShowBorder: true,
};

export default Alert;
