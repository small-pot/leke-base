/*
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert组件
 * @Date: 2020-12-03 11:38:17
 * @LastEditTime: 2020-12-04 11:12:10
 */
import React, { FC, useState, useRef, useEffect } from "react";
import { IAlertProps } from "./type";
import classNames from "classnames";
import { Notice } from "@leke/icons";
import "./index.less";
const prefixCls = "leke-alert";

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
    const [closed, setClosed] = useState(false);
    const wrapRef = useRef<HTMLDivElement>();

    // 设置高度，否则无法使用动画
    useEffect(() => {
        if (wrapRef.current) {
            wrapRef.current.style.height = wrapRef.current.offsetHeight + "px";
        }
    }, []);

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (wrapRef.current) {
            const handler = () => {
                wrapRef.current.removeEventListener("transitionend", handler);
                setClosed(true);
                afterClose?.(e);
            };
            wrapRef.current.addEventListener("transitionend", handler);
            wrapRef.current.innerHTML = "";
            wrapRef.current.style.height = "0px";
            wrapRef.current.style.padding = "0px";
            wrapRef.current.style.opacity = "0";
            wrapRef.current.style.border = "0";
        }
    };

    // 关闭按钮的icon
    const renderCloseIconNode = () => {
        const closeIconBoxClass = classNames(`${prefixCls}-close-box`, {
            [`${prefixCls}-close-simple-box`]: typeof title === "undefined",
            [`${prefixCls}-close-common-box`]: typeof title !== "undefined",
        });
        return isShowCloseIcon ? (
            <div className={closeIconBoxClass}>
                {renderCloseIcon ? (
                    renderCloseIcon
                ) : (
                    <span onClick={handleClose}>
                        <Notice />
                    </span>
                )}
            </div>
        ) : null;
    };

    // 通过type获取对应的图表
    const getIconByType = () => {
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

    // icon
    const renderIconNode = () => {
        const iconBoxClass = classNames(`${prefixCls}-icon-box`, {
            [`${prefixCls}-icon-simple-box`]: typeof title === "undefined",
            [`${prefixCls}-icon-common-box`]: typeof title !== "undefined",
        });

        return isShowIcon ? (
            <div
                style={{
                    fontSize: typeof title !== "undefined" ? "18px" : "16px",
                }}
                className={iconBoxClass}
            >
                {renderIcon ? renderIcon : getIconByType()}
            </div>
        ) : null;
    };

    // 渲染操作选项
    const renderActioneNode = () => {
        return action ? (
            <div className={`${prefixCls}-action-box`}>
                {React.Children.map(action, (item) => {
                    return <div className="action-item">{item}</div>;
                })}
            </div>
        ) : null;
    };

    // 渲染内容
    const renderContextNode = () => {
        const contentClassName = classNames(`${prefixCls}-context`);
        return (
            <div className={contentClassName}>
                {typeof title !== "undefined" && (
                    <h2 className={`title ${isOmitTitle ? "ellipsis" : ""}`}>{title}</h2>
                )}
                {typeof message !== "undefined" && (
                    <div className={`message-box`}>
                        <span className={`message ${isOmitMessage ? "ellipsis" : ""}`}>
                            {message}
                            {typeof messageBtnText !== "undefined" && (
                                <span
                                    onClick={onClickMessageBtn}
                                    style={{ color: messagebtnColor }}
                                    className={"message-text-btn"}
                                >
                                    {messageBtnText}
                                </span>
                            )}
                        </span>
                    </div>
                )}
                {children}
            </div>
        );
    };

    // 样式className
    const wrapClassName = classNames(
        `${prefixCls}-container`,
        className,
        `${prefixCls}-${type}-border`,
        {
            [`${prefixCls}-title-message-container`]: typeof title !== "undefined",
        }
    );
    // 内联
    const wrapStyle: React.CSSProperties = {
        width: width === "fullScreen" ? "100%" : width + "px",
        borderRadius: isShowBorder ? "4px" : 0,
        borderColor: isShowBorder ? "" : "transparent",
        padding: typeof title === "undefined" ? "8px 16px" : "16px 24px",
        marginTop: 10,
        marginBottom: 10,
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
