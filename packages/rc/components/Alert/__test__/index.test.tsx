import React from "react";
import Alert from "../";
import '@testing-library/jest-dom/extend-expect';
import {render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const delayFn = async (time) => {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove();
        }, time);
    });
};

describe('Alert ', function() {
    it('test default',async function () {
        const {container} = render(
            <Alert
                message={"hello world"}
            />
        );
        const wrap = container.querySelector('.leke-alert-container');
        const message = wrap.getElementsByClassName('leke-alert-message')[0].textContent;
        expect(message).toContain('hello world');
    });

    // it('could be closed',async function () {
    //     const {container} = render(
    //         <Alert
    //             className={"my-test-alert"}
    //             message={"hello world"}
    //             isShowCloseIcon
    //             type={"success"}
    //         />
    //     );
    //     const closeEle = container.getElementsByClassName('leke-alert-close-box')[0];
    //     userEvent.click(closeEle);
    //     const findWrap1 = document.getElementsByClassName('my-test-alert');
    //     expect(findWrap1.length).toBe(1);
    //     await delayFn(500);
    //     const findWrap2 = document.getElementsByClassName('my-test-alert');
    //     expect(findWrap2.length).toBe(0);
    // });
});