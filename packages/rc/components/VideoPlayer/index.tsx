import React, { FC, useEffect, useRef, useMemo, useCallback } from "react";
import { IVideoProps } from "./type";
import {VideoPlayer} from '@leke/AV'
import {newUID} from './uid';
const prefixCls = "leke-video";

const Video: FC<IVideoProps> = (props) => {
    const {
        wrapClassName,
        ...config
    }=props;

    const ref=useRef({
        uid:`${prefixCls}-${newUID()}`
    });

    const init=()=>{
        new VideoPlayer(ref.current.uid,{
            ...config
        });
    };

    useEffect(() => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id={ref.current.uid} className={wrapClassName}></div>;
};

export default Video;