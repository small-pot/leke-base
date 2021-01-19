/**
 * @author zhoujunda
 * @description Spin加载中
 * @updated ###### Fri Jan 15 09:38:39 PHT 2021
 */
// import { useControl } from "@leke/hooks";
import React, { FC, memo, ReactNode } from "react";
import DefaultIndicator from "./DefaultIndicator";
import classNames from "classnames";
interface SwitchProps {
  delay?: number;
  indicator?: ReactNode;
  size?: "small" | "default";
  spinning?: boolean;
  tip?: string;
  wrapperClassName?: string;
  children?: ReactNode;
}

const Switch: FC<SwitchProps> = memo(
    ({ size, spinning, wrapperClassName, tip, indicator, children }) => {
        const renderSpin = () =>
            spinning && (
                <div className="leke-spin-bg">
                    {!!indicator ? indicator : <DefaultIndicator size={size} />}
                    {!!tip && <p className="leke-spin-tip">{tip}</p>}
                </div>
            );
            
        return children ? (
            <div className={classNames("leke-spin-wrapper",wrapperClassName)}>
                {renderSpin()}
                <div
                    className={classNames("leke-spin-container", {
                        ["leke-spin-blur"]: spinning,
                    })}
                >
                    {children}
                </div>
            </div>
        ) : (
            renderSpin()
        );
    }
);

Switch.defaultProps = {
    spinning: true,
};

export default Switch;
