import React from "react";
import Alert from "../";
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// const delayFn = (time) => {
//     return new Promise((reslove) => {
//         setTimeout(() => {
//             reslove();
//         }, time);
//     });
// };

describe('Alert ', function() {
    it('test default',async function () {
        const {container} = render(
            <Alert
                message={"hello world"}
            />
        );
        const wrap = container.querySelector('.leke-alert-container');
        const message = wrap.getElementsByClassName('text')[0].textContent;
        expect(message).toContain('hello world');
    });

    it('could be closed',async function () {
        const afterClose = jest.fn();
        const {container} = render(
            <Alert
                message={"hello world"}
                isShowCloseIcon
                afterClose={afterClose}
                type={"success"}
            />
        );
        const closeEle = container.querySelector('.leke-alert-close-box');
        userEvent.click(closeEle);
    });
});