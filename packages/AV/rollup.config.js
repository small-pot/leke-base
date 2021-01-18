import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from "rollup-plugin-uglify";

const config = (arg,override={}) => ({
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json',
            tsconfigOverride:override
        }),
        resolve({
            extensions: ['.ts','.js', '.jsx'],
        })
    ],
    treeshake: {
        moduleSideEffects: false,
    },
    ...arg,
});

const umdOverride = { compilerOptions: { declaration: false } };
const moduleNames = ['AudioPlayer','AudioRecorder','VideoPlayer'];

export default moduleNames.reduce((result,moduleName)=>{
    const input=`src/${moduleName}/index.ts`;
    const tsConfigOverride = { include:[`src/${moduleName}`] };
    result.push(
        // config({
        //     input: input,
        //     output: {
        //         file: `es/${moduleName}/index.js`,
        //         format: 'es'
        //     }
        // },tsConfigOverride),
        // config({
        //     input: input,
        //     output: {
        //         file: `lib/${moduleName}/index.js`,
        //         exports:'default',
        //         format: 'cjs'
        //     }
        // },tsConfigOverride),
        config({
            input: input,
            output: {
                dir: 'dist',
                format: 'umd',
                name:moduleName,
                entryFileNames: `${moduleName}.min.js`,
                plugins:[uglify()]
            }
        },{...umdOverride,...tsConfigOverride})
    );
    return result;
},[]);