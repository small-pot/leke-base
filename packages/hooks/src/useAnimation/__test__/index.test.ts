import { renderHook } from '@testing-library/react-hooks';
import useAnimation from '..';

test('useAnimation enterClassName',async ()=>{
    const el=document.createElement('div');
    const props={
        ref:{current:el},
        open:true,
        enterClassName:'enter'
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('enter');
});
test('useAnimation leaveClassName',async ()=>{
    const el=document.createElement('div');
    const props={
        ref:{current:el},
        open:false,
        leaveClassName:'leave'
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('leave');
});
