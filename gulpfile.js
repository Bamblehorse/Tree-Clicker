'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();

gulp.task('default',['browserSync', 'sass:watch'], function() {
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  });
});

gulp.task('refresh', function() {
  return gulp
    .src('./')
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('sass/**/*.scss', ['sass','refresh']);
  gulp.watch('**/*.html', ['refresh']);
  gulp.watch('js/**/*.js', ['refresh']);
});