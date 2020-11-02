import React from "react";
import {render,waitFor} from '@testing-library/react';
const glob = require('glob');

glob.sync('../packages/rc/components/**/demos/!(props).md',{cwd:__dirname}).forEach(path=>{
    const Component=require(path).default;
    it('test '+path,async function () {
        const {container} = render(<Component />);
        await waitFor(()=>new Promise(resolve => setTimeout(resolve)));
        expect(container).toMatchSnapshot();
    });
});