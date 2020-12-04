/*
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert组件
 * @Date: 2020-12-03 11:38:17
 * @LastEditTime: 2020-12-04 15:46:07
 */
import React, { FC, useState, useRef, useEffect, useMemo } from "react";
import { IAlertProps, IAlertState } from "./type";
import { useAnimation } from "@leke/hooks";
import classNames from "classnames";
import { Notice } from "@leke/icons";
const prefixCls = "leke-alert";

// 通过type获取对应的图表
const getIconByType = (type: IAlertProps["type"]) => {
    switch (type) {
    case "success":
        return <Notice />;
    case "info":
        return <Notice />;
    case "error":
        return <Notice />;
    case "warning":
        return <Notice />;
    default:
        return null;
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
    messageBtnText,
    messagebtnColor,
    isOmitMessage,
    isShowIcon,
    renderIcon,
    isShowBorder,
    width,
    children,
    afterClose,
    onClickMessageBtn,
}) => {
    const [{ closed, isStartAnimation }, setState] = useState<IAlertState>({
        isStartAnimation: true,
        closed: false,
    });
    // Alert元素
    const wrapRef = useRef<HTMLDivElement>(null);
    // 是否存在title message messageBtn
    const isHasTitle = useMemo(() => typeof title !== "undefined", [title]);
    const isHasMessage = useMemo(() => typeof message !== "undefined", [message]);
    const isHasMessageBtn = useMemo(() => typeof messageBtnText !== "undefined", [messageBtnText]);
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

    // 渲染messageBtn
    const renderMessageBtnNode = () => {
        return isHasMessageBtn ? (
            <span
                onClick={onClickMessageBtn}
                style={{ color: messagebtnColor }}
                className={`${prefixCls}-message-text-btn`}
            >
                {messageBtnText}
            </span>
        ) : null;
    };

    // 渲染消息内容与标题
    const renderContextNode = () => {
        const titleClass = classNames(`${prefixCls}-title`,{['ellipsis'] : isOmitTitle});
        const messageClass = classNames(`${prefixCls}-message`, {[`${prefixCls}-message-ellipsis`] : isOmitMessage});
        return (
            <div className={`${prefixCls}-context`}>
                {isHasTitle && (<div className={titleClass}>{title}</div>)}
                {isHasMessage && (
                    <div className={messageClass}>
                        <span className="text">{message}</span>
                        {renderMessageBtnNode()}
                    </div>
                )}
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
                {renderCloseIcon ? renderCloseIcon : <Notice />}
            </div>
        ) : null;
    };

    // 样式className
    const wrapClassName = classNames(
        `${prefixCls}-container`,
        `${prefixCls}-container-${type}`,
        {
            [`${prefixCls}-has-title-container`]: isHasTitle,
        },
        className
    );

    // 内联
    const wrapStyle: React.CSSProperties = {
        width: width !== "fullScreen" ? width : undefined,
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
    type: "success",
    isShowCloseIcon: false,
    isOmitTitle: false,
    isOmitMessage: false,
    isShowIcon: false,
    isShowBorder: true,
    width: "fullScreen",
};

export default Alert;
