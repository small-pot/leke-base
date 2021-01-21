const gulp = require('gulp');
const {createStream}=require('@leke/gulp-compile');
const gulpLess=require('gulp-less');
const path = require('path')
const lessEntry=['src/**/*.less'];
function createLessStream(name){
    const code=`@import "../style/${name}/index.less";`
    const base=path.resolve('./dist')
    return createStream({
        code,
        base,
        path:path.join(base,`${name}.less`)
    })
}
exports.default = gulp.series(
    ()=>gulp.src(lessEntry).pipe(gulp.dest("style")),
    gulp.parallel(
        ()=>createLessStream('AudioPlayer').pipe(gulp.dest("dist")).pipe(gulpLess()).pipe(gulp.dest("dist")),
        ()=>createLessStream('VideoPlayer').pipe(gulp.dest("dist")).pipe(gulpLess()).pipe(gulp.dest("dist"))
    )
)