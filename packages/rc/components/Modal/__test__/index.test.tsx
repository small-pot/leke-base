import React from "react";
import Modal from "../index";
import { render, screen, fireEvent } from '@testing-library/react';

const defaultProps = {
    visible: true,
    title: '提示',
    children: 'Hello'
};

describe('Modal', function () {
    it('render correctly', async () => {
        render(<Modal {...defaultProps} />);
        expect(document.body).toMatchSnapshot();
    });

    it('render without footer', () => {
        render(<Modal {...defaultProps} footer={null} />);
        expect(document.body).toMatchSnapshot();
    });

    it('render without header', () => {
        render(<Modal {...defaultProps} header={null} />);
        expect(document.body).toMatchSnapshot();
    });

    it('onCancel should be called', () => {
        const onCancel = jest.fn();
        render(<Modal {...defaultProps} onCancel={onCancel} />);
        fireEvent.click(screen.getByText(/取消/i));
        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it('onOk should be called', () => {
        const onOk = jest.fn();
        render(<Modal {...defaultProps} onOk={onOk} />);
        fireEvent.click(screen.getByText(/确定/i));
        expect(onOk).toHaveBeenCalledTimes(1);
    });
});