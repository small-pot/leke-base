import React, { ReactElement } from 'react';
import {Upload} from '@leke/icons';

interface Props {
    
}

export default function downloadOutlined({}: Props): ReactElement {
    return (
        <span style={{verticalAlign:'text-top'}}>
            <Upload />
        </span>
    );
}
