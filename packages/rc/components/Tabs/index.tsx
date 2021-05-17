/**
 * @author zhoujunda
 * @description Tabs标签页
 */
import React, { useEffect, useMemo, useRef, useState } from "react";
import cn from 'classnames';
import { More, Plus } from "@leke/icons";
import { useControl } from "@leke/hooks";
import { ITabsProps, navType, ITabPaneProps, IDefaultTabBar } from './types';
import DefaultTabBar from "./DefaultTabBar";

const Tabs = (props: ITabsProps) => {
    const { children, onChange, animated, tabPosition, style, type, activeKey, defaultActiveKey, renderTabBar } = props;
    const tabBarRef = useRef(null);
    const [navList, setNavList] = useState<navType[]>([]); // 导航栏tab数组
    const [barStyle, setBarStyle] = useState({}); // bar行内样式
    const [currentTabKey, setCurrentTabKey] = useControl<string | number>(activeKey ? String(activeKey) : undefined, onChange, defaultActiveKey ? String(defaultActiveKey) : undefined); // 当前选中tab的key

    // 渲染内容
    const renderContent = useMemo(() => navList.map(item => {
        const cls = cn("leke-tabs-tabpane", {
            ["leke-tabs-tabpane-hide"]: item.key !== currentTabKey
        });
        return (
            <div key={item.key} className={cls}>
                {item.children}
            </div>
        );
    }), [navList, currentTabKey]);

    // 监听生成新的tabs
    useEffect(() => {
        setNavList(() => {
            return React.Children.map(children, (item) => {
                if (item.type.name !== 'TabPane') {
                    return { key: null, tab: null, children: item };
                }
                const { disabled, closable } = item.props;
                return { key: item.key, tab: item.props.tab, disabled, closable, children: item };
            }).filter(item => item.key !== null);
        });
    }, [children]);

    const tabsCls = cn("leke-tabs", `leke-tabs-${tabPosition}`, {
        [`leke-tabs-nav-card`]: ['card','editable-card'].includes(type)
    });

    const contentCls = cn("leke-tabs-content", { ["leke-tabs-content-animated"]: animated });

    const defaultProps: IDefaultTabBar = {
        ...props,
        currentTabKey,
        setCurrentTabKey,
        barStyle,
        setBarStyle
    };
    
    const currentTabIndex = tabBarRef?.current?.currentTabInfo?.current?.index ?? 0;

    return (
        <div className={tabsCls} style={style}>
            { renderTabBar ? renderTabBar(defaultProps, DefaultTabBar) : <DefaultTabBar ref={tabBarRef} {...defaultProps}/> }
            <div className="leke-tabs-content-wrap">
                <div style={{ marginLeft: - currentTabIndex * 100 + '%' }} className={contentCls}>
                    {renderContent}
                </div>
            </div>
        </div>
    );
};

const TabPane = (props: ITabPaneProps) => {
    const { children } = props;
    return children;
};

Tabs.TabPane = TabPane;

Tabs.defaultProps = {
    tabPosition: 'top',
    type: 'line',
    centered: false,
    hideAdd: false,
    addIcon: <Plus />,
    moreIcon: <More />
};

export default Tabs;
