/**
 * @author zhoujunda
 * @description Tabs标签页
 */
import React, { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import cn from 'classnames';
import { More, Close, Plus } from "@leke/icons";
import { useControl } from "@leke/hooks";
import { Trigger } from "@leke/rc";
import { addMouseWheel, removeMouseWheel, returnTabPositionAttribute } from './utils';

export interface ITabsProps {
    defaultActiveKey?: string | number,
    onChange?: (activeKey: string | number) => void;
    onEdit?: (activeKey: string | number, action: 'add' | 'remove') => void;
    children: React.ReactElement<HTMLElement & ITabPaneProps, any>,
    centered?: boolean;
    animated?: boolean;
    type?: 'line' | 'card' |'editable-card';
    tabPosition?: 'top' | 'right' | 'bottom' | 'left';
    style?: CSSProperties;
    activeKey?: string | number,
}

export interface ITabPaneProps {
    key: string | number,
    tab?: string;
    closeIcon?: ReactNode;
    forceRender?: boolean;
    disabled?: boolean;
    children: React.ReactElement<HTMLElement>,
    closable?: boolean;
}

type navType = ITabPaneProps;

const Tabs = (props: ITabsProps) => {
    const { children, onChange, centered, animated, tabPosition, style, type, onEdit, activeKey, defaultActiveKey } = props;
    const navRef = useRef(null); // tab导航元素
    const scrollEventLister = useRef(null); // 滚动监听
    const currentTabInfo = useRef({
        key: null, // 选中nav的key
        index: null, // 选中nav的下标
        currentEle: null // 选中的元素
    }); // 当前选中tab样式
    const maxScrollLength = useRef(-1); // 最大滚动长度
    const [barStyle, setBarStyle] = useState({}); // bar行内样式
    const [currentTabKey, setCurrentTabKey] = useControl<string | number>(activeKey ? String(activeKey) : undefined, onChange, defaultActiveKey ? String(defaultActiveKey) : undefined); // 当前选中tabd的key
    const [scrollLength, setScrollLength] = useState(0); // 滚动长度
    const [isShowScroll, setIsShowScroll] = useState(false); // 是否显示滚动
    const [navList, setNavList] = useState<navType[]>([]); // 导航栏tab数组
    const [allowEdit, setAllowEdit] = useState(false); // 允许编辑

    // 不同方向布局配置
    const postionOpt = useMemo(() => returnTabPositionAttribute(tabPosition), [tabPosition]);
    
    /**编辑回调 */
    const handleEdit = useCallback((key, action,e) => {
        onEdit?.(key, action);
        e.stopPropagation();
    }, [onEdit]);

    /**元素是否在可见区域 */
    const isInVisibleArea = useCallback((ele) => {
        if ((ele[postionOpt.start] + scrollLength) < navRef.current[postionOpt.start]) {
            return { status: false, type: 1 }; // 左边
        }
        if ((ele[postionOpt.start] + ele[postionOpt.length] + scrollLength) > (navRef.current[postionOpt.start] + navRef.current[postionOpt.length])) {
            return { status: false, type: 2 }; // 右边
        }
        return { status: true, type: 0 };
    }, [scrollLength, postionOpt]);

    /**跳转交互 */
    const scrollToTab = useCallback((key, index) => {
        const currentEle = navRef.current.getElementsByClassName(`leke-tabs-nav-item`)[index];
        currentTabInfo.current = {
            ...currentTabInfo.current,
            index,
            key
        };
        setBarStyle(currentEle ? postionOpt.barStyle(currentEle[postionOpt.length], currentEle[postionOpt.start]) : {});
        const visibleType = isInVisibleArea(currentEle);
        if (visibleType.status) {
            return;
        }
        if (visibleType.type === 1) {
            setScrollLength(-currentEle[postionOpt.start]);
        } else if (visibleType.type === 2) {
            setScrollLength(-currentEle[postionOpt.start] - currentEle[postionOpt.length] + navRef.current[postionOpt.length]);
        }
    },[isInVisibleArea, postionOpt]);

    /**tab点击切换 */
    const handleTitleCilck = useCallback((item: navType, index: number) => {
        if(item.disabled) return;
        setCurrentTabKey(item.key);
        scrollToTab(item.key, index);
    }, [setCurrentTabKey, scrollToTab]);

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
        if (!navRef.current) return;
        
        if (currentTabInfo.current.key === null) {
            // 第一次进来,初始化
            if (navList.length) {
                const currentEle = navRef.current.getElementsByClassName(`leke-tabs-nav-item`)[0];
                currentTabInfo.current = {
                    ...currentTabInfo.current,
                    key: navList[0]?.key,
                    index: 0,
                    currentEle
                };
                setBarStyle(postionOpt.barStyle(currentEle[postionOpt.length], currentEle[postionOpt.start]));
                setCurrentTabKey(navList[0]?.key);
            }
        } else {
            const index = navList.findIndex(item => item.key === currentTabKey);
            // 再次进来,更新
            if (navList.length && index !== -1) {
                // 更新
                scrollToTab(currentTabKey,index);
            } else {
                // 清空
                currentTabInfo.current = {
                    ...currentTabInfo.current,
                    key: null,
                    index: 0,
                    currentEle: null
                };
                setBarStyle({});
                setCurrentTabKey(-1);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navList, postionOpt]);

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

    // 监听是否显示更多下拉
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
    }, [postionOpt, navList]);

    // 监听布局变化
    useEffect(() => {
        const { key, index } = currentTabInfo.current;
        if(index === null) return;
        scrollToTab(key,index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postionOpt]);

    // 监听类型
    useEffect((() => {
        setAllowEdit(type === 'editable-card');
    }),[type]);

    const renderAdd = useMemo(() => {
        return allowEdit ? (
            <button className="leke-tabs-add-button" onClick={(e) => handleEdit('add', 'add', e)}>
                <Plus />
            </button>
        ) : null;
    }, [allowEdit, handleEdit]);
    
    // 渲染更多下拉框
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

    // 渲染导航
    const renderNav = navList.map((item, index) => {
        const { key, disabled, tab, closable } = item;
        const cls = cn('leke-tabs-nav-item', {
            [`leke-tabs-nav-active`]: currentTabKey === key,
            [`leke-tabs-nav-disabled`]: disabled
        });
        const onClick = () => handleTitleCilck(item, index);
        return (
            <div key={key} onClick={onClick} className={cls}>
                <span>{tab}</span>
                {(allowEdit && !closable && !disabled) && (
                    <div onClick={(e) => handleEdit(key, 'remove', e)} className="leke-tabs-tabpane-close-icon">
                        <Close />
                    </div>
                )}
            </div>
        );
    });

    // 渲染内容
    const renderContent = useMemo(() => navList.map(item => {
        const cls = cn("leke-tabs-tabpane", {
            ["leke-tabs-tabpane-hide"]: item.key !== currentTabKey
        });
        // console.log('currentTabKedasdasdasdsady =>',currentTabKey,item.key);
        return (
            <div key={item.key} className={cls}>
                {item.children}
            </div>
        );
    }), [navList, currentTabKey]);

    const tabsCls = cn("leke-tabs", `leke-tabs-${tabPosition}`, {
        [`leke-tabs-nav-card`]: ['card','editable-card'].includes(type)
    });
    
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
                        {!isShowScroll && renderAdd}
                        <div style={barStyle} className="leke-tabs-nav-bar" />
                    </div>
                </div>
                {isShowScroll && (
                    <>
                        <Trigger 
                            popup={renderMoreDrop}
                        >
                            <div className="leke-tabs-more-btn">
                                <More />
                            </div>
                        </Trigger>
                        {renderAdd}
                    </>
                )}
            </div>
            <div className="leke-tabs-content-wrap">
                <div style={{ marginLeft: - currentTabInfo.current.index * 100 + '%' }} className={contentCls}>
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
    type: 'line'
};

export default Tabs;
