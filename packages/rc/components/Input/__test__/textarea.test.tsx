import React from "react";
import Input from '../index';
import {render,fireEvent,screen,waitFor} from '@testing-library/react';
const { TextArea } = Input;

describe('TextArea',()=>{
    it('auto calculate height',async()=>{
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        expect(errorSpy).not.toHaveBeenCalled();

        render(<TextArea />);
        const textareaNode = screen.getByRole('textbox');
        fireEvent.change(textareaNode,{ target: { value: '123' } });
        await waitFor(()=>{
            return new Promise((resolve,reject ) => {
                setTimeout(() => {
                    resolve(null);
                }, 100);
            });
        });
        expect(textareaNode.scrollHeight+'px').toBe(textareaNode.style.height);
        console.log((textareaNode as HTMLTextAreaElement).style);
        fireEvent.change(textareaNode,{ target: { value: '123\n321' } });
        expect(textareaNode.scrollHeight+'px').toBe(textareaNode.style.height+1);
    });

});