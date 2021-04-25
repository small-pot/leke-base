import React from "react";
import Rate from "../";
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Rate', function() {
    it('test hover',async function () {
        const {container} = render(
            <Rate />
        );
        const RateComponentBottom4 = container.querySelectorAll('.leke-rate-ele-bottom')[3];

        userEvent.hover(RateComponentBottom4);

        const RateComponentTop1 = container.querySelectorAll('.leke-rate-ele-top')[0]; 
        expect(RateComponentTop1).toHaveClass('leke-rate-ele-top-hover',{ exact: false });

        userEvent.unhover(RateComponentBottom4);

        expect(RateComponentTop1).not.toHaveClass('leke-rate-ele-top-hover',{ exact: false });
    });
    it('test click',async function () {
        const {container} = render(
            <Rate />
        );
        const RateComponentBottom4 = container.querySelectorAll('.leke-rate-ele-bottom')[3];
        fireEvent.click(RateComponentBottom4);

        const RateComponentTop1 = container.querySelectorAll('.leke-rate-ele-top')[0]; 
        expect(RateComponentTop1).toHaveClass('leke-rate-ele-top-full', { exact: false });

        fireEvent.click(RateComponentBottom4);
        expect(RateComponentTop1).not.toHaveClass('leke-rate-ele-top-full', { exact: false });
    });
    it('test disabled',async function () {
        const {container} = render(
            <Rate disabled />
        );
        const RateComponentBottom4 = container.querySelectorAll('.leke-rate-ele-bottom')[3];
        userEvent.hover(RateComponentBottom4);
        fireEvent.click(RateComponentBottom4);
        const RateComponentTop1 = container.querySelectorAll('.leke-rate-ele-top')[0];
        expect(RateComponentTop1).not.toHaveClass('leke-rate-ele-top-full', { exact: false });
    });
    it('test half',async function () {
        const {container} = render(
            <Rate allowHalf/>
        );
        const RateComponent = container.querySelector('.leke-rate-ele');
        userEvent.click(RateComponent, {
            clientX: RateComponent.clientLeft + RateComponent.clientWidth / 2 - 2,
            clientY: RateComponent.clientTop + RateComponent.clientHeight / 2
        });

        const RateComponentTop1 = container.querySelectorAll('.leke-rate-ele-top')[0]; 
        expect(RateComponentTop1).toHaveClass('leke-rate-ele-top-half', { exact: false });

        userEvent.click(RateComponent, {
            clientX: RateComponent.clientLeft + RateComponent.clientWidth / 2,
            clientY: RateComponent.clientTop + RateComponent.clientHeight / 2
        });

        expect(RateComponentTop1).toHaveClass('leke-rate-ele-top-full', { exact: false });
    });
    it('test control', async function () {
        const onChange = jest.fn();
        const onHoverChange = jest.fn();
        const {container} = render(
            <Rate onChange={onChange} onHoverChange={onHoverChange} value={2}/>
        );
        const RateComponent = container.querySelector('.leke-rate-ele');
        const RateComponentTop = container.querySelectorAll('.leke-rate-ele-top'); 
        expect(RateComponentTop[2]).not.toHaveClass('leke-rate-ele-top-full', { exact: false });
        expect(RateComponentTop[1]).toHaveClass('leke-rate-ele-top-full', { exact: false });

        userEvent.hover(RateComponent, {
            clientX: RateComponent.clientLeft + RateComponent.clientWidth / 2,
            clientY: RateComponent.clientTop + RateComponent.clientHeight / 2
        });
        expect(onHoverChange).toBeCalled();
        userEvent.click(RateComponent, {
            clientX: RateComponent.clientLeft + RateComponent.clientWidth / 2,
            clientY: RateComponent.clientTop + RateComponent.clientHeight / 2
        });
        expect(onChange).toBeCalled();
    });
    it('test custom', async function () {
        const {container} = render(
            <Rate count={9} character={() => 'A'}/>
        );
        const RateComponent = container.querySelector('.leke-rate-ele');
        userEvent.click(RateComponent, {
            clientX: RateComponent.clientLeft + RateComponent.clientWidth / 2,
            clientY: RateComponent.clientTop + RateComponent.clientHeight / 2
        });
        const RateComponentTop = container.querySelectorAll('.leke-rate-ele-top'); 
        expect(RateComponentTop[1]).not.toHaveClass('leke-rate-ele-top-full', { exact: false });
    });
});