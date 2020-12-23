/**
 * @Author: yangxule
 * @Date: 2020/11/13 20:22
 * @Description: 标签
 */
import React, {ReactNode,useState,useCallback,useMemo,useRef} from 'react';
import {useAnimation} from '@leke/hooks';

interface Props {
    text: string;
    className?: string;
    icon?: ReactNode;
    closeIcon?: ReactNode;
    onClose?: ()=>void;
    onClick?: ()=>void;
}
const PRESET = [
    'default','seablue','lekegreen','brighteyes','hotred','lime','auroragreen','geekblue','saucepurple','magenta','volcano','marigold','sunrise',
    'bluefill','greenfill','orangefill','redfill'
];

const Tag: React.FC<Props> = ({text,className,icon,closeIcon,onClose,onClick}) => {
    const [visible,setVisible] = useState(true);
    const [open,setOpen] = useState(true);
    const ref = useRef(null);
    useAnimation({
        ref,
        open,
        exit:'leke-tag-close',
        onExited(){
            setVisible(false);
        }
    });
    const handleClick = useCallback((e)=>{
        e.stopPropagation();
        setOpen(false);
        onClose && onClose();

    },[onClose]);
    const memoCloseIcon = useMemo(()=>{
        return closeIcon ? <span className='leke-tag-closeicon' onClick={handleClick}>{closeIcon}</span> : null;
    },[closeIcon,handleClick]);
    const memoIcon = useMemo(()=>{
        return icon ? <span className='leke-tag-icon'>{icon}</span> : null;
    },[icon]);
    const memoClassName = useMemo(()=>{
        return PRESET.indexOf(className) >= 0 ? `leke-tag-${className}` : className;
    },[className]);
    return visible ? <div className={`leke-tag ${memoClassName}`} onClick={onClick} ref={ref}>
        {memoIcon}<span className='leke-tag-text'>{text}</span>{memoCloseIcon}
    </div> : null;
};
Tag.defaultProps = {
    className: 'default'
};
export default React.memo(Tag);