const gulp = require('gulp');
const {buildTs}=require('@leke/gulp-compile');
const rename=require('gulp-rename');
const gulpLess=require('gulp-less');
const tsEntry=['src/!(demos|__test__)/*.ts','src/index.ts'];
const lessEntry=['src/**/*.less'];
exports.default = gulp.parallel(
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'es',modules:false}),
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'lib',modules:'commonjs'}),
    ()=>gulp.src(lessEntry).pipe(gulp.dest("style")).pipe(gulpLess()).pipe(gulp.dest("style")),
    // ()=>gulp.src('src/AudioPlayer/index.less').pipe(gulpLess()).pipe(rename('AudioPlayer.css')).pipe(gulp.dest("./dist")),
    ()=>gulp.src('src/VideoPlayer/index.less').pipe(gulpLess()).pipe(rename('VideoPlayer.css')).pipe(gulp.dest("./dist"))
);