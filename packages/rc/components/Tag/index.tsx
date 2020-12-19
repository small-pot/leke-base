/**
 * @Author: yangxule
 * @Date: 2020/11/13 20:22
 * @Description: 标签
 */
import React, {ReactNode,useState,useCallback,useMemo} from 'react';

interface Props {
    text?: string;
    className?: string;
    icon?: ReactNode;
    closeIcon?: ReactNode;
    onClose?: ()=>void;
}
const PRESET = [
    'default','seablue','lekegreen','brighteyes','hotred','lime','auroragreen','geekblue','saucepurple','magenta','volcano','marigold','sunrise',
    'bluefill','greenfill','orangefill','redfill'
];

const Tag: React.FC<Props> = ({text,className,icon,closeIcon,onClose}) => {
    const [visible,setVisible] = useState(true);
    const handleClick = useCallback(()=>{
        setVisible(false);
        onClose && onClose();
    },[onClose]);
    const memoCloseIcon = useMemo(()=>{
        return closeIcon ? <span className='leke-tag-closeicon' onClick={handleClick}>{closeIcon}</span> : null;
    },[closeIcon,handleClick]);
    const memoIcon = useMemo(()=>{
        return icon ? <span className='leke-tag-icon'>{icon}</span> : null;
    },[icon]);
    const memoClassName = useMemo(()=>{
        return PRESET.includes(className) ? `leke-tag-${className}` : className;
    },[className]);
    return visible ? <div className={`leke-tag ${memoClassName}`}>
        {memoIcon}<span className='leke-tag-text'>{text}</span>{memoCloseIcon}
    </div> : null;
};
Tag.defaultProps = {
    text: '你好呀',
    className: 'default'
};
export default React.memo(Tag);