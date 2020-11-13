/**
 * @Author: yangxule
 * @Date: 2020/11/13 20:22
 * @Description: 标签
 */
import React from 'react';

interface Props {
    test: string;
}

const Tag: React.FC<Props> = ({test}) => {
    return <div className='leke-tag'>{test}</div>;
};
Tag.defaultProps = {
    test: 'hah'
};
export default React.memo(Tag);