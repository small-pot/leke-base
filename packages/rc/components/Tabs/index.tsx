/**
 * @author zhoujunda
 * @description Tabs标签页
 */
import React, { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import cn from 'classnames';
import { More } from "@leke/icons";
import { Trigger } from "@leke/rc";
import { addMouseWheel, removeMouseWheel, returnTabPositionAttribute } from './utils';

export interface ITabsProps {
    defaultActiveKey?: number;
    onChange?: (activeKey: string | number) => void;
    children: React.ReactElement<HTMLElement & ITabPaneProps, any>,
    centered?: boolean;
    animated?: boolean;
    type?: 'line' | 'card' |'editable-card';
    tabPosition?: 'top' | 'right' | 'bottom' | 'left';
    style?: CSSProperties;
}

export interface ITabPaneProps {
    key: string | number,
    tab?: string;
    closeIcon?: ReactNode;
    forceRender?: boolean;
    disabled?: boolean;
    children: React.ReactElement<HTMLElement>
}

type navType = ITabPaneProps;

const Tabs = (props: ITabsProps) => {
    const { children, onChange, centered, animated, tabPosition, style } = props;
    const navRef = useRef(null); // tab导航元素
    const scrollEventLister = useRef(null); // 滚动监听
    const currentTabInfoStyle = useRef({}); // 当前选中tab样式
    const currentTabIndex = useRef(0); // 当前选中tab的下标
    const [currentTabKey, setCurrentTabKey] = useState<string | number>(-1); // 当前选中tabd的key
    const maxScrollLength = useRef(-1); // 最大滚动长度
    const [scrollLength, setScrollLength] = useState(0); // 滚动长度
    const [isShowScroll, setIsShowScroll] = useState(false); // 是否显示滚动
    const [navList, setNavList] = useState<navType[]>([]); // 导航栏tab数组
    
    const postionOpt = useMemo(() => returnTabPositionAttribute(tabPosition),[tabPosition]);

    /**元素是否在可见区域 */
    const isInVisibleArea = useCallback((ele) => {
        if ((ele[postionOpt.start] + scrollLength) < navRef.current[postionOpt.start]) {
            return { status: false, type: 1 };
        }
        if ((ele[postionOpt.start] + ele[postionOpt.length] + scrollLength) > (navRef.current[postionOpt.start] + navRef.current[postionOpt.length])) {
            return { status: false, type: 2 };
        }
        return { status: true, type: 0 };
    }, [scrollLength, postionOpt]);

    /**tab点击切换 */
    const handleTitleCilck = useCallback((item: navType, index: number) => {
        if(item.disabled) return;
        const currentEle = navRef.current.getElementsByClassName(`leke-tabs-nav-item`)[index];
        currentTabInfoStyle.current = currentEle ? postionOpt.barStyle(currentEle[postionOpt.length], currentEle[postionOpt.start]) : {};
        setCurrentTabKey(item.key);
        currentTabIndex.current = index;
        onChange?.(item.key);
        const visibleType = isInVisibleArea(currentEle);
        if (visibleType.status) {
            return;
        }
        if (visibleType.type === 1) {
            setScrollLength(-currentEle[postionOpt.start]);
        } else if (visibleType.type === 2) {
            setScrollLength(-currentEle[postionOpt.start] - currentEle[postionOpt.length] + navRef.current[postionOpt.length]);
        }
    }, [onChange, isInVisibleArea, postionOpt]);

    /**鼠标移入事件 */
    const onMouseEnter = useCallback(() => {
        if (!isShowScroll) return;
        // 监听滚动事件
        scrollEventLister.current = (e) => {
            setScrollLength(v => {
                const newLength = e.deltaY > 0 ? v - 100 : v + 100;
                const maxLength = maxScrollLength.current = navRef.current.getElementsByClassName('leke-tabs-nav-list')?.[0]?.[postionOpt.scroll] - navRef.current[postionOpt.length];
                return newLength > 0 ? 0 : newLength < -maxLength ? -maxLength : newLength;
            } );
            e?.preventDefault?.();
        };
        addMouseWheel(navRef.current, scrollEventLister.current);
    }, [isShowScroll, postionOpt]);
    
    /**鼠标移除事件 */
    const onMouseLeave = useCallback(() => {
        removeMouseWheel(navRef.current, scrollEventLister.current);
    }, []);

    useEffect(() => {
        // 仅执行一次，多标题指标初始位置
        if (navRef.current && navList.length) {
            const currentEle = navRef.current.getElementsByClassName(`leke-tabs-nav-item`)[0];
            currentTabInfoStyle.current = postionOpt.barStyle(currentEle[postionOpt.length], currentEle[postionOpt.start]);
            setCurrentTabKey(navList[0]?.key);
        }
    }, [navList, postionOpt]);

    useEffect(() => {
        setNavList(() => {
            return React.Children.map(children, (item) => {
                if (item.type.name !== 'TabPane') {
                    return { key: null, tab: null, children: item };
                }
                const { disabled } = item.props;
                return { key: item.key, tab: item.props.tab, disabled, children: item };
            }).filter(item => item.key !== null);
        });
    }, [children]);

    useEffect(() => {
        setTimeout(() => {
            setIsShowScroll(navRef.current.getElementsByClassName('leke-tabs-nav-list')?.[0]?.[postionOpt.scroll] - navRef.current[postionOpt.length] > 0);
        },100);
        const onResize = () => {
            setIsShowScroll(navRef.current.getElementsByClassName('leke-tabs-nav-list')?.[0]?.[postionOpt.scroll] - navRef.current[postionOpt.length] > 0);
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [postionOpt]);
    
    /**更多下拉框 */
    const renderMoreDrop = useMemo(() => {
        if(!isShowScroll) return;
        const showMoreNavList = [];
        const navItemList = navRef.current.getElementsByClassName(`leke-tabs-nav-item`);
        for (let i = 0; i < navItemList.length; i++) {
            // 判断在可见区域外
            if (!isInVisibleArea(navItemList[i]).status) {
                const item = {
                    ...navList[i],
                    index: i
                };
                showMoreNavList.push(item);
            }
        }
        return (
            <div className="leke-tabs-nav-more">
                {showMoreNavList.map(item => (
                    <p className={cn({ ['leke-tabs-nav-more-disabled']: item.disabled })} key={item.key} onClick={() => handleTitleCilck(item, item.index)}>
                        {item.tab}
                    </p>
                ))}
            </div>
        );
    },[isShowScroll, isInVisibleArea, navList, handleTitleCilck]);

    const renderNav = useMemo(() => navList.map((item, index) => {
        const { key, disabled, tab } = item;
        const cls = cn('leke-tabs-nav-item', {
            [`leke-tabs-nav-active`]: currentTabKey === key,
            [`leke-tabs-nav-disabled`]: disabled
        });
        const onClick = () => handleTitleCilck(item, index);
        return (
            <div key={key} onClick={onClick} className={cls}>
                {tab}
            </div>
        );
    }), [navList, currentTabKey, handleTitleCilck]);

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

    const tabsCls = cn("leke-tabs", `leke-tabs-${tabPosition}`);
    
    const navListCls = cn("leke-tabs-nav-list", { ["leke-tabs-nav-list-center"]: centered });

    const contentCls = cn("leke-tabs-content", { ["leke-tabs-content-animated"]: animated });

    const navWrapCls = cn("leke-tabs-nav-wrap", {
        ["leke-tabs-nav-wrap-ping-left"]: isShowScroll && scrollLength !== 0,
        ["leke-tabs-nav-wrap-ping-right"]: isShowScroll && scrollLength !== -maxScrollLength.current
    });

    return (
        <div className={tabsCls} style={style}>
            <div className="leke-tabs-nav" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div ref={navRef} className={navWrapCls}>
                    <div className={navListCls} style={{ transform: postionOpt.transform(scrollLength) }}>
                        {renderNav}
                        <div style={currentTabInfoStyle.current} className="leke-tabs-nav-bar" />
                    </div>
                </div>
                {isShowScroll && (
                    <Trigger 
                        popup={renderMoreDrop}
                    >
                        <div className="leke-tabs-more-btn">
                            <More />
                        </div>
                    </Trigger>
                )}
            </div>
            <div style={{ marginLeft: - currentTabIndex.current * 100 + '%' }} className={contentCls}>
                {renderContent}
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
    type: 'line'
};

export default Tabs;
