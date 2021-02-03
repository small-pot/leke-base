import React from "react";
import AudioRecorder from "../index";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AudioRecorder ", function () {
    it("AudioRecorder render base", () => {
        render(<AudioRecorder />);
        expect(document.body).toMatchSnapshot();
    });
    it("AudioRecorder render isViewAudio", () => {
        render(<AudioRecorder isViewAudio />);
        expect(document.body).toMatchSnapshot();
    });
    it("AudioRecorder render duration", () => {
        render(<AudioRecorder duration={300} />);
        expect(document.body).toMatchSnapshot();
    });
    it("AudioRecorder should be called", () => {
        const onStart = jest.fn();
        render(<AudioRecorder onStart={onStart} />);
        fireEvent.click(screen.getByText("开始"));
        expect(onStart).toHaveBeenCalledTimes(1);
    });
    it("AudioRecorder should be called", () => {
        const onStop = jest.fn();
        render(<AudioRecorder onStop={onStop} />);
        fireEvent.click(screen.getByText("停止"));
        expect(onStop).toHaveBeenCalledTimes(1);
    });
    it("AudioRecorder should be called", () => {
        const onDataAvailable = jest.fn();
        render(<AudioRecorder onDataAvailable={onDataAvailable} />);
        fireEvent.click(screen.getByText("停止"));
        expect(onDataAvailable).toHaveBeenCalledTimes(1);
    });
});
