const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const deporder = require('gulp-deporder');
const jsValidate = require('gulp-jsvalidate');
const htmlclean = require('gulp-htmlclean');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');

var folder = {
    src: 'src/',
    build: 'build/'
};

gulp.task('html', function () {
    var htmbuild = gulp.src(folder.src + 'html/*')
        .pipe(htmlclean());
    return htmbuild.pipe(gulp.dest(folder.build));
});

gulp.task('js', function () {
    var jsbuild = gulp.src(folder.src + 'js/*')
        .pipe(deporder())
        .pipe(concat('blissly.js'));
    jsbuild = jsbuild.pipe(uglify());
    jsbuild = jsbuild.pipe(jsValidate());
    return jsbuild.pipe(gulp.dest(folder.build));
});

gulp.task('css', function () {
    var cssbuild = gulp.src(folder.src + 'css/*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        }))
        .pipe(cleancss());
    return cssbuild.pipe(gulp.dest(folder.build));
});

