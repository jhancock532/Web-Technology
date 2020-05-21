'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./site/public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./site/public/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./site/public/sass/*.scss', gulp.series(['sass']));
  gulp.watch('./site/public/sass/collections/*.scss', gulp.series(['sass']));
  gulp.watch('./site/public/sass/components/*.scss', gulp.series(['sass']));
});