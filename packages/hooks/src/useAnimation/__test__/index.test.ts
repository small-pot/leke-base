import React,{useRef} from "react";
import { renderHook } from '@testing-library/react-hooks';
import useAnimation from '..';

test('useAnimation',async ()=>{
    
});

// test('useResolve promise',async ()=>{
//     const { result,waitForNextUpdate } = renderHook(() => useResolve(()=>Promise.resolve(2)));
//     expect(result.current.loading).toBe(true);
//     await waitForNextUpdate();
//     expect(result.current.data).toBe(2);
// });

// test('useResolve error',async ()=>{
//     const { result,waitForNextUpdate } = renderHook(() => useResolve(()=>Promise.reject('error')));
//     expect(result.current.loading).toBe(true);
//     await waitForNextUpdate();
//     expect(result.current.data).toBe(undefined);
//     expect(result.current.error).toBe('error');
// });