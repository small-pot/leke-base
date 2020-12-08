import React from "react";
import Dropdown from "../";
import '@testing-library/jest-dom/extend-expect';
import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps={
    trigger:<div style={{width:200}}>trigger</div>,
    popup:<div>popup</div>
};
describe('Dropdown ', function() {
    it('test default',async function () {
        const {container} = render(
            <Dropdown
                {...defaultProps}
            />
        );
        const trigger=container.querySelector('.leke-trigger');
        userEvent.click(trigger);
        expect(trigger).toHaveFocus();
        expect(screen.getByText('popup')).toBeVisible();
        userEvent.click(document.body);
        expect(screen.getByText('popup').parentElement).toHaveClass('leke-slide-close');
    });
    it('test hover',async function () {
        const {container} = render(
            <Dropdown
                {...defaultProps}
                triggeredEvent={['hover']}
            />
        );
        const trigger=container.querySelector('.leke-trigger');
        userEvent.hover(trigger);
        expect(screen.getByText('popup')).toBeVisible();
        userEvent.unhover(trigger);
        expect(screen.getByText('popup').parentElement).toHaveClass('leke-slide-close');
    });
    it('test placement',async function () {
        const {container,rerender} = render(
            <Dropdown
                {...defaultProps}
                placement='bottomLeft'
            />
        );
        const trigger=container.querySelector('.leke-trigger');
        userEvent.click(trigger);
        const popupContainer=screen.getByText('popup').parentElement;
        expect(popupContainer).toHaveClass('leke-dropdown-direction-down');
        const popup=popupContainer.parentElement;
        expect(popup).toMatchSnapshot();
        rerender(
            <Dropdown
                {...defaultProps}
                placement='topLeft'
            />
        );
        expect(popupContainer).toHaveClass('leke-dropdown-direction-up');
        expect(popup).toMatchSnapshot();
        rerender(
            <Dropdown
                {...defaultProps}
                placement='bottomCenter'
            />
        );
        expect(popup).toMatchSnapshot();
        rerender(
            <Dropdown
                {...defaultProps}
                placement='bottomRight'
            />
        );
        expect(popup).toMatchSnapshot();
        rerender(
            <Dropdown
                {...defaultProps}
                placement='topCenter'
            />
        );
        expect(popup).toMatchSnapshot();
        rerender(
            <Dropdown
                {...defaultProps}
                placement='topRight'
            />
        );
        expect(popup).toMatchSnapshot();
    });
});