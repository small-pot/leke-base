import React, {useCallback, useState} from 'react';
import './index.less';

export default function IconList({icons}) {
    return (
        <ul className='icon-list'>
            {Object.keys(icons).map((key)=>{
                const Icon=icons[key];
                return (
                    <li key={key}>
                        <Icon />
                        <p>{key}</p>
                    </li>
                );
            })}
        </ul>
    );
}