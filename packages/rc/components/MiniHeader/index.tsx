import React, {useEffect, useRef, useReducer} from 'react';
import {Notice} from '@leke/icons';
import UserInfo from './UserInfo';
import {getUserInfo,getMessageCount,userInfoTypes} from "./api";


function Login() {
    const CAS_SVR = 'https://cas.leke.cn';
    const registerUrl="https://tutor.leke.cn/unauth/user/register.htm";
    const href = window.location.href;
    const url = CAS_SVR + '/login?service='+(href.indexOf('eduplan.leke.cn')>-1?encodeURIComponent(href):'');
    return(
        <div className='leke-miniHeader-login'>
            <a href={url} className='leke-miniHeader-login-btn'>登录</a>
            <span> | </span>
            <a href={registerUrl} className='leke-miniHeader-register-btn'>注册</a>
        </div>
    );
}
export interface MiniHeaderProps {
    logo:string|null|false|undefined,
    userInfo ?:userInfoTypes,
    messageCount ?:number
}
export default function MiniHeader(props:MiniHeaderProps) {
    const {logo,userInfo,messageCount} = props;
    const userInfoRef=useRef<userInfoTypes>(undefined);
    const messageCountRef=useRef<number>(undefined);
    const forceUpdate=useReducer(state=>state+1,0)[1];
    if(userInfo!==undefined&&userInfoRef.current!==userInfo){
        userInfoRef.current=userInfo;
    }
    if(messageCount!==undefined&&messageCountRef.current!==messageCount){
        messageCountRef.current=messageCount;
    }
    useEffect(()=>{
        if(userInfoRef.current===undefined){
            getUserInfo().then((user)=>{
                userInfoRef.current=user;
                getMessageCount().then((count)=>{
                    messageCountRef.current=count;
                    forceUpdate();
                }).catch(forceUpdate);
            }).catch(()=>{
                userInfoRef.current=null;
                forceUpdate();
            });
        }else if(userInfoRef.current&&messageCountRef.current===undefined){
            getMessageCount().then((count)=>{
                messageCountRef.current=count;
                forceUpdate();
            });
        }
    },[forceUpdate]);

    return (
        <div className='leke-miniHeader'>
            <div className="leke-miniHeader-content">
                <div className='leke-miniHeader-left'>
                    {logo?<img src={logo} className='leke-miniHeader-logo' />:null}
                </div>
                {(()=>{
                    const user=userInfoRef.current;
                    if(user===undefined){
                        return null;
                    }
                    if(user){
                        return(
                            <div className='leke-miniHeader-right'>
                                <a
                                    href='https://webapp.leke.cn/notice-web/notice.html#/'
                                    target="_blank"
                                    rel="noreferrer"
                                    className='leke-miniHeader-message'
                                >
                                    <Notice className='icon-notice' />
                                    <span>消息</span>
                                    {messageCountRef.current ? <span className='leke-miniHeader-count' >{Math.min(messageCountRef.current,99)}</span>:null}
                                </a>
                                <UserInfo userInfo={user} />
                            </div>
                        );
                    }
                    return <Login />;
                })()}
            </div>
        </div>
    );
}
MiniHeader.defaultProps={
    logo:'https://static.leke.cn/images/common/logo/mini-header-logo-new-2.png'
};


