/*
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert组件接口定义
 * @Date: 2020-12-03 11:38:25
 * @LastEditTime: 2020-12-07 13:39:45
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
  message?: string | React.ReactNode;
  // 扩展的操作选项操作
  action?: React.ReactNode;
  // 是否省略消息
  isOmitMessage?: boolean;
  // 是否展示icon
  isShowIcon?: boolean;
  // 替换icon
  renderIcon?: React.ReactNode;
  // 是否展示边框
  isShowBorder?: boolean;
  // 关闭Alert后
  afterClose?: () => void;
}

export interface IAlertState {
  // 动画状态控制
  isStartAnimation: boolean;
  // 关闭状态控制
  closed: boolean;
}
