import { renderHook } from '@testing-library/react-hooks';
import useAnimation from '..';

test('enter',async ()=>{
    const el=document.createElement('div');
    const props={
        ref:{current:el},
        open:true,
        classNames:{
            enter:'enter'
        }
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('enter');
});
test('leave',async ()=>{
    const el=document.createElement('div');
    const props={
        ref:{current:el},
        open:false,
        classNames:{
            leave:'leave'
        }
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('leave');
});
