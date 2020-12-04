/*
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert组件接口定义
 * @Date: 2020-12-03 11:38:25
 * @LastEditTime: 2020-12-04 11:19:24
 */
export interface IAlertProps {
  // 允许用户传入自己的className
  className?: string;
  // 允许用户设置内联
  style?: React.CSSProperties;
  // 类型
  type?: 'success' | 'info' | 'warning' | 'error';
  // 是否展示关闭icon
  isShowCloseIcon?: boolean;
  // 替换closeIcon
  renderCloseIcon?: React.ReactNode;
  // 标题
  title?: string;
  // 是否省略标题
  isOmitTitle?: boolean;
  // 提示信息
  message?: string;
  // 扩展的操作选项操作
  action?: React.ReactNode;
  // 消息按钮
  messageBtnText?: string;
  // 消息内按钮颜色
  messagebtnColor?: string;
  // 是否省略消息
  isOmitMessage?: boolean;
  // 是否展示icon
  isShowIcon?: boolean;
  // 替换icon
  renderIcon?: React.ReactNode;
  // 是否展示边框
  isShowBorder?: boolean;
  // 宽度 fullScreen-> 占满所在容器
  width?: 'fullScreen' | number;
  // 关闭Alert后
  afterClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // 点击messageBtn
  onClickMessageBtn?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
