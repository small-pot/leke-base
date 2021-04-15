import React from "react";
import Tooltip from "../";
import '@testing-library/jest-dom/extend-expect';
import {render,screen,waitFor,act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps={
    children:<span>tooltip</span>,
    popup:<div>popup</div>
};
jest.useFakeTimers();
describe('Tooltip ', function() {
    it('test hover',async function () {
        const {getByText} = render(
            <Tooltip
                {...defaultProps}
            />
        );
        const tooltip=getByText('tooltip');
        userEvent.hover(tooltip);
        await waitFor(()=>screen.getByText('popup'));
        const popupContainer:HTMLDivElement=document.body.querySelector('.leke-popup');
        expect(popupContainer.offsetWidth).toBe(tooltip.offsetWidth);
        userEvent.unhover(tooltip);
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
    // it('test vertical autoFill getPopupContainer',async function () {
    //     const div=document.createElement('div');
    //     const getPopupContainer=()=>{
    //         document.body.appendChild(div);
    //         return div;
    //     };
    //     const {getByText} = render(
    //         <Tooltip
    //             {...defaultProps}
    //             autoSize={true}
    //             placement={'leftTop'}
    //             getPopupContainer={getPopupContainer}
    //         />
    //     );
    //     const tooltip=getByText('tooltip');
    //     userEvent.hover(tooltip);
    //     await waitFor(()=>screen.getByText('popup'));
    //     expect(div.style.position).toBe('relative');
    //     const popupContainer:HTMLDivElement=document.body.querySelector('.leke-popup');
    //     expect(popupContainer.style.minHeight).toBe(tooltip.offsetHeight+'px');
    // });
    // it('test focus',async function () {
    //     const {getByText} = render(
    //         <Tooltip
    //             {...defaultProps}
    //             event={['focus']}
    //         />
    //     );
    //     const tooltip=getByText('tooltip');
    //     userEvent.click(tooltip);
    //     expect(tooltip).toHaveFocus();
    //     await waitFor(()=>screen.getByText('popup'));
    //     userEvent.click(document.body);
    //     act(()=>{
    //         jest.runAllTimers();
    //         expect(screen.getByText('popup').parentElement).toHaveClass('leke-close');
    //     });
    // });
    // it('test ref',async function () {
    //     const ref=React.createRef<HTMLDivElement>();
    //     const {rerender} = render(
    //         <Tooltip
    //             popup={<div>popup</div>}
    //         >
    //             <div ref={ref}>tooltip</div>
    //         </Tooltip>
    //     );
    //     expect(ref.current.innerHTML).toBe('tooltip');
    //     const fn=jest.fn();
    //     rerender(
    //         <Tooltip
    //             popup={<div>popup</div>}
    //         >
    //             <div ref={fn}>tooltip</div>
    //         </Tooltip>
    //     );
    //     expect(fn).toBeCalled();
    // });
    it('test placement',async function () {
        const {rerender,getByText} = render(
            <Tooltip
                {...defaultProps}
                placement='bottomLeft'
            />
        );
        const tooltip=getByText('tooltip');
        userEvent.click(tooltip);
        await waitFor(()=>screen.getByText('popup'));
        const popupContainer=screen.getByText('popup').parentElement;
        expect(popupContainer).toHaveClass('leke-popup-bottomLeft');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='bottomCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-bottomCenter');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='bottomRight'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-bottomRight');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='topLeft'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-topLeft');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='topCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-topCenter');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='leftTop'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftTop');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='leftCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftCenter');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='leftBottom'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftBottom');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='rightTop'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightTop');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='rightCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightCenter');
        rerender(
            <Tooltip
                {...defaultProps}
                placement='rightBottom'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightBottom');
    });
});