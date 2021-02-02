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
    showLogo:boolean,
    userInfo ?:userInfoTypes,
    messageCount ?:number
}

export default function MiniHeader(props:MiniHeaderProps) {
    const {showLogo} = props;
    const {data:userInfo,loading}=useResolve<userInfoTypes>(props.userInfo===undefined?getUserInfo:props.userInfo);
    const {data:messageCount}=useResolve<number>(props.messageCount===undefined?getMessageCount:props.messageCount);

    if(loading){
        return <div className='leke-miniHeader'><div className="leke-miniHeader-content"></div></div>;
    }
    if(userInfo){
        return(
            <div className='leke-miniHeader'>
                <div className="leke-miniHeader-content">
                    <div className='leke-miniHeader-left'>
                        {showLogo?<img src={userInfo.schoolLogoUrl||'https://static.leke.cn/images/common/logo/mini-header-logo-new-2.png'} className='leke-miniHeader-logo' />:null}
                    </div>
                    <div className='leke-miniHeader-right'>
                        <a
                            href='https://webapp.leke.cn/notice-web/notice.html#/'
                            target="_blank"
                            rel="noreferrer"
                            className='leke-miniHeader-message'
                        >
                            <Notice className='icon-notice' />
                            <span>消息</span>
                            {messageCount ? <span className='leke-miniHeader-count' >{Math.min(messageCount,99)}</span>:null}
                        </a>
                        <UserInfo userInfo={userInfo} />
                    </div>
                </div>
            </div>
        );
    }
    return(
        <div className='leke-miniHeader'>
            <div className="leke-miniHeader-content">
                <div className='leke-miniHeader-left'></div>
                <Login />
            </div>
        </div>
    );
}
MiniHeader.defaultProps={
    showLogo:true
};


