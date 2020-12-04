import React from "react";
import Alert from "../";
import '@testing-library/jest-dom/extend-expect';
import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
        const trigger=container.querySelector('.leke-trigger');
        userEvent.click(trigger);
        expect(trigger).toHaveFocus();
        expect(screen.getByText('popup')).toBeVisible();
        userEvent.click(document.body);
        expect(screen.getByText('popup').parentElement).toHaveClass('leke-slide-close');
    });
    it('test hover',async function () {
        const {container} = render(
            <Alert
                {...defaultProps}
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
            <Alert
                {...defaultProps}
            />
        );
        const trigger=container.querySelector('.leke-trigger');
        userEvent.click(trigger);
        const popupContainer=screen.getByText('popup').parentElement;
        expect(popupContainer).toHaveClass('leke-Alert-direction-down');
        const popup=popupContainer.parentElement;
        expect(popup).toMatchSnapshot();
        rerender(
            <Alert
                {...defaultProps}
            />
        );
        expect(popupContainer).toHaveClass('leke-Alert-direction-up');
        expect(popup).toMatchSnapshot();
        rerender(
            <Alert
                {...defaultProps}
            />
        );
        expect(popup).toMatchSnapshot();
        rerender(
            <Alert
                {...defaultProps}
            />
        );
        expect(popup).toMatchSnapshot();
        rerender(
            <Alert
                {...defaultProps}
            />
        );
        expect(popup).toMatchSnapshot();
        rerender(
            <Alert
                {...defaultProps}
            />
        );
        expect(popup).toMatchSnapshot();
    });
});