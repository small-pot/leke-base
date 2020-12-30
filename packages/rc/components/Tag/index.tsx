/**
 * @Author: yangxule
 * @Date: 2020/11/13 20:22
 * @Description: 标签
 */
import React, {ReactNode,useState,useCallback,useRef} from 'react';
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
const PRE_CLASSNAME = 'leke-tag';

const Tag: React.FC<Props> = ({text,className,icon,closeIcon,onClose,onClick}) => {
    const [open,setOpen] = useState(true);
    const ref = useRef(null);
    const tagPointer = ref.current;
    useAnimation({
        ref,
        open,
        type:'transition',
        exited: `${PRE_CLASSNAME}-close`,
        onExit: ()=>{
            tagPointer.style.width = tagPointer.offsetWidth + 'px';
        },
        onExiting: ()=>{
            tagPointer.style.width = '0px';
            tagPointer.style.padding = '0px';
            tagPointer.style.transform = 'scale(0,0)';
        }

    });
    const handleClick = useCallback((e)=>{
        e.stopPropagation();
        setOpen(false);
        onClose && onClose();
    },[onClose]);
    const CloseIcon = closeIcon ? <span className={`${PRE_CLASSNAME}-closeicon`} onClick={handleClick}>{closeIcon}</span> : null;
    const Icon = icon ? <span className={`${PRE_CLASSNAME}-icon`}>{icon}</span> : null;
    const ClassName = PRESET.indexOf(className) >= 0 ? `${PRE_CLASSNAME}-${className}` : className;
    const AniClassName = closeIcon ? `${PRE_CLASSNAME}-ani` : '';
    return <div className={`${PRE_CLASSNAME} ${ClassName} ${AniClassName}`} onClick={onClick} ref={ref}>
        {Icon}<span className={`${PRE_CLASSNAME}-text`}>{text}</span>{CloseIcon}
    </div>;
};
Tag.defaultProps = {
    className: 'default'
};
export default React.memo(Tag);