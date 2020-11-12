import { renderHook } from '@testing-library/react-hooks';
import useAnimation from '..';
jest.useFakeTimers();
test('useAnimation className',async ()=>{
    const el=document.createElement('div');
    const props={
        ref:{current:el},
        visible:true,
        beforeEnterClass:'before',
        enterClass:'enter',
        afterEnterClass:'after',
        timeout:200
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('enter');
    jest.runAllTimers();
    expect(el.className).toBe('after');
});
test('useAnimation func',async ()=>{
    const el=document.createElement('div');
    let visible = true;
    const props={
        ref:{current:el},
        visible,
        onEnter:(node)=>{
            node.style.top='10px';
        },
        timeout:200
    };
    renderHook(() => useAnimation(props));
    expect(el.style.top).toBe('10px');
    // jest.runAllTimers();
    // expect(el.className).toBe('after');
});