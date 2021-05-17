import React, { CSSProperties, ReactNode } from "react";

export interface ITabsProps {
  defaultActiveKey?: string | number;
  children: React.ReactElement<HTMLElement & ITabPaneProps, any>;
  centered?: boolean;
  animated?: boolean;
  type?: "line" | "card" | "editable-card";
  tabPosition?: "top" | "right" | "bottom" | "left";
  style?: CSSProperties;
  activeKey?: string | number;
  addIcon?: ReactNode;
  moreIcon?: ReactNode;
  hideAdd?: boolean;
  tabBarExtraContent?: { left?: ReactNode; right?: ReactNode };
  onChange?: (activeKey: string | number) => void;
  onEdit?: (activeKey: string | number, action: "add" | "remove") => void;
  renderTabBar?: (props: any, DefaultTabBar: (props: any) => ReactNode) => ReactNode
}

export interface ITabPaneProps {
  key: string | number;
  tab?: string;
  closeIcon?: ReactNode;
  forceRender?: boolean;
  disabled?: boolean;
  children: React.ReactElement<HTMLElement>;
  closable?: boolean;
}


export interface IDefaultTabBar extends ITabsProps {
  currentTabKey: string | number;
  setCurrentTabKey: any;
  barStyle: {};
  setBarStyle: any;
}

export type navType = ITabPaneProps;