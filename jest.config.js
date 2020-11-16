const path=require('path');
const resolvePaths=require('./resolvPaths');

module.exports = {
    transform:{
        '\\.(ts|js)x?$':'babel-jest',
        '\\.md$':path.resolve('./jest-markdown.js')
    },
    moduleNameMapper:{
        ...resolvePaths('<rootDir>'),
        '\\.(css|less)$': 'identity-obj-proxy'
    },
    setupFiles:["<rootDir>/jest.setup.js"],
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