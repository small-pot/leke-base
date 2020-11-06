const path=require('path');
module.exports = {
    transform:{
        '\\.(ts|js)x?$':'babel-jest',
        '\\.md$':path.resolve('./jest-markdown.js'),
        '\\.(css|less)$': 'identity-obj-proxy'
    },
    moduleNameMapper:{
        '@leke/icons':'<rootDir>/packages/icons/es/index.js',
        "@leke/rc":"<rootDir>/packages/rc/components/index.ts",
        'testUtil':'<rootDir>/testUtil'
    },
    setupFilesAfterEnv:["<rootDir>/jest.setup.js"],
    moduleFileExtensions: ['ts','tsx','js','jsx','md'],
    collectCoverageFrom: [
        "!**/node_modules/**",
        "<rootDir>/packages/rc/components/**/*.tsx",
        "<rootDir>/packages/hooks/src/!(demos)/*.ts",
        "<rootDir>/packages/store/src/!(index|types|context).{ts,tsx}"
    ],
    testPathIgnorePatterns:[
        "node_modules",
        "style"
    ],
    collectCoverage: true
};