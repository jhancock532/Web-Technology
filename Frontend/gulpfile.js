'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    server = require('gulp-develop-server'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

let jsFilePath = 'site/javascript/**/*.js';
let jsDestination = 'site/public/javascript';
let sassFilePath = 'site/sass/**/*.scss';

gulp.task('scripts', function() {
  return gulp.src(jsFilePath)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDestination))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDestination));
});

gulp.task('scripts:watch', function() {
  gulp.watch(jsFilePath, gulp.series['scripts']);
});

gulp.task('sass', function () {
  return gulp.src(sassFilePath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./site/public/css/'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(sassFilePath, gulp.series(['sass']));
  //gulp.watch('./site/sass/collections/*.scss', gulp.series(['sass']));
  //gulp.watch('./site/sass/components/*.scss', gulp.series(['sass']));
});

gulp.task('watch', function() {
  gulp.watch(sassFilePath, gulp.series(['sass']));
  gulp.watch(jsFilePath, gulp.series['scripts']);
})

gulp.task('server:start', function() {
  server.listen({path: './site/server.js' });
});

gulp.task('server:restart', function() {
  gulp.watch(['./site/server.js'], server.restart);
});

gulp.task('develop', gulp.series(['sass','scripts','watch']));
gulp.task('run', gulp.series(['sass','scripts','server:start']));
gulp.task('default', gulp.series(['sass','scripts','server:start']));
