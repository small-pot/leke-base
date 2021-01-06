import React from "react";
import Trigger from "../";
import '@testing-library/jest-dom/extend-expect';
import {render,screen,waitFor,act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps={
    children:<div style={{width:200}}>trigger</div>,
    popup:<div>popup</div>
};
jest.useFakeTimers();
describe('Trigger ', function() {
    it('test hover',async function () {
        const {getByText} = render(
            <Trigger
                {...defaultProps}
                autoSize={true}
            />
        );
        const trigger=getByText('trigger');
        userEvent.hover(trigger);
        await waitFor(()=>screen.getByText('popup'));
        const popupContainer:HTMLDivElement=document.body.querySelector('.leke-popup');
        expect(popupContainer.style.minWidth).toBe(trigger.offsetWidth+'px');
        userEvent.unhover(trigger);
        userEvent.hover(popupContainer);
        act(()=>{
            jest.runAllTimers();
            expect(popupContainer.className.indexOf('leke-close')).toBe(-1);
        });
        userEvent.unhover(popupContainer);
        act(()=>{
            jest.runAllTimers();
            expect(popupContainer).toHaveClass('leke-close');
        });
    });
    it('test vertical autoFill getPopupContainer',async function () {
        const div=document.createElement('div');
        const getPopupContainer=()=>{
            document.body.appendChild(div);
            return div;
        };
        const {getByText} = render(
            <Trigger
                {...defaultProps}
                autoSize={true}
                placement={'leftTop'}
                getPopupContainer={getPopupContainer}
            />
        );
        const trigger=getByText('trigger');
        userEvent.hover(trigger);
        await waitFor(()=>screen.getByText('popup'));
        expect(div.style.position).toBe('relative');
        const popupContainer:HTMLDivElement=document.body.querySelector('.leke-popup');
        expect(popupContainer.style.minHeight).toBe(trigger.offsetHeight+'px');
    });
    it('test focus',async function () {
        const {getByText} = render(
            <Trigger
                {...defaultProps}
                eventType={['focus']}
            />
        );
        const trigger=getByText('trigger');
        userEvent.click(trigger);
        expect(trigger).toHaveFocus();
        await waitFor(()=>screen.getByText('popup'));
        userEvent.click(document.body);
        act(()=>{
            jest.runAllTimers();
            expect(screen.getByText('popup').parentElement).toHaveClass('leke-close');
        });
    });
    it('test ref',async function () {
        const ref=React.createRef<HTMLDivElement>();
        const {rerender} = render(
            <Trigger
                popup={<div>popup</div>}
            >
                <div ref={ref}>trigger</div>
            </Trigger>
        );
        expect(ref.current.innerHTML).toBe('trigger');
        const fn=jest.fn();
        rerender(
            <Trigger
                popup={<div>popup</div>}
            >
                <div ref={fn}>trigger</div>
            </Trigger>
        );
        expect(fn).toBeCalled();
    });
    it('test placement',async function () {
        const {rerender,getByText} = render(
            <Trigger
                {...defaultProps}
                placement='bottomLeft'
            />
        );
        const trigger=getByText('trigger');
        userEvent.click(trigger);
        await waitFor(()=>screen.getByText('popup'));
        const popupContainer=screen.getByText('popup').parentElement;
        expect(popupContainer).toHaveClass('leke-popup-bottomLeft');
        rerender(
            <Trigger
                {...defaultProps}
                placement='bottomCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-bottomCenter');
        rerender(
            <Trigger
                {...defaultProps}
                placement='bottomRight'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-bottomRight');
        rerender(
            <Trigger
                {...defaultProps}
                placement='topLeft'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-topLeft');
        rerender(
            <Trigger
                {...defaultProps}
                placement='topCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-topCenter');
        rerender(
            <Trigger
                {...defaultProps}
                placement='leftTop'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftTop');
        rerender(
            <Trigger
                {...defaultProps}
                placement='leftCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftCenter');
        rerender(
            <Trigger
                {...defaultProps}
                placement='leftBottom'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftBottom');
        rerender(
            <Trigger
                {...defaultProps}
                placement='rightTop'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightTop');
        rerender(
            <Trigger
                {...defaultProps}
                placement='rightCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightCenter');
        rerender(
            <Trigger
                {...defaultProps}
                placement='rightBottom'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightBottom');
    });
});