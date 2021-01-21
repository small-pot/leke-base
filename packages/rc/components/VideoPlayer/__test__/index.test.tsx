import React from "react";
import VideoPlayer from "../index";
import { render, screen, fireEvent } from '@testing-library/react';

const defaultProps = {
    el: document.body,
    src: 'https://file.leke.cn/group1/M00/1C/4C/wKgURF8D3rGAIVVHAAAEX_O0MzM97.m3u8',
    width: 876,
    height: 492
};

describe('VideoPlayer', function () {
    it('render correctly', async () => {
        render(<VideoPlayer {...defaultProps} />);
        expect(document.body).toMatchSnapshot();
    });

    it('onPauseChange should be called', () => {
        const onPauseChange = jest.fn();
        render(<VideoPlayer {...defaultProps} onPauseChange={onPauseChange} />);
        fireEvent.click(document.querySelector('.video-root-container'));
        expect(onPauseChange).toHaveBeenCalledTimes(1);
    });
    
    it('onFullscreenChange should be called', () => {
        const onFullscreenChange = jest.fn();
        render(<VideoPlayer {...defaultProps} onFullscreenChange={onFullscreenChange} />);
        fireEvent.click(document.querySelector('.video-fullscreen-container .icon_quanping'));
        expect(onFullscreenChange).toHaveBeenCalledTimes(1);
    });
});