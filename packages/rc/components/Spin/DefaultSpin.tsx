import React, { FC, memo } from "react";
import classNames from "classnames";

const DefaultSpin: FC<any> = memo(({ size, className}) => {
    const props = {
        className: classNames("leke-spin-animation", {
            ['leke-spin-animation-small']: size === 'small',
        }, className),
    };

    return (
        <div {...props}>
            <i className="leke-spin-dotC"></i>
            <i className="leke-spin-dotD"></i>
            <i className="leke-spin-dotA"></i>
            <i className="leke-spin-dotB"></i>
        </div>
    );
});

export default DefaultSpin;
