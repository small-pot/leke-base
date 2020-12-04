import React from "react";
import Alert from "../";
import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

const defaultProps={
    message: "hello world",
};
describe('Alert ', function() {
    it('test default',async function () {
        const {container} = render(
            <Alert
                {...defaultProps}
            />
        );
        const wrap = container.querySelector('.leke-alert-container');
        const message = wrap.getElementsByClassName('text')[0].textContent;
        expect(message).toContain('hello world');
    });
});