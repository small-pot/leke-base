import React, {useMemo} from "react";
import StoreContext from './context';
import {storeType} from "./types";

export default function StoreProvider<T=object> ({children,data}:{children:React.ReactNode,data:T}) {
    const store:storeType<T>=useMemo(()=>{
        return {
            getData(){
                return data;
            },
            setData(arg) {
                const state=typeof arg==='function'?arg(data):arg;
                data={...data,...state};
            }
        };
    },[data])
    return(
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}