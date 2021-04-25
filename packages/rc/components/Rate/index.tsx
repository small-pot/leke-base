/**
 * @author zhoujunda
 * @description Rate评分
 */
import React, { FC, memo, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import {Star} from '@leke/icons';
import { IRateProps, TRatePropsType, TCharacterType } from './type';

const Rate: FC<IRateProps> = memo(
    ({ count, allowClear, allowHalf, defaultValue, disabled, value, onChange, onHoverChange, className, character }) => {
        const [source, setSource] = useState(value || defaultValue || 0);
        const [hoverSource, setHoverSource] = useState(value || defaultValue || 0);
        const isHover = useRef(false);

        /**点选 */
        const handleClick = useCallback((e, i: number) => {
            if(disabled) return;
            let node = e.target;
            let newSource = 0;
            // 寻找父级元素
            while (!!node.className && node.className !== "leke-rate-ele") {
                node = node.parentNode;
            }

            if (allowHalf && e.clientX < node.offsetLeft + (node.offsetWidth / 2)) {
                // 一半
                newSource = i + 0.5;
            } else {
                newSource = i + 1;
            }

            // 相同表示清空
            if (allowClear && source === newSource) {
                newSource = 0;
            }

            if (onChange) {
                onChange(newSource);
            } else {
                setSource(newSource);
                setHoverSource(newSource);
            }
            
        },[allowClear,allowHalf, source, onChange, disabled]);
        
        /**悬浮 */
        const handleHover = useCallback((e, i) => {
            if (disabled) return;
            let newSource = 0;
            let node = e.target;
            // 寻找父级元素
            while (!!node.className && node.className !== "leke-rate-ele") {
                node = node.parentNode;
            }

            if (allowHalf && e.clientX < node.offsetLeft + (node.offsetWidth / 2)) {
                // 一半
                newSource = i + 0.5;
            } else {
                newSource = i + 1;
            }
            onHoverChange?.(newSource);
            setHoverSource(newSource);

        },[onHoverChange, allowHalf, disabled]);

        /**hover移入事件监听 */
        const onMouseEnter = () => {
            isHover.current = true;
        };

        /**hover移出事件监听 */
        const onMouseLeave = () => {
            isHover.current = false;
            setHoverSource(0);
        };

        /**监听外部value改变 */
        useEffect(() => {
            if(value === null || value === undefined) return;
            setSource(value);
            setHoverSource(value);
        },[value]);
        
        // 容器样式
        const containerClass = useMemo(() => classnames('leke-rate-container', {
            ['leke-rate-disabled']: disabled,
            [className]: !!className
        }), [disabled, className]);
        
        /**渲染star */
        const renderStar = (i) => {
            let RateComponent: TCharacterType = character || <Star />;

            if (character && Object.prototype.toString.call(character) === '[object Function]') {
                RateComponent = (character as (rateProps: TRatePropsType) => ReactNode)({ index: i });
            }
            
            const topStarClass = classnames('leke-rate-ele-top',{
                ['leke-rate-ele-top-full']: i + 1 <= (isHover.current ? hoverSource : source), // 满星
                ['leke-rate-ele-top-half']: i + 0.5 === (isHover.current ? hoverSource : source), // 半星
                ["leke-rate-ele-top-hover"]: isHover.current && hoverSource !== source, // 悬浮
            });
            return (
                <>
                    <div className="leke-rate-ele-bottom">
                        {RateComponent}
                    </div>
                    <div className={topStarClass}>
                        {RateComponent}
                    </div>
                </>
            );
        };

        return <div className={containerClass} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {Array(count).fill('').map((_, i) => (
                <div key={i} className="leke-rate-ele" onClick={(e) => handleClick(e, i)} onMouseMove={(e) => handleHover(e,i)}>
                    {renderStar(i)}
                </div>
            ))}
        </div>;
    }
);

Rate.defaultProps = {
    count: 5,
    allowClear: true,
    allowHalf: false,
    disabled: false
};

export default Rate;
