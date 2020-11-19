import { renderHook } from '@testing-library/react-hooks';
import useAnimation from '..';
jest.useFakeTimers();
test('useAnimation enterClassName',async ()=>{
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
test('useAnimation enterFunc',async ()=>{
    const el=document.createElement('div');
    let visible = true;
    const props={
        ref:{current:el},
        visible,
        onBeforeEnter:(node)=>{
            node.style.top='0';
        },
        onEnter:(node)=>{
            node.style.top='10px';
        },
        onAfterEnter:(node)=>{
            node.style.top='20px';
        },
        timeout:200
    };
    renderHook(() => useAnimation(props));
    expect(el.style.top).toBe('10px');
    jest.runAllTimers();
    expect(el.style.top).toBe('20px');
});
test('useAnimation leaveClass',async ()=>{
    const el=document.createElement('div');
    let visible = false;
    const props={
        ref:{current:el},
        visible,
        beforeLeaveClass:'before',
        leaveClass:'leave',
        afterLeaveClass:'after',
        timeout:200
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('leave');
    jest.runAllTimers();
    expect(el.className).toBe('after');
     
});
test('useAnimation leaveFunc',async ()=>{
    const el=document.createElement('div');
    let visible = false;
    const props={
        ref:{current:el},
        visible,
        onBeforeLeave:(node)=>{
            node.style.left='0px';
        },
        onLeave:(node)=>{
            node.style.left='10px';
        },
        onAfterLeave:(node)=>{
            node.style.left='20px';
        },
        timeout:200
    };
    renderHook(() => useAnimation(props));
    expect(el.style.left).toBe('10px');
    jest.runAllTimers();
    expect(el.style.left).toBe('20px');
});
