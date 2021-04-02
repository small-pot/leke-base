import React,{Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';
import {getConfig} from '../../utils';
import Secondary from '../Secondary';

interface Props{
    icon?:string;
    title?:string;
    leke?:any;
    subs?:any;
    defaultSubs?:any;
    activeKey?:number;
    hideSecondary?:boolean;
    extraTitle?:string;
}

interface State{
    roleId:number;
    currentSubs:any[];
    sub:any[];
    icon:string;
    title:string;
}
export default class Navigate extends Component<Props,State>{
    constructor(props){
        super(props);
        // const Leke = JSON.parse(localStorage.getItem('Leke'));
        const Leke = props.leke;
        this.state = {
            roleId: Leke.user.currentRoleId,
            icon: this.props.icon,
            title: this.props.title,
            currentSubs: this.props.icon ? this.setSubs() : [],
            sub: [], // 业务头未读数量
        };
    }

    static propTypes = {
        subs: PropTypes.array,
        customProp: function(props, propName, componentName) {
            if (props.icon === undefined || props.title === undefined) {
                return new Error(
                    'Icon or title cannot be undefined'
                );
            }
        },
    };
    // 设置当前子标题的配置项
    setSubs = () =>{
        const { leke, icon, subs } = this.props;
        const { currentRoleId } = leke.user;
        let currentSubs = [], defaultSubs = [];
        // 获取默认的子标题配置
        getConfig(leke)[icon].map(item =>{
            if(item.roleId === currentRoleId){
                defaultSubs = item.menus;
            }
        });

        if(subs !== undefined){
            if(subs.length === 0){
                currentSubs = [];
            }else{
                // 传入的配置项中是否有当前的角色id
                let hasRoleId = false;
                subs.map(item => {
                    if(typeof item.roleId === 'number'){
                        if(item.roleId === currentRoleId){
                            hasRoleId = true;
                            if(item.menus instanceof Array){
                                // 设置当前子标题(默认-进行数组合并，非默认-全部使用自定义配置)
                                currentSubs = this.props.defaultSubs ? this.concatArray(defaultSubs, item.menus) : item.menus;
                            }else{
                                throw new Error('menus必须为Array类型');
                            }
                        }
                    }else{
                        throw new Error('roleId必须为Number类型');
                    }
                });
                if(!hasRoleId){
                    if (typeof window !== 'undefined') {
                        window.location.href = 'https://static.leke.cn/pages/noAccess.html';
                    }
                    // throw new Error('传入的自定义配置项中没有当前角色的配置项');
                }
            }
        }else{
            currentSubs = defaultSubs;
        }

        return currentSubs;
    }

    /**
     * 默认配置和传入配置进行数组合并并去重
     * 去重规则：传入配置中有默认配置中相同的key时，使用传入配置
    */
    concatArray = (defaultSubs, newSubs) =>{
        let oldSubs = Array.from(defaultSubs);
        oldSubs.map((defaultItem:any, i)=>{
            newSubs.map((newItem, j)=>{
                if(defaultItem.key === newItem.key){
                    oldSubs[i] = newSubs[j];
                }
            });
        });

        return oldSubs;
    }

    componentDidMount(){
        const { roleId, currentSubs, sub } = this.state;
        (!!currentSubs && currentSubs.length !== 0) && currentSubs.map((item)=>{
            item.roleId === roleId && item.menus.map((menu)=>{
                if(!!menu.data){
                    jsonp(menu.data, null, (err, data) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            let num = data.datas.num > 99 ? '99+' : data.datas.num;
                            let item = {
                                key: menu.key,
                                num: num,
                            };
                            sub.push(item);
                            this.setState({ sub: sub });
                        }
                    });
                }
            });
        });
    }

    componentDidUpdate(prevProps){
        if(!this.props.defaultSubs && (JSON.stringify(this.props.subs)!==JSON.stringify(prevProps.subs))){
            this.setState({ currentSubs: this.setSubs() });
        }
    }

    /**
     * 判断是否当前子标题是否选中
     * menu: 子标题数组
    */
    checkActive = menu =>{
        if (typeof window !== 'undefined') {
            const style = 'hoverclick';
            if(this.props.activeKey === menu.key){
                return style;
            }else if(window.location.href === menu.url){
                return style;
            }
            // 判断menu调用的是自定义或者配置项
            if(menu.defaultActive !== undefined){
                return menu.defaultActive ? style : '';
            }
            if(menu.urls !== undefined && menu.urls.constructor === Array){
                let active = false;
                menu.urls.map( item =>{
                    window.location.href === item && ( active = true );
                });
                return active ? style : '';
            }
            return '';
                
            
        }
    }

    /**
     * 左侧标题图片class
     */
    iconClass = () =>{
        const { icon,roleId } = this.state;
        const { hideSecondary,title } = this.props;
        const { currentSchoolNature } = this.props.leke.user;
        let style = '';
        if(icon && title ){
            style = `c-businesshead__${icon}`;
            if(roleId === 101 && currentSchoolNature === 1 && !hideSecondary){
                style = 'c-businesshead__menu';
            }
        }else{
            style = 'c-businesshead__default';
        }

        return style;
    }

    /**
     * 渲染二级子标题
     */
    renderSecondary = () => {
        const { currentSchoolNature } = this.props.leke.user;
        const { roleId, title } = this.state;
        if(roleId === 101 && currentSchoolNature === 1){
            return <Secondary roleId = { roleId } title = { title } />;
        }
        return null;
        
    }

    render(){
        const { extraTitle,title} = this.props;
        const { icon,  currentSubs, sub } = this.state;

        const nav = (
            <div className="c-businesshead__kind">
                <div id="jBusinessheadNavigateImg" className={`c-businesshead__img ${this.iconClass()}`}>
                    { this.renderSecondary() }
                </div>
                { !!title ? <h3 id="jBusinessheadNavigateName">{ title }</h3> : '' }
                { !!extraTitle ?
                    <Fragment>
                        <i>|</i><span className={extraTitle}>{ extraTitle }</span>
                    </Fragment> : ''
                }
                { (!!currentSubs && currentSubs.length !== 0)?
                    <ul id="jBusinessheadNavigate">
                        {
                            currentSubs.map((menu, index)=>{
                                return (
                                    <li key={ index } className={ this.checkActive(menu) }>
                                        <a href={ menu.url }>
                                            { menu.key }
                                            {
                                                sub.length !== 0 && sub.map((sub, index1)=>{
                                                    if(sub.key === menu.key){
                                                        return ( <span key={ index1 }>{ sub.num }</span> );
                                                    }
                                                })
                                            }
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul> : ''
                }
            </div>
        );
        return nav;
    }
}
