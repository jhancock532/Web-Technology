'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
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
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(jsDestination));
});

gulp.task('sass', function () {
  return gulp.src(sassFilePath)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('./site/public/css/'));
});

gulp.task('watch', function() {
  gulp.watch(sassFilePath, gulp.series(['sass']));
  gulp.watch(jsFilePath, gulp.series(['scripts']));
})

gulp.task('default', gulp.series(['sass', 'scripts', 'watch']));
