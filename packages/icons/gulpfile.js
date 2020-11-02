const gulp = require('gulp');
const {svgToTsx,getComponentName} = require('./utils');
const glob = require('glob');
const path = require('path');
const Vinyl = require('vinyl');
const {buildTs} = require('@leke/gulp-compile');

const svgPath="svg/*.svg";
function creatIndexStream(outDir){
    const code=glob.sync(svgPath).map(filePath=>{
        const basename=getComponentName(path.basename(filePath,path.extname(filePath)));
        return `export {default as ${basename}} from ${JSON.stringify('./'+basename)}`;
    }).join('\n');
    const stream=require('stream').Readable({ objectMode: true });
    stream._read = function () {
        const base=path.join(__dirname,outDir);
        this.push(new Vinyl({
            base,
            path: path.join(base,'index.ts'),
            contents: Buffer.from(code)
        }));
        this.push(null);
    };
    return stream;
}
function svgStream(){
    return gulp.src(svgPath).pipe(svgToTsx());
}
exports.default=gulp.series(
    gulp.parallel(
        ()=>buildTs({stream:svgStream(),outDir:'es',modules:false}),
        ()=>buildTs({stream:svgStream(),outDir:'lib',modules:'commonjs'})
    ),
    gulp.parallel(
        ()=>buildTs({stream:creatIndexStream('es'),outDir:'es',modules:false}),
        ()=>buildTs({stream:creatIndexStream('lib'),outDir:'lib',modules:'commonjs'})
    )
);