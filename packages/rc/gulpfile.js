const gulp = require('gulp');
const {buildTs,buildLess}=require('@leke/gulp-compile');
const tsEntry=["components/!(__test__|demos)/*.{tsx,ts}",'components/*.ts'];
const lessEntry='components/**/*.less';
exports.default = gulp.parallel(
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'es',modules:false}),
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'lib',modules:'commonjs'}),
    ()=>buildLess({stream:gulp.src(lessEntry),outDir:['es','lib']}),
    ()=>buildLess({stream:gulp.src(["style/index.less","style/base.less"]),outDir:'style'})
);