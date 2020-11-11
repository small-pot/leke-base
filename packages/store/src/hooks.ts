import StoreContext from "./context";
import {useCallback,useEffect, useReducer,useRef,useContext} from "react";
import {storeType,setDataType} from "./types";

export function shallowEqual(objA, objB):boolean {
    if (Object.is(objA, objB)) return true;

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (let i = 0; i < keysA.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

export const useForceUpdate = () => useReducer(state => state+1, 0)[1];

export const useStore=function<T=object> ():storeType<T> {
    return useContext(StoreContext);
};
const subscription=[];

export const useData=<T=any>(selector:(data)=>T,compare=shallowEqual):T=>{
    const {getData}=useStore();
    const stateRef=useRef<T>(undefined);

    if(stateRef.current===undefined){
        stateRef.current=selector(getData());
    }
    const forceUpdate=useForceUpdate();

    useEffect(()=>{
        const update=()=>{
            const newState=selector(getData());
            const state=stateRef.current;
            if(!compare(state,newState)){
                stateRef.current=newState;
                forceUpdate();
            }
        };
        subscription.push(update);
        return ()=>{
            const index=subscription.indexOf(update);
            subscription.splice(index,1);
        };
    },[forceUpdate]);  //eslint-disable-line react-hooks/exhaustive-deps

    return stateRef.current;
};

export const useDispatch=<T=object>():setDataType<T>=>{
    const {setData}=useStore<T>();
    return useCallback((o)=>{
        setData(o);
        subscription.forEach((fn)=>fn());
    },[setData]);
};