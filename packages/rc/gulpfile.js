const gulp = require('gulp');
const {buildTs,buildLess}=require('@leke/gulp-compile');
const glob = require('glob');
const path = require('path');
const Vinyl = require('vinyl');
const tsEntry=["components/!(__test__|demos)/*.{tsx,ts}",'components/*.ts'];
const lessEntry=['components/**/*.less','less/base.less'];

function creatIndexStream(){
    const base=path.resolve(__dirname,'./style');
    const code=glob.sync('./*/index.less',{cwd:base}).map(filePath=>{
        return `@import "${filePath}";`;
    }).join('\n');
    const stream=require('stream').Readable({ objectMode: true });
    stream._read = function () {
        this.push(new Vinyl({
            base,
            path: path.join(base,'index.less'),
            contents: Buffer.from(code)
        }));
        this.push(null);
    };
    return stream;
}
exports.default = gulp.parallel(
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'es',modules:false}),
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'lib',modules:'commonjs'}),
    gulp.series(
        ()=>buildLess({stream:gulp.src(lessEntry),outDir:'style'}),
        ()=>buildLess({stream:creatIndexStream(),outDir:'style'})
    )
);