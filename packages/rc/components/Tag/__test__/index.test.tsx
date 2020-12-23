import React from "react";
import Tag from "../index";
import {Stop, Close} from "@leke/icons";
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, waitFor} from '@testing-library/react';

describe('Tag ', function() {
    it('test text attribute',()=>{
        const {container} = render(<Tag text='我是tag' />);
        expect(container.querySelector('.leke-tag-text')).toHaveTextContent('我是tag');
    });
    it('test className attribute',()=>{
        const {container,rerender} = render(<Tag text='你好呀' className='bluefill' />);
        expect(container.querySelector('.leke-tag')).toHaveClass('leke-tag-bluefill');
        rerender(<Tag text='你好呀' className='yourclass' />);
        expect(container.querySelector('.leke-tag')).toHaveClass('yourclass');
    });
    it('test icon attribute',()=>{
        const {container} = render(<Tag text='你好呀' icon={<Stop/>} />);
        expect(container.querySelector('.leke-tag-icon')).not.toBe(null);
    });
    it('test closeIcon & onClose attribute',()=>{
        const onClose = jest.fn();
        const {container} = render(<Tag text='你好呀' closeIcon={<Close/>} onClose={onClose}/>);
        const $closeIcon = container.querySelector('.leke-tag-closeicon');
        expect($closeIcon).not.toBe(null);
        fireEvent.click($closeIcon);
        waitFor(()=>{
            expect(container.querySelector('.leke-tag-ani')).toHaveClass('leke-tag-close');
        });
        expect(onClose).toHaveBeenCalled();
    });
    it('test onClick attribute',async ()=>{
        const onClick = jest.fn();
        const {container} = render(<Tag text='你好呀' closeIcon={<Close/>} onClick={onClick}/>);
        const $lekeTag = container.querySelector('.leke-tag');
        fireEvent.click($lekeTag);
        expect(onClick).toHaveBeenCalled();
    });
    it('test default tag',()=>{
        const {container} = render(<Tag text='你好呀' />);
        expect(container.querySelector('.leke-tag-text')).toHaveTextContent('你好呀');
        expect(container.querySelector('.leke-tag')).toHaveClass('leke-tag-default');
        expect(container.querySelector('.leke-tag-icon')).toBe(null);
        expect(container.querySelector('.leke-tag-closeicon')).toBe(null);
    });
});