import React from "react";
import Radio from "../";
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Radio', function() {
    it('test default',async function () {
        const {container} = render(
            <Radio />
        );
        const radioBtn = container.querySelector('.leke-radio-wrapper');
        userEvent.click(radioBtn);
        expect(radioBtn).toHaveClass('leke-radio-wrapper leke-radio-wrapper-checked');
    });
});