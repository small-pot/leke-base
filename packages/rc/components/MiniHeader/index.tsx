import React from 'react';
import {Notice} from '@leke/icons';
import UserInfo from './UserInfo';
import {getUserInfo,getMessageCount,userInfoTypes} from "./api";
import {useResolve} from "@leke/hooks";


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
function getHeaderState(userInfo?:userInfoTypes,messageCount?:number) {
    if(userInfo===undefined){
        return function () {
            return getUserInfo().then(userInfo=>{
                return getMessageCount().then(messageCount=>{
                    return {userInfo,messageCount};
                });
            });
        };
    }
    if(userInfo&&messageCount===undefined){
        return function () {
            return getMessageCount().then(messageCount=>{
                return {userInfo,messageCount};
            });
        };
    }
    return {userInfo,messageCount};
}
export default function MiniHeader(props:MiniHeaderProps) {
    const {logo} = props;
    const {data,loading,error} = useResolve<{userInfo:userInfoTypes,messageCount:number}>(getHeaderState(props.userInfo,props.messageCount));

    return (
        <div className='leke-miniHeader'>
            <div className="leke-miniHeader-content">
                <div className='leke-miniHeader-left'>
                    {logo?<img src={logo} className='leke-miniHeader-logo' />:null}
                </div>
                {(()=>{
                    if(loading||error){
                        return null;
                    }
                    const user=data.userInfo;
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
                                    {data.messageCount ? <span className='leke-miniHeader-count' >{Math.min(data.messageCount,99)}</span>:null}
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


