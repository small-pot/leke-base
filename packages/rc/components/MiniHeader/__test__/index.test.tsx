import React from "react";
import UserInfo from "../UserInfo";
import MiniHeader from "../index";
import {getUserInfo,getMessageCount} from "../api";
import {render,waitFor} from '@testing-library/react';

describe('MiniHeader ', function() {
    it('test UserInfo',async function () {
        const userInfo = await getUserInfo();
        const {container,rerender} = render(<UserInfo userInfo={userInfo}/>);
        const roleLength=userInfo.roleSchoolList.length;
        expect(container.querySelectorAll('.leke-miniHeader-role-list li').length).toBe(roleLength+3);
        userInfo.roleName='学生';
        userInfo.schoolId=-1;
        userInfo.avatar='';
        rerender(<UserInfo userInfo={userInfo}/>);
        expect(container.querySelectorAll('.leke-miniHeader-role-list li').length).toBe(roleLength+2);
    });
    it('test userInfo or message',async function () {
        const userInfo = await getUserInfo();
        const messageCount =await getMessageCount();
        const {getByText}=render(<MiniHeader userInfo={userInfo} />);
        await waitFor(()=>getByText(messageCount.toString()));
    });
    it('test logo',async function () {
        const {container} = render(<MiniHeader logo={null} userInfo={null} />);
        expect(container.querySelector('.leke-miniHeader-left img')).toBe(null);
    });
});