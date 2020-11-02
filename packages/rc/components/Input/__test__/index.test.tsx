import React from "react";
import Input from "../";
import userEvent from '@testing-library/user-event';
import {render} from '@testing-library/react';

describe('input ', function() {
    it('test input default ', function() {
        const {container} = render(<Input />);
        const input=container.querySelector('input');
        const text='hello';
        userEvent.type(input, text);
        expect(input.value).toBe(text);
    });
    it('test defaultValue ', function() {
        const {container} = render(<Input defaultValue={'222'}/>);
        const input=container.querySelector('input');
        expect(input.value).toBe('222');
        input.focus();
        userEvent.type(input, '1');
        expect(input.value).toBe('2221');
    });
    it('test onChange',function () {
        let val;
        function onChange(e){
            val=e.target.value;
        }
        const {container} = render(<Input value='333' onChange={onChange}/>);
        const input=container.querySelector('input');
        input.focus();
        userEvent.type(input, '1');
        expect(val).toBe('3331');
        expect(input.value).toBe('333');
    });
});