import React from "react";
import Modal from "../index";
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';



describe('Modal', function () {
    it('render correctly', async () => {
        const defaultProps = {
            visible: false,
            // destroyOnClose: true,
            title: '提示',
            children: 'Hello',
            onCancel: jest.fn()
        };
        const { rerender, container } = render(<Modal {...defaultProps} />);
        let ele = container.querySelector('.leke-modal');
        
        expect(ele).not.toBeInTheDocument();
        defaultProps.visible = true;
        rerender(<Modal {...defaultProps} />);
        ele = document.querySelector('.leke-modal');
        const maskEle = document.querySelector('.leke-modal-mask');
        expect(ele).toHaveClass('zoom-enter', { exact: false });
        expect(maskEle).toHaveClass('fade-enter', { exact: false });
        const closeEle = document.querySelector('.leke-modal-close-icon');
        fireEvent.click(closeEle);
        expect(defaultProps.onCancel).toHaveBeenCalled();
        defaultProps.visible = false;
        rerender(<Modal {...defaultProps} />);
        ele = container.querySelector('.leke-modal');
        await waitFor(() => expect(ele).not.toBeInTheDocument(), {
            timeout: 500
        });
        expect(document.body).toMatchSnapshot();
    });

    it('render destroyOnClose', async () => {
        const defaultProps = {
            visible: false,
            destroyOnClose: true,
            title: '提示',
            children: 'Hello',
            onCancel: jest.fn()
        };
        const { rerender } = render(<Modal {...defaultProps} />);
        defaultProps.visible = true;
        rerender(<Modal {...defaultProps} />);
        let ele = document.querySelector('.leke-modal');
        const maskEle = document.querySelector('.leke-modal-mask');
        expect(ele).toHaveClass('zoom-enter', { exact: false });
        expect(maskEle).toHaveClass('fade-enter', { exact: false });
        const closeEle = document.querySelector('.leke-modal-close-icon');
        fireEvent.click(closeEle);
        expect(defaultProps.onCancel).toHaveBeenCalled();
        ele = document.querySelector('.leke-modal');
        expect(ele).toBeInTheDocument();
        defaultProps.visible = false;
        rerender(<Modal {...defaultProps} />);
        ele = document.querySelector('.leke-modal');
        await waitFor(() => expect(ele).toHaveClass('zoom-leave', { exact: false }), {
            timeout: 1000
        });
        expect(document.body).toMatchSnapshot();
    });

    it('render confirm', async () => {
        Modal.confirm({
            title:'确认弹窗',
            destroyOnClose: true,
            content:<div>
                <p style={{ color: '#000000' }}>确定要删除这条信息吗？</p>
                <p>简单的信息描述</p>
            </div>
        });
        

        Modal.miniConfirm({
            destroyOnClose: true,
            content:<div>
                <p style={{ color: '#000000' }}>确定要删除这条信息吗？</p>
                <p>简单的信息描述</p>
                <p>简单的信息描述</p>
            </div>
        });

        expect(document.body).toMatchSnapshot();
    });

    it('render info', async () => {
        Modal.info({
            content:<div className="center2">
                <p>一些简单的信息提示</p>
                <p>一些简单的信息提示</p>
            </div>
        });

        Modal.miniInfo({
            content:<div className="center2">
                <p>一些简单的信息提示</p>
                <p>一些简单的信息提示</p>
            </div>
        });
        await waitFor(() => { }, { timeout: 500 });
        const closeEle = document.querySelector('.leke-modal-close-icon');
        fireEvent.click(closeEle);
        expect(document.body).toMatchSnapshot();
    });

    it('render tabs', async () => {
        const defaultProps = {
            visible: false,
            // destroyOnClose: true,
            title:['提示','提示1','提示2'],
            children: 'Hello',
            onCancel: jest.fn(),
            onChangeTitle: jest.fn()
        };
        const { rerender, container } = render(<Modal {...defaultProps} />);
        defaultProps.visible = true;
        rerender(<Modal {...defaultProps} />);
        const title2 = document.querySelector('.leke-modal-tab-title').querySelectorAll('p')[1];
        fireEvent.click(title2);
        expect(defaultProps.onChangeTitle).toHaveBeenCalled();
        expect(document.body).toMatchSnapshot();
    });
});