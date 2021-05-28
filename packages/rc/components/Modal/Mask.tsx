import React, { useRef, useEffect } from 'react';
import Portal from './Portal';
import { animationDuration, prefix } from './config';
import cx from 'classnames';

export interface MaskProps {
    visible: boolean,
    children?: React.ReactNode,
    getContainer: () => HTMLElement,
    style?: object,
    onMaskClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    show?: boolean
    destroyOnClose?: boolean;
}

export default (props: MaskProps) => {
    const { children, visible, getContainer, style, onMaskClick, show,destroyOnClose } = props;
    const ref = useRef(null);
    const countRef = useRef({ INIT:show });  // 防止一引入就加载dom
    const portalRef = useRef(null);

    useEffect(() => {
        if (!countRef.current.INIT) {
            countRef.current.INIT = true;
            return;
        }
        if (visible) {
            if(destroyOnClose){
                portalRef.current.render(true);
                const timer=setTimeout(()=>{
                    ref.current.style.display = 'block';
                    clearTimeout(timer);
                },animationDuration);
            }
            else ref.current.style.display = 'block';
        } else {
            const timer = setTimeout(() => {
                ref.current.style.display = 'none';
                if(destroyOnClose)portalRef.current.render(false);
                clearTimeout(timer);
            }, animationDuration);
        }
    }, [visible,destroyOnClose]);

    useEffect(() => {
        return () => {
            ref.current = null;
            portalRef.current = null;
            countRef.current = null;
        };
    }, []);

    return countRef.current.INIT ? <Portal getContainer={getContainer} ref={portalRef}>
        <div>
            <div className={cx(`${prefix}-mask`,visible?'fade-enter':'fade-leave')} style={{ ...style }} onClick={onMaskClick} ref={ref}></div>
            {children}
        </div>
    </Portal> : null;
};